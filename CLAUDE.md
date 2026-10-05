# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React 19 + Vite storefront (PWA-style headless frontend) for a **Magento 2 GraphQL** backend. TypeScript, Apollo Client 4, Redux Toolkit, React Router 7, SCSS modules.

Learning project: working agreements, plan, decisions and backlog are in the local (git-ignored) file below. Read it and follow it; update it when a step completes or a decision is made.

@docs/agreements.md

## Commands

```bash
npm run dev       # Vite dev server on :5173
npm run build     # type check (tsc -b) + production build
npm run typecheck # tsc -b only
npm run preview   # serve the build
npm run lint      # eslint . (lint:fix to autofix)
npm run format    # prettier --write . (format:check in CI)
npm run schema:fetch  # download the Magento GraphQL schema into schema.graphql (needs MAGENTO_BACKEND_URL)
npm run codegen       # generate operation types into src/shared/api/gql/ (codegen:watch while editing queries)
```

Magento bug: a named fragment nested inside an inline fragment (`... on CategoryTree { ...X }`) makes Magento skip loading those attributes (they come back `null`). Spread named fragments directly on the field (`route { ...CategoryPageFields }`).

`schema.graphql` and `src/shared/api/gql/` are git-ignored (they describe a private backend): run `schema:fetch` + `codegen` after cloning and after changing any `gql` document. `scripts/fetch-schema.ts` strips the parts of the Magento schema that are not valid GraphQL (attribute codes with umlauts/hyphens, broken `implements`). Every operation must have a unique name.

There is no test setup.

Notes:

- TypeScript uses project references: `tsconfig.app.json` (browser, `src/`, `vite/client` types) and `tsconfig.node.json` (Node, config files). Vite does not type-check; only `tsc -b` does.
- ESLint (flat config): `typescript-eslint`, `react-hooks` v7 (incl. React Compiler rules like `set-state-in-effect`), `react-refresh`; formatting rules are disabled via `eslint-config-prettier`. Prettier runs separately (`.prettierrc`: single quotes, JSX single quotes, semicolons, trailing commas `es5`, width 80).
- The dev server proxies `/graphql` to the Magento instance set in `MAGENTO_BACKEND_URL` (`.env.local`, see `.env.example`; `vite dev` refuses to start without it). The Apollo client uses the relative URI `/graphql` (`src/app/providers/ApolloProvider.tsx`), so a reachable Magento backend is required to see any data.
- Path aliases live in two places that must stay in sync: `paths` in `tsconfig.app.json` (for TS/IDE) and `resolve.alias` in `vite.config.ts` (for the bundler, including Sass `@use '@shared/...'`, which `vite-tsconfig-paths` can't resolve).

## Architecture: Feature-Sliced Design

`src/` follows FSD layers. A layer may import only from layers below it:

`app` → `pages` → `widgets` → `features` → `entities` → `shared`

Path aliases: `@app/*`, `@pages/*`, `@widgets/*`, `@features/*`, `@entities/*`, `@shared/*`.

Each slice exposes a public API through its `index.ts`; import from `@entities/customer`, not from deep paths. Inside a slice, segments are:

- `api/` — GraphQL documents (`graphql()` from `@shared/api/gql`)
- `model/` — types, hooks wrapping `useQuery`/`useMutation`, Redux slices, yup schemas (`*.schema.ts`)
- `lib/` — slice helpers (e.g. `entities/address/lib/fromCustomerAddress.ts`)
- `ui/` — components, each in its own folder with a `Component.module.scss`

Inside a slice, import its own files by relative path, never through its own `index.ts` (that creates import cycles).

Entities: `session` (token), `customer` (customer data: `CustomerFields`, `useCustomer`), `address`, `product`, `category`, `route`. Features are named by action: `auth/{login,register,logout}`, `customer-update`, `category` (nav), `product-listing`. Queries that read entity data live in the entity; mutations live in the `api/` of the feature that performs them. A piece shared by two features goes down a layer (`GENERATE_CUSTOMER_TOKEN` is in `entities/session/api`, used by login and register). Cross-entity imports go through `@x`: `entities/session/@x/customer.ts` gives `selectJwt` to `useCustomer`. Widgets: `header` (with `CustomerMenu`, which composes customer, session and the logout feature), `customer`, `category`.

### Data flow

- **Apollo** is the main data layer. Entity hooks (`useProducts`, `useCategory`, `useUrlResolve`, `useCustomer`, ...) wrap `useQuery` and return the unwrapped data plus the rest of the query result (`{ items, loading, error, fetchMore, ... }`). Operation types come from GraphQL Codegen (`src/shared/api/gql/graphql.ts`); queries written with `graphql()` are `TypedDocumentNode`s, so `useQuery` needs no generics. There are no hand-written API types; app/domain types (`Address`, `CustomerAddress` with mappers in `entities/address/lib`, form data via `yup.InferType`, `SessionState`, `FlatAttributes`) stay hand-written. Shared API structures live in `shared/api` (`CustomAttributeFields` fragment).
- **Cache** (`InMemoryCache` in `ApolloProvider`): `keyFields: ['uid']` for `SimpleProduct`, `ConfigurableProduct`, `CategoryTree`; `StoreConfig` by `store_code`; `Customer` is a singleton. Any query returning these types must request the key field. Types with `id` (e.g. `CustomerAddress`) are normalized by default.
- **Store config**: no global provider/context. A feature that needs store settings queries the `storeConfig` fields it needs itself (with `store_code`), Apollo merges them into one cached `StoreConfig` (Venia approach). The category menu doesn't need `root_category_uid`: `categories` without filters returns the store's root category.
- **Redux** (with `redux-persist` to localStorage) only holds the session: `entities/session` slice `{ jwt }` with `setToken`/`logout` and `selectJwt`. Customer data is never copied into Redux, it comes from the Apollo cache (`useCustomer`, skipped while there is no token). No thunks: `useLogin`/`useRegister` (`features/auth`) run `useMutation` and dispatch `setToken`; their `loading`/`error` come from the mutations. Registration chains `createCustomerV2` → `generateCustomerToken`. `useLogout` calls `revokeCustomerToken` (errors ignored, e.g. expired token), then `logout()` and `client.clearStore()`. `RootState`/`AppDispatch` are declared as globals in `src/app/store/store.ts` (so lower layers can type selectors without importing `app`); typed hooks are in `@shared/lib` (`store/redux.ts`).
- **Auth link**: `ApolloProvider` reads the JWT from the Redux store for the `Authorization: Bearer` header. `errorLink` logs out and retries the operation as a guest on an invalid/expired token (`graphql-authentication` without `path`), and logs out on `graphql-authorization`.
- **Errors**: Magento answers auth errors with HTTP 401/403, so Apollo gives a `ServerError` whose GraphQL errors are only in `bodyText`. Never show `error.message` directly: use `getMagentoErrorMessage(error)` from `@shared/utils` (all Magento messages joined, like Venia's `deriveErrorMessage`), or `getMagentoErrors(error)` to inspect categories. Forms show mutation errors the same way.
  Provider order (`src/app/entrypoint/main.tsx`): Redux `Provider` → `PersistGate` → `ApolloProvider` → `RouterProvider`.

### Routing

`src/app/routes/router.tsx` defines static routes (`ROUTES` in `@shared/constants`) with `ProtectedRoute` (requires a token) and `GuestRoute` wrappers (redirects to the account as soon as a token appears, so login/register don't navigate themselves). Every other URL hits the catch-all `DynamicPage`, which resolves the path through Magento's `route(url)` query and switches on `route.__typename`. Only `CategoryTree` → `CategoryPage` is implemented so far; product and CMS pages are TODO.

### Category listing

No context or provider. `CategoryPage` builds a listing criteria object (`{ filter: { category_uid: { eq } } }`) and passes it to both widgets (`CategoryProductFilters`, `CategoryProductListing`). Each widget calls `useProductListing(criteria)` (`features/product-listing`): it reads `?page=` from the URL, calls `useProducts`, and returns products, aggregations, `pageInfo`, `setPage` (updates the URL via `setSearchParams`). Both widgets use the same query with the same variables, so Apollo sends one request. The criteria is meant to grow (`search` for a search page); filters/sorting in the URL are planned (A9).

`ProductCard` takes a `ProductCardFieldsFragment` (fragment on `ProductInterface`). Fragments on interfaces need `possibleTypes` in `InMemoryCache` (generated `src/shared/api/gql/possibleTypes.ts`); without it Apollo drops the fragment fields when writing to the cache.

## Styling conventions

- SCSS modules per component. Pull in shared tokens with `@use '@shared/styles/variables/_colors' as *;` etc. (variables in `src/shared/styles/variables`, mixins in `src/shared/styles/mixins`). Global styles live in `src/app/styles`.
- Component-level SCSS variables are declared at the top of the module (e.g. `$button-primary_background`), then used in the rules.
- Property order inside a selector (see `styles_order_rule.png`): **Layout** (display, flex/grid, padding, margin, width, box-sizing) → **Typography** (font-\*, line-height, text-align, color) → **Visual** (background, border, border-radius, box-shadow) → **Interaction** (cursor, transition) → **Misc** (z-index).
