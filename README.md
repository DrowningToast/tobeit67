# ToBeIT67

This is a monorepo for most of the services (exclude discord bot) used in the event.

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `cms`: a content management system, used as a tool for configuring the details of the service. e.g. seat reservation, blogs
- `home`: a [Next.js](https://nextjs.org) app, deployed on vercel as a landing page and dashboard for participants.
- `regis`: a Nest.js backend which uses GraphQL and Prisma.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking

### Prerequisite

Here are all technologies those are required to develop and build:

- Node js 16
- pnpm
- Docker
- Firebase Project

### Services used

Here are all services used in this app (runs on Docker):

- postgres
- uptime-kuma
- pgbouncer
- Strapi CMS (only when running `pnpm run compose:prod`)

### Presetup & Environment Variables

Run the following command to copy the .env.example to .env.template:

```
pnpm presetup
```

Optionally, once done with editing the template file, run this command to distribute them to the apps:

```
pnpm setup:env
```

### Setup

To setup all apps and packages, run the following command:

```
pnpm run setup
```

### Commands related to composing Docker containers

To develop all apps and packages, run the following command:

- `pnpm run compose:dev` compose every services excepted for cms
- `pnpm run compose:prod` compose every services including cms (app)

### Commands related to Prisma

To develop all apps and packages, run the following command:

- `pnpm run db:migrate` migrate regis prisma
- `pnpm run db:generate` generaate regis prisma

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
pnpm dlx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
pnpm dlx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
