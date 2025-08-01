# NextJS + Elysia + Better Auth + Supabase

This is a template for a NextJS + Elysia + Better Auth + Supabase project. It uses the following technologies:

- [NextJS](https://nextjs.org/) for the frontend
- [Elysia](https://elysiajs.com/) for the backend
- [Better Auth](https://better-auth.com/) for authentication
- [Supabase](https://supabase.com/) for the database

## Using this example

Run the following command:

```sh
bun install
```

## What's inside?

This project includes the following packages/apps:

### Apps and Packages

- `web`: an [Next.js](https://nextjs.org/) app
- `backend_worker`: an [Elysia](https://elysiajs.com/) app
- `api`: another [Elysia](https://elysiajs.com/) app
- `auth`: a custom authentication module using [Better Auth](https://better-auth.com/)
- `database`: a custom database module using [Supabase](https://supabase.com/) with Prisma

- `@template/ui`: a stub React component library shared by both `web` and `backend_worker` applications
- `@template/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@template/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd template

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd template

# Install dependencies
bun install

# Change the .env.local file with your credentials

# Start the development server
bun dev
```
