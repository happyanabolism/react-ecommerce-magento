# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React 19 + Vite storefront (PWA-style headless frontend) for a **Magento 2 GraphQL** backend. TypeScript, TanStack Query 5, Redux Toolkit, React Router 8, Tailwind CSS v4 + shadcn/ui (Radix), Sonner toasts.

Learning project: working agreements, plan, decisions and backlog are in the local (git-ignored) file below. Read it and follow it; update it when a step completes or a decision is made.

@docs/agreements.md

## Commands

```bash
npm run dev       # Vite dev server on :5173
npm run build     # type check (tsc -b) + production build
npm run typecheck # tsc -b only
npm run preview   # serve the build
npm run lint      # eslint . (lint:fix to autofix)
npm run lint:fsd  # Steiger: Feature-Sliced Design rules
npm run format    # prettier --write . (format:check in CI)
npm run schema:fetch  # download the Magento GraphQL schema into schema.graphql (needs MAGENTO_BACKEND_URL)
npm run codegen       # generate operation types into src/shared/api/gql/ (codegen:watch while editing queries)
```

Magento quirk on this backend: `products(filter: { url_key: ... })` always returns nothing; look products up by `sku` (the product page gets it from `route`).

Magento bug: a named fragment nested inside an inline fragment (`... on CategoryTree { ...X }`) makes Magento skip loading those attributes (they come back `null`). Spread named fragments directly on the field (`route { ...CategoryPageFields }`).

`schema.graphql` and `src/shared/api/gql/` are git-ignored (they describe a private backend): run `schema:fetch` + `codegen` after cloning and after changing any `gql` document. `scripts/fetch-schema.ts` strips the parts of the Magento schema that are not valid GraphQL (attribute codes with umlauts/hyphens, broken `implements`). Every operation must have a unique name.

There is no test setup.

Notes:

- TypeScript uses project references: `tsconfig.app.json` (browser, `src/`, `vite/client` types) and `tsconfig.node.json` (Node, config files). Vite does not type-check; only `tsc -b` does.
- ESLint (flat config): `typescript-eslint`, `react-hooks` v7 (incl. React Compiler rules like `set-state-in-effect`), `react-refresh`; formatting rules are disabled via `eslint-config-prettier`. Prettier runs separately (`.prettierrc`: single quotes, JSX single quotes, semicolons, trailing commas `es5`, width 80).
- The dev server proxies `/graphql` to the Magento instance set in `MAGENTO_BACKEND_URL` (`.env.local`, see `.env.example`; `vite dev` refuses to start without it). `request()` (`src/shared/api/request.ts`) posts to the relative URI `/graphql`, so a reachable Magento backend is required to see any data.
- Path aliases live in two places that must stay in sync: `paths` in `tsconfig.app.json` (for TS/IDE) and `resolve.alias` in `vite.config.ts` (for the bundler).

## Architecture: Feature-Sliced Design

`src/` follows FSD layers. A layer may import only from layers below it:

`app` → `pages` → `widgets` → `features` → `entities` → `shared`

Path aliases: `@app/*`, `@pages/*`, `@widgets/*`, `@features/*`, `@entities/*`, `@shared/*`.

FSD structure is checked by Steiger (`npm run lint:fsd`, config in `steiger.config.ts`). `shared` segments: `api` (`graphql()`, generated types re-exported as types, `request`/`configureRequest`, `GraphQLRequestError`, custom-attribute mappers and `FlatAttributes`), `config` (`ROUTES`, pagination), `lib`, `ui`, `assets`; import them through their `index.ts` (`@shared/api`, never `@shared/api/gql/...`).

Each slice exposes a public API through its `index.ts`; import from `@entities/customer`, not from deep paths. Inside a slice, segments are:

- `api/` — GraphQL documents (`graphql()` from `@shared/api/gql`)
- `model/` — types, hooks wrapping `useQuery`/`useMutation`, Redux slices, yup schemas (`*.schema.ts`)
- `lib/` — slice helpers (e.g. `entities/address/lib/fromCustomerAddress.ts`)
- `ui/` — components, each in its own folder (`ui/Name/Name.tsx`)

Inside a slice, import its own files by relative path, never through its own `index.ts` (that creates import cycles).

Entities: `session` (token), `customer` (customer data: `CustomerFields`, `useCustomer`), `address`, `product` (also configurable option selection: `useProductSelection`, variant rules, `ProductOptions` swatches), `category`, `route`. Features are named by action: `auth/{login,register,logout}`, `customer-update`, `product-listing`. Queries that read entity data live in the entity; mutations live in the `api/` of the feature that performs them. A piece shared by two features goes down a layer (`GENERATE_CUSTOMER_TOKEN` is in `entities/session/api`, used by login and register). Cross-entity imports go through `@x`: `entities/session/@x/customer.ts` gives `selectJwt` to `useCustomer`. Widgets: `header` (category menu `CategoryNav` + `useCategoryNav`, and `CustomerMenu`, which composes customer, session and the logout feature), `category` (product listing and filters; reused by the search page later). A block used in one place lives inside that place (pages first) and becomes a widget/feature on its second use: `pages/account` holds the whole account area (`AccountLayout`, `AccountNavigation`, `CustomerInfo`, `CustomerAddressBook`, dashboard page).

### Data flow

- **TanStack Query** is the data layer (`QueryProvider` in `src/app/providers`: one module-level `QueryClient`, defaults `staleTime: 60_000`, `retry: 1`, devtools). Entity hooks (`useProducts`, `useCategoryMenu`, `useUrlResolve`, `useCustomer`, ...) wrap `useQuery({ queryKey, queryFn: () => request(DOC, vars) })` and return the unwrapped data plus the rest of the query result (`{ products, isPending, error, ... }`). Mutation hooks return `useMutation(...)` as is; consumers destructure `{ mutate: login, isPending, error }`. Operation types come from GraphQL Codegen (`src/shared/api/gql/graphql.ts`); documents written with `graphql()` are `TypedDocumentNode`s, so `request` infers result and variables types. There are no hand-written API types; app/domain types (`Address`, `CustomerAddress` with mappers in `entities/address/lib`, form data via `yup.InferType`, `SessionState`, `FlatAttributes`) stay hand-written. Mutation hooks take form data and map it to the generated variables type inside `mutationFn`.
- **Query keys**: every variable the result depends on goes into the key (`['route', url]`, `['products', { filter, pageSize, currentPage }]`, `['product', 'page', variables]`). Customer-private data lives under the `'customer'` prefix (`['customer']`, `['customer', 'addresses']`) so it can be invalidated/removed together. Different queries for the same entity need different keys (`['product', 'page', …]` vs a future `['product', 'configurator', …]`): one key = one data shape.
- **Cache updates**: no normalized cache. After a mutation, invalidate what it changed in `onSuccess` (`return queryClient.invalidateQueries({ queryKey: ['customer'] })`; returning the promise keeps `isPending` until fresh data arrives). Logout calls `queryClient.clear()` (catalog prices may depend on the customer group). Paginated listing uses `placeholderData: keepPreviousData` (previous page stays visible, `isPlaceholderData` dims it). Loading flags: `isPending` = no data yet (stays `true` for a disabled query), `isPlaceholderData`/`isFetching` = refetch.
- **`request(document, variables)`** (`shared/api/request.ts`): `fetch` POST with `print(document)`; throws `GraphQLRequestError` (`errors` = Magento's error array, `message` = all messages joined) when the response has `errors`, regardless of HTTP status. Token and session handling are injected from the app layer with `configureRequest({ getToken, onSessionExpired })` (in `QueryProvider`), because `shared` can't import the store. Expired token (`graphql-authentication` without `path`, HTTP 401) → `onSessionExpired()` (logout + toast) and one retry as a guest. A token Magento doesn't accept (malformed/revoked) is treated as a guest and gets `graphql-authorization` (HTTP 403, with `path`) → `onSessionExpired()`, no retry. A wrong password is `graphql-authentication` with `path` and is just shown in the form.
- **Errors**: show `error.message` (for `GraphQLRequestError` it is the joined Magento messages, like Venia's `deriveErrorMessage`); inspect `error.errors` for categories.
- **Store config**: no global provider/context. A feature that needs store settings queries the `storeConfig` fields it needs itself. The category menu doesn't need `root_category_uid`: `categories` without filters returns the store's root category.
- **Redux** (with `redux-persist` to localStorage) only holds the session: `entities/session` slice `{ jwt }` with `setToken`/`logout` and `selectJwt`. Customer data is never copied into Redux, it comes from the query cache (`useCustomer`, `enabled: !!jwt`, `staleTime: 0`). `useLogin`/`useRegister` (`features/auth`) dispatch `setToken` in `onSuccess`; registration chains `createCustomerV2` → `generateCustomerToken` inside one `mutationFn`. `useLogout` calls `revokeCustomerToken` and in `onSettled` (success or error: client logout always wins) dispatches `logout()`, clears the query cache and shows a toast. `RootState`/`AppDispatch` are declared as globals in `src/app/store/store.ts`; typed hooks are in `@shared/lib` (`store/redux.ts`).
  Provider order (`src/app/entrypoint/main.tsx`): Redux `Provider` → `PersistGate` → `QueryProvider` → `RouterProvider`.

### Routing

`src/app/routes/router.tsx` defines static routes (`ROUTES` in `@shared/config`). `ProtectedRoute` (requires a token) and `GuestRoute` (redirects to the account as soon as a token appears, so login/register don't navigate themselves) are pathless layout routes rendering `<Outlet />`. Pages are lazy routes (`lazy: () => import(...)`, code splitting); the root route has `hydrateFallbackElement`. Every other URL hits the catch-all `MagentoRoute` (`app/routes`, with its `ROUTE` query and `useUrlResolve`), which resolves the path through Magento's `route(url)` query, follows `redirect_code` with `<Navigate replace />`, and switches on `route.__typename`. Only `CategoryTree` → `CategoryPage` is implemented so far; product and CMS pages are TODO.

### Category listing

No context or provider. `CategoryPage` builds a listing criteria object (`{ filter: { category_uid: { eq } } }`) and passes it to the listing widget (`widgets/category`). Widgets call `useProductListing(criteria)` (`features/product-listing`): it reads `?page=` from the URL, calls `useProducts`, and returns products, aggregations, `pageInfo`, `currentPage` (from the URL, so the clicked page is highlighted at once) and `getPageHref(page)` (builds `?page=N` from the current search params, page 1 without the param). Pagination renders router links (`PaginationLink` is React Router `Link`), so there is no click handler: the URL is the state. Widgets using the same criteria share one query key, so one request is sent. `ScrollRestoration` in `MainLayout` scrolls to top on navigation and restores on back. The criteria is meant to grow (`search` for a search page); filters/sorting in the URL are planned (A9).

`ProductCard` takes a `ProductCardFieldsFragment` (fragment on `ProductInterface`); fragment masking is off, fields are read directly from the result.

## Styling conventions

- Tailwind CSS v4 utility classes in JSX; no CSS/SCSS modules. The only stylesheet is `src/app/styles/tailwind.css`: `@theme` (project tokens: `graphite-*`/`purple-*` colors, `--breakpoint-xs`, `--container-layout`), the shadcn theme variables (`:root`/`.dark`, mapped in `@theme inline`; `--success`/`--warning` added, `--muted-foreground` is the project grey), and `@layer base` (element defaults like `h1`, autofill fixes). Global CSS must stay inside `@layer base`: unlayered CSS beats Tailwind utilities.
- shadcn/ui (Radix, Nova preset, `components.json`): generated components live in `src/shared/ui/shadcn/` (shadcn file names) and are edited deliberately (local edits, re-check them after `npx shadcn add --overwrite`: `Card` has a shadow and a softer ring, `PaginationLink` renders React Router `Link`, `toggle` variants highlight `aria-checked` too because a `TooltipTrigger asChild` on a toggle overwrites its `data-state`). Own components are `src/shared/ui/Name/Name.tsx` (`Container`, `SidebarLayout`, `Price`, `Fields`, `Pagination`, `PageLoader`, `RichContent`). Everything is imported through `@shared/ui`.
- Merge classes with `cn` (package `cn`, the shadcn helper: clsx + tailwind-merge) so a `className` prop can override defaults.
- Repeated markup becomes a component; `@utility` only for small non-component style sets; element defaults go to `@layer base`. Colors come from theme tokens, not arbitrary values.
- Forms: `Field`/`FieldGroup` + `TextField`/`PasswordField`/`TelephoneField`. Inline forms sit in a `Card` (submit in `CardFooter`), forms in a `Dialog` put buttons in `DialogFooter`; in both the button is outside `<form>` and linked with `form={id}` (`useId`).
- Toasts: `toast.success()`/`toast.error()` from `sonner` (works outside React, e.g. in `onSessionExpired`); `<Toaster />` is in `MainLayout`.
