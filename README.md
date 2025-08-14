This is The Network — an interactive challenge platform integrated with Discord.

## Getting Started

1. Copy `.env.example` to `.env` and fill values.
2. Run `npm install`.
3. Start Postgres and Redis; set `DATABASE_URL` and `REDIS_URL`.
4. Run `npm run prisma:migrate` then `npm run db:seed`.
5. Start dev server with `npm run dev`.

Key scripts:

- `prisma:migrate`: run migrations
- `db:seed`: seed demo data
- `prisma:studio`: view DB
- `dev`: Next.js dev server

## Docs

- Auth: Discord via NextAuth
- DB: Prisma Postgres
- Queues: BullMQ (Redis)
- Payments: Stripe webhooks
