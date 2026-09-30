/**
 * Downloads the GraphQL schema from Magento (introspection) into schema.graphql,
 * which GraphQL Codegen uses to generate types (see codegen.ts).
 *
 * The Magento schema is not fully valid GraphQL, strict tools refuse to read it:
 * - product attributes with codes like "Akkukapazität" or "Feuerzeug-Typ" become
 *   ProductAttributeFilterInput fields, but GraphQL names allow only [_a-zA-Z0-9];
 * - some modules declare that a type implements an interface without providing
 *   all of its fields.
 * Both are removed here, everything else is kept as is.
 *
 * Usage: npm run schema:fetch (reads MAGENTO_BACKEND_URL from .env.local)
 */
import { writeFileSync } from 'node:fs';
import {
  buildClientSchema,
  getIntrospectionQuery,
  printSchema,
  type IntrospectionQuery,
} from 'graphql';

const backendUrl = process.env.MAGENTO_BACKEND_URL;
if (!backendUrl) {
  throw new Error(
    'MAGENTO_BACKEND_URL is not set. Copy .env.example to .env.local and set it.'
  );
}

const response = await fetch(`${backendUrl}/graphql`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: getIntrospectionQuery() }),
});
const { data } = (await response.json()) as { data: IntrospectionQuery };
const types = data.__schema.types;
const removed: string[] = [];

// input fields with names that are not valid in GraphQL
const validName = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
for (const type of types) {
  if (type.kind !== 'INPUT_OBJECT') continue;
  Object.assign(type, {
    inputFields: type.inputFields.filter((field) => {
      if (validName.test(field.name)) return true;
      removed.push(`${type.name}.${field.name}`);
      return false;
    }),
  });
}

// "implements Interface" without all of the interface fields
const typesByName = new Map(types.map((type) => [type.name, type]));
for (const type of types) {
  if (type.kind !== 'OBJECT') continue;
  const fields = new Set(type.fields.map((field) => field.name));

  Object.assign(type, {
    interfaces: type.interfaces.filter(({ name }) => {
      const iface = typesByName.get(name);
      if (iface?.kind !== 'INTERFACE') return true;
      if (iface.fields.every((field) => fields.has(field.name))) return true;

      removed.push(`${type.name} implements ${name}`);
      Object.assign(iface, {
        possibleTypes: iface.possibleTypes.filter((t) => t.name !== type.name),
      });
      return false;
    }),
  });
}

writeFileSync('schema.graphql', printSchema(buildClientSchema(data)));
console.log('schema.graphql written.');
if (removed.length) console.log(`Removed invalid parts: ${removed.join(', ')}`);
