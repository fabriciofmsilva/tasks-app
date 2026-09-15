# web

Frontend of [tasks-app](../README.md) — Next.js (App Router, TS).

## Run locally

```bash
npm run dev
```

Open at [http://localhost:3000](http://localhost:3000).

## Pages

```
/               ← SSG (Home)
/about          ← SSG
/(auth)/signup  ← SSG (static form; POST processed by /api/signup)
/(auth)/login   ← SSG (static form; POST processed by /api/login)
/(auth)/logout  ← SSG
/tasks          ← SSR
/tasks/[id]     ← SSR
```

## Lessons

`/about` is SSG because its content is fixed and can be sent to every user. `/tasks`, on the other hand, is guarded by login and served as SSR so it renders only the tasks of the logged-in user.

SSG is served as pure HTML, which can be cached/CDN'd, saving on server-side processing. If fixed content were processed server-side, we'd pay that cost on every request.

SSR processes every request on the server side to generate a custom page per user. If we served a dynamic page as if it were static, we could end up mixing content between users.

## What I still don't understand about rendering

Building this app helped me understand the difference between SSG and SSR in Next.js. I still haven't learned ISR, streaming, Server Actions, or revalidation — that's a knowledge gap, and these concepts still need to be applied in the project.

## Status

Work in progress: public landing page, fake login/signup, and a task dashboard.
