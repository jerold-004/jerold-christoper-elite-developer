# Jerold Christoper Portfolio

Personal portfolio built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

## Run Locally

```sh
npm install
npm run dev
```

For API-backed features (contact form + exact GitHub contribution sync), also run:

```sh
npm run server
```

Or run both together:

```sh
npm run dev:full
```

## Build

```sh
npm run build
npm run preview
```

## Test

```sh
npm run test
```
# setting

Copy `.env.example` to `.env` and set values

- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` for contact email API
- `GITHUB_TOKEN`, `GITHUB_USERNAME` for exact GitHub contribution calendar syncing
