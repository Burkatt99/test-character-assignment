# Rick and Morty Character Search 🛸

A web-based application for searching and caching Rick and Morty characters, built with [React](https://react.dev) and [TypeScript](https://www.typescriptlang.org).

## About the App

The app allows you to search for Rick and Morty characters by ID and caches the results locally for instant access.

**Key features:**
- Search characters by numeric ID
- Instant display of cached characters without redundant API requests
- Cache persists after page reload via localStorage
- Automatic cache invalidation after TTL expires
- Maximum 6 cached characters with LRU-like eviction
- Click on cached character to display it instantly
- Remove individual characters from cache or clear all at once

## Configuration

To adjust cache behavior, update the following constants in `src/constants.ts`:

```ts
export const CACHE_TTL = 3 * 60 * 1000;     # time-to-live for each cached character (default: 3 minutes)
export const MAX_CACHE_SIZE = 6;              # maximum number of cached characters (default: 6)
export const CLEANUP_INTERVAL = 40 * 1000;   # how often expired entries are removed (default: 40 seconds)
```

## Getting Started

First, install dependencies:
```bash
yarn install
```

Then run the development server:
```bash
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Requirements

- Node.js `v22.18.0`
- yarn `v1.22+`

## Scripts
```bash
yarn dev            # start development server
yarn build          # build for production
yarn preview        # preview production build
yarn lint           # run ESLint
yarn lint:fix       # run ESLint and fix issues
yarn test           # run unit and integration tests
yarn test:ui        # run tests with UI
```

## Tech Stack

- [React 19](https://react.dev) — UI library
- [TypeScript](https://www.typescriptlang.org) — type safety
- [Vite](https://vite.dev) — build tool
- [Styled Components](https://styled-components.com) — component styling
- [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) — unit and integration testing
- [ESLint](https://eslint.org) + [Prettier](https://prettier.io) — code quality

## API

The app uses the public [Rick and Morty API](https://rickandmortyapi.com).

## Git Hooks

The project uses [Husky](https://typicode.github.io/husky) for automatic checks:

- **pre-commit** — runs ESLint on changed `.ts` and `.tsx` files via [lint-staged](https://github.com/lint-staged/lint-staged)
- **pre-push** — runs all unit and integration tests

Hooks are set up automatically after `yarn install` via the `prepare` script.

## Project Structure
```
src/
  api/              # fetch functions
  assets/           # static assets
  components/       # reusable UI components
  features/         # main feature components
  hooks/            # custom React hooks
  constants.ts      # app constants
  types.ts          # TypeScript types
  utils.ts          # utility functions
```