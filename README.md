# Sello

Sello is an early-stage landing-page MVP for an AI-assisted online store builder. The current app provides a product landing page and an email waitlist endpoint.

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Supabase Postgres for durable waitlist storage

## Local development

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Configure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`. Keep the service-role key server-only; never add a `NEXT_PUBLIC_` prefix or commit real secrets.

## Waitlist database setup

1. Create a Supabase project.
2. Run the SQL in `supabase/waitlist-schema.sql` in the Supabase SQL Editor.
3. Set the project URL and service-role key in the deployment environment.
4. Deploy the app and submit a test signup.

The API validates and normalizes the email, bounds optional text fields, limits request size, and inserts into `waitlist_signups`. A unique email constraint makes repeated submissions idempotent. The service-role key is used only in the server route; Row Level Security is enabled and no public table policies are created.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Current scope and production considerations

This repository is a landing-page and waitlist MVP, not the complete Sello store-builder product. Store provisioning, AI generation, product/catalogue management, orders, WhatsApp checkout, delivery integrations, tenant isolation, and merchant authentication are not implemented here.

Before opening the waitlist endpoint to a large public audience, add edge/server-side rate limiting and bot protection (for example, a CAPTCHA or Turnstile verification), monitoring, and a retention/privacy policy. Do not expose the Supabase service-role key to the browser. Use a separate authenticated, tenant-scoped backend for future merchant and store data.
