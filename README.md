# Welcome to my [Website!](https://daliborhon.dev)

## Info

This is an [Astro](https://astro.build) project for my personal website, which I play to use as a blog.
The project is continually in development, as I also take it as an opportunity to learn something new.

I guess for experienced developers a lot of things in this repo will not make any sense, however, everybody has to start somewhere.

## Stack

-   Frameworks:
    -   [Astro](https://astro.build)
    -   Some of the UI: [React](https://react.dev/)
    -   Internationalization [Inlang - ParaglideJS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)
-   Content Management:
    -   [Caisy](https://caisy.io) is used for blog posts
    -   [Astro Markdown](https://docs.astro.build/en/guides/markdown-content/) is used to manage other content

## Deployment

Deployments are done through Cloudflare pages on the main branch (production), and on all other branches as preview.

### Webhooks
Deploy is also triggered by a new post in the CMS (Caisy). This is done through an endpoint, which authenticates the request and in turn calls a deploy hook provided by Cloudflare. The endpoint is localed at a path `/api/build` and it accepts a POST request with some headers.

| Header                  | Description                                                                                           |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| x-webhook-disable-build | Disables the build completely on this endpoint.                                                       |
| x-webhook-auth-key      | Authentification key required to run the build. Set from environment variable CAISY_WEBHOOK_AUTH_KEY. |
| x-webhook-build-env     | What environment to build. Possible values are 'prod', 'preview', 'all'.                              |

### Variables

| Name                              | Description                                                          |
| :-------------------------------- | -------------------------------------------------------------------- |
| CAISY_WEBHOOK_AUTH_KEY            | Authentification key required to authenticate the Caisy webhook call |
| CLOUDFLARE_PREVIEW_BUILD_HOOK_URL | URL for Cloudflare's build hook url for preview build                |
| CLOUDFLARE_PROD_BUILD_HOOK_URL    | URL for Cloudflare's build hook url for production build             |
| DISABLE_WEBHOOK_BUILD             | Disables the build on the `/api/build` endpoint                      |
| CAISY_PROJECT_ID                  | Caisy project ID                                                     |
| CAISY_API_KEY                     | Caisy API key required to use the API's                              |

## Commands

This project uses `pnpm` as it's package manager. It is installed using `corepack`. If you don't have it enabled, please see the [corepack docs](https://nodejs.org/api/corepack.html).

To work with this project, run `pnpm init`. This command builds all the required parts.

All commands are run from the root of the project, from a terminal:

| Command                           | Action                                                                  |
| :-------------------------------- | :---------------------------------------------------------------------- |
| `pnpm install`                    | Installs dependencies                                                   |
| `pnpm run init`                   | Initializes the project for development                                 |
| `pnpm run dev`                    | Starts local dev server at `localhost:4321`                             |
| `pnpm run dev-host`               | Starts local dev server hosted at a network                             |
| `pnpm run build`                  | Build production site to `./dist/`                                      |
| `pnpm run preview`                | Preview the build locally with Wrangler                                 |
| `pnpm run astro ...`              | Run CLI commands like `astro add`, `astro preview`                      |
| `pnpm run sync`                   | Runs the `astro sync` command to generate content collection types      |
| `pnpm run prettier-check`         | Runs the `prettier . --check` command to check for formatting problems  |
| `pnpm run prettier-format`        | Runs the `prettier . --write` command to fix formatting problems        |
| `pnpm run build-and-preview`      | Builds production site and previews locally using Wrangler              |
| `pnpm run build:index`            | Generates indexes for Pagefind from `./dist/` (site mustbe built first) |
| `pnpm run generate:graphql`       | Generates GraphQL code based on configuration in `codegen.ts`           |
| `pnpm run generate:graphql-watch` | Generates GraphQL code and watches for changes                          |
| `pnpm run generate:graphql-check` | Checks generated GraphQL code against the defined endpoint              |
| `pnpm run compile:paraglide`      | Compiles Paraglide project located at `./project.inlang`                |
| `pnpm run wrangler:types`         | Generates Wrangler types                                                |

