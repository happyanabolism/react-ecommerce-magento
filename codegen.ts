import type { CodegenConfig } from '@graphql-codegen/cli';

// Generates TypeScript types for every GraphQL operation in src/
// from the local Magento schema (npm run schema:fetch).
// Usage: npm run codegen
const config: CodegenConfig = {
  schema: 'schema.graphql',
  documents: ['src/**/*.{ts,tsx}', '!src/shared/api/gql/**'],
  ignoreNoDocuments: true,
  generates: {
    // graphql() function + a type for every query/mutation (TypedDocumentNode)
    'src/shared/api/gql/': {
      preset: 'client',
      presetConfig: {
        // fragment fields are read directly from the result, no useFragment()
        fragmentMasking: false,
      },
      config: {
        useTypeImports: true,
        enumsAsTypes: true,
        // requested fields are always present in a result (possibly null),
        // input fields stay optional
        avoidOptionals: { field: true, inputValue: false },
      },
    },
  },
};

export default config;
