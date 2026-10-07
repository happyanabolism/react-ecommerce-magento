# Magento Headless Storefront

A headless e-commerce storefront built with **React 19** and **TypeScript** on top of the **Magento 2 GraphQL API**.
The frontend is a standalone single-page application: Magento serves only data, all UI and routing live here.

## Features

- **Catalog**
  - Category menu built from the store's root category
  - Category pages with product listing, layered-navigation filters (aggregations) and pagination kept in the URL
  - Product page with price ranges ("From …"), discounted prices and sanitized HTML description
- **Magento URL resolution** — any URL is resolved through Magento's `route` query and rendered as a category or
  product page; Magento URL redirects (301/302) are followed
- **Customer**
  - Sign in, registration, sign out (the token is revoked on the server and the cache is cleared)
  - Account area: profile, email and password update, address book
  - Expired session handling: the user is signed out and the failed request is retried as a guest
- **Notifications** — global toasts for profile updates, registration, sign out and session expiry
- **Performance** — route-based code splitting with lazy routes

## Tech stack

| Area                | Tools                                                                              |
| ------------------- | ---------------------------------------------------------------------------------- |
| UI                  | React 19, SCSS Modules (migration to Tailwind CSS v4 + shadcn/ui in progress)      |
| Language            | TypeScript 5 (strict)                                                              |
| Build               | Vite 8                                                                             |
| Routing             | React Router 8 (data router, lazy routes, layout routes)                           |
| Server state        | Apollo Client 4 with a normalized cache                                            |
| API types           | GraphQL Code Generator (client preset, typed documents, `possibleTypes`)           |
| Client state        | Redux Toolkit, redux-persist, listener middleware                                  |
| Forms               | React Hook Form, Yup                                                               |
| Security            | DOMPurify for HTML coming from the API                                             |
| Architecture        | Feature-Sliced Design, checked by Steiger                                          |
| Code quality        | ESLint (typescript-eslint, react-hooks), Prettier                                  |

## Architecture

The code follows [Feature-Sliced Design](https://feature-sliced.design). A layer may import only from the layers
below it:

```
app → pages → widgets → features → entities → shared
```

| Layer      | Contents                                                                                  |
| ---------- | ----------------------------------------------------------------------------------------- |
| `app`      | Providers (Apollo, Redux), store setup, router, layouts, Magento URL resolution           |
| `pages`    | Route screens: category, product, account, login, registration, cart                      |
| `widgets`  | Composite blocks: header (category menu, customer menu), category product listing         |
| `features` | User actions: `auth/login`, `auth/register`, `auth/logout`, `customer-update`, listing    |
| `entities` | Business data: `session`, `customer`, `address`, `product`, `category`, `notification`    |
| `shared`   | `api` (GraphQL client helpers, generated types), `ui`, `lib`, `config`, `styles`          |

Key decisions:

- **Server state lives in the Apollo cache, not in Redux.** Redux holds only client state: the session token and
  notifications. Mutations return updated objects, and the normalized cache updates every view that shows them.
- **Fragments are colocated with the components that need the data** (`ProductPriceRange` next to `ProductPrice`,
  `Money` in `shared/api`); pages compose them into their queries.
- **Generated types only.** All API types come from GraphQL Code Generator; only app-level types (form data,
  session state) are written by hand.
- **Magento errors** are read from both GraphQL errors and HTTP 401/403 responses and shown as one message.

## Getting started

### Requirements

- Node.js 22.22 or newer
- A Magento 2.4.7+ instance (Open Source or Adobe Commerce) with the GraphQL API available

### Setup

```bash
npm install

# point the dev server to your Magento instance
cp .env.example .env.local
# edit MAGENTO_BACKEND_URL in .env.local

# download the GraphQL schema of your instance and generate types
npm run schema:fetch
npm run codegen

npm run dev
```

The dev server runs on http://localhost:5173 and proxies `/graphql` to `MAGENTO_BACKEND_URL`.

The GraphQL schema (`schema.graphql`) and the generated types (`src/shared/api/gql/`) are not committed: they
describe a particular Magento instance and are generated from your own backend. Run `npm run schema:fetch` and
`npm run codegen` after cloning, and `npm run codegen` again after changing any GraphQL document.

## Scripts

| Command                 | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| `npm run dev`           | Start the Vite dev server                                      |
| `npm run build`         | Type-check and build for production                            |
| `npm run preview`       | Serve the production build                                     |
| `npm run typecheck`     | Run the TypeScript compiler without emitting                   |
| `npm run lint`          | Lint with ESLint (`lint:fix` to fix automatically)             |
| `npm run lint:fsd`      | Check Feature-Sliced Design rules with Steiger                 |
| `npm run format`        | Format with Prettier (`format:check` to verify)                |
| `npm run schema:fetch`  | Download the GraphQL schema from `MAGENTO_BACKEND_URL`         |
| `npm run codegen`       | Generate TypeScript types for GraphQL documents (`codegen:watch` to watch) |

## Project structure

```
src/
├── app/          # entry point, providers, store, router, layouts
├── pages/        # account, cart, category, home, login, product, registration
├── widgets/      # category, header
├── features/     # auth, customer-update, product-listing
├── entities/     # address, category, customer, notification, product, session
└── shared/       # api, assets, config, lib, styles, ui
scripts/
└── fetch-schema.ts   # downloads and sanitizes the Magento GraphQL schema
```

## Roadmap

- [ ] Tailwind CSS v4 + shadcn/ui, accessibility review
- [ ] React 19 form actions
- [ ] Configurable product options, image gallery
- [ ] Cart (guest cart, merge on sign-in, mini cart) and checkout
- [ ] Filters and sorting in the URL, search
- [ ] Tests: Vitest, Testing Library, MSW, Playwright
- [ ] Migration to Next.js App Router (server rendering, SEO)
- [ ] CI and a public demo on mocked data
