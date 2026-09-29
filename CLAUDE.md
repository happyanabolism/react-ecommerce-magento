# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React 19 + Vite storefront (PWA-style headless frontend) for a **Magento 2 GraphQL** backend. TypeScript, Apollo Client 4, Redux Toolkit, React Router 7, SCSS modules.

## Commands

```bash
npm run dev       # Vite dev server on :5173
npm run build     # type check (tsc -b) + production build
npm run typecheck # tsc -b only
npm run preview   # serve the build
npm run lint      # eslint . (lint:fix to autofix)
npm run format    # prettier --write . (format:check in CI)
```

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

- `api/` — `gql` documents and imperative Apollo calls
- `model/` — types, hooks wrapping `useQuery`/`useMutation`, Redux slices/thunks, contexts, yup schemas (`*.schema.ts`)
- `ui/` — components, each in its own folder with a `Component.module.scss`
- `provider/` — context providers (e.g. `features/category/provider`)

Entities: `customer`, `product`, `category`, `route`, `store`. Features: `category` (nav, product listing state), `customer/{login,registration,update}`.

### Data flow

- **Apollo** is the main data layer. Entity hooks (`useProducts`, `useCategory`, `useUrlResolve`, `useCustomer`, ...) wrap `useQuery` and return the unwrapped data plus the rest of the query result (`{ items, loading, error, fetchMore, ... }`). Magento GraphQL types are hand-written in each entity's `model/types.ts` and in `src/shared/types` (filters, sorting, pricing, attributes, `UrlRewriteEntityTypeEnum`). There is no codegen.
- **Redux** (with `redux-persist` to localStorage) only holds auth state: the `customer` slice (`entities/customer/model/authSlice.ts`) stores `customer` and `jwt`. `login`/`register` thunks take the Apollo `client` as an argument and call the imperative functions in `entities/customer/api/authApi.ts`. `RootState`/`AppDispatch` are declared as globals in `src/app/store/store.ts`; typed hooks are in `@shared/lib` (`store/redux.ts`).
- **Auth link**: `ApolloProvider` reads the JWT from the Redux store for the `Authorization: Bearer` header, and dispatches `logout()` on any GraphQL error with `extensions.category === 'graphql-authorization'`.
- **Store config**: `StoreConfigProvider` fetches Magento store config once and exposes it via `StoreContext` (`entities/store`).

Provider order (`src/app/entrypoint/main.tsx`): Redux `Provider` → `PersistGate` → `ApolloProvider` → `StoreConfigProvider` → `RouterProvider`.

### Routing

`src/app/routes/router.tsx` defines static routes (`ROUTES` in `@shared/constants`) with `ProtectedRoute` (requires a customer in Redux) and `GuestRoute` wrappers. Every other URL hits the catch-all `DynamicPage`, which resolves the path through Magento's `route(url)` query and switches on `route.type`. Only `CATEGORY` → `CategoryPage` is implemented so far; product and CMS pages are TODO.

### Category listing

`CategoryPage` wraps its content in `CategoryProductsProvider` (`features/category`). It runs `useProducts` filtered by `category_uid`, reads `?page=` from the URL, and exposes `{ items, aggregations, page_info, loading, error, setFilters }` through `CategoryProductsContext`. `setFilters` re-queries through `fetchMore` (replacing the previous result) and syncs `page` into the URL with `history.replaceState`. Widgets (`CategoryProductListing`, `CategoryProductFilters`) read it with `useContext(CategoryProductsContext)`. Filter aggregations come from the API. (`features/category/model/useCategoryProducts.ts` is an older, unused variant of the same logic.)

## Styling conventions

- SCSS modules per component. Pull in shared tokens with `@use '@shared/styles/variables/_colors' as *;` etc. (variables in `src/shared/styles/variables`, mixins in `src/shared/styles/mixins`). Global styles live in `src/app/styles`.
- Component-level SCSS variables are declared at the top of the module (e.g. `$button-primary_background`), then used in the rules.
- Property order inside a selector (see `styles_order_rule.png`): **Layout** (display, flex/grid, padding, margin, width, box-sizing) → **Typography** (font-\*, line-height, text-align, color) → **Visual** (background, border, border-radius, box-shadow) → **Interaction** (cursor, transition) → **Misc** (z-index).
