# Magento Headless Storefront

A headless e-commerce storefront built with **React 19** and **TypeScript** on top of the **Magento 2 GraphQL API**.
The frontend is a standalone single-page application: Magento serves only data, all UI and routing live here.

## Features

- Category navigation and category pages with filters and pagination
- Product pages
- Store URL resolution with redirects
- Customer sign in, registration and account area
- Notifications
- Route-based code splitting

## Tech stack

| Area         | Tools                                         |
| ------------ | --------------------------------------------- |
| UI           | React 19, SCSS Modules                        |
| Language     | TypeScript                                    |
| Build        | Vite                                          |
| Routing      | React Router                                  |
| Server state | Apollo Client                                 |
| API types    | GraphQL Code Generator                        |
| Client state | Redux Toolkit, redux-persist                  |
| Forms        | React Hook Form, Yup                          |
| Architecture | Feature-Sliced Design, Steiger                |
| Code quality | ESLint, Prettier                              |

## Architecture

The code follows [Feature-Sliced Design](https://feature-sliced.design). A layer may import only from the layers
below it:

```
app → pages → widgets → features → entities → shared
```

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
