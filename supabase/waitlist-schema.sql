-- Run this in the Supabase SQL Editor before enabling the waitlist API.
create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  business text,
  created_at timestamptz not null default now(),
  constraint waitlist_email_length check (char_length(email) <= 254),
  constraint waitlist_name_length check (name is null or char_length(name) <= 120),
  constraint waitlist_business_length check (business is null or char_length(business) <= 120)
);

alter table public.waitlist_signups enable row level security;

-- No anon/authenticated policies are intentionally created.
-- The server route writes using SUPABASE_SERVICE_ROLE_KEY, which must remain server-only.
