create extension if not exists pgcrypto;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_allowlist (
  email text primary key,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner', 'director')),
  created_at timestamptz not null default now()
);

create table if not exists public.staff_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  account_code varchar(4),
  login_email text unique,
  password_vault text,
  display_name text not null,
  job_title text not null,
  role text not null check (role in ('owner', 'principal', 'director', 'office', 'teacher')),
  is_active boolean not null default true,
  failed_attempts integer not null default 0,
  locked_until timestamptz,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, account_code),
  check (account_code is null or account_code ~ '^[A-Z0-9]{4}$')
);

alter table public.staff_profiles
add column if not exists password_vault text;

alter table public.staff_profiles
drop constraint if exists staff_profiles_role_check;
alter table public.staff_profiles
add constraint staff_profiles_role_check
check (role in ('owner', 'principal', 'director', 'office', 'teacher'));

create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  target_user_id uuid references auth.users(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists staff_profiles_set_updated_at on public.staff_profiles;
create trigger staff_profiles_set_updated_at
before update on public.staff_profiles
for each row execute function public.set_updated_at();

create or replace function public.handle_approved_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.staff_profiles (
    user_id, organization_id, display_name, job_title, role, is_active
  )
  select
    new.id,
    allowlist.organization_id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email, '管理員'),
    '園所管理員',
    allowlist.role,
    true
  from public.admin_allowlist as allowlist
  where lower(allowlist.email) = lower(new.email)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_staff_admin on auth.users;
create trigger on_auth_user_created_staff_admin
after insert on auth.users
for each row execute function public.handle_approved_admin();

alter table public.organizations enable row level security;
alter table public.admin_allowlist enable row level security;
alter table public.staff_profiles enable row level security;
alter table public.audit_logs enable row level security;

create or replace function public.current_staff_organization_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select organization_id from public.staff_profiles
  where user_id = auth.uid() and is_active = true
$$;

create or replace function public.current_staff_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.staff_profiles
  where user_id = auth.uid() and is_active = true
$$;

drop policy if exists "staff can read own profile" on public.staff_profiles;
create policy "staff can read own profile" on public.staff_profiles
for select using (user_id = auth.uid());

drop policy if exists "leaders can read organization profiles" on public.staff_profiles;
create policy "leaders can read organization profiles" on public.staff_profiles
for select using (
  organization_id = public.current_staff_organization_id()
  and public.current_staff_role() in ('owner', 'director')
);

drop policy if exists "leaders can read organization audit logs" on public.audit_logs;
create policy "leaders can read organization audit logs" on public.audit_logs
for select using (
  organization_id = public.current_staff_organization_id()
  and public.current_staff_role() in ('owner', 'director')
);

-- The project disables automatic Data API grants. Grant only the minimum
-- privileges needed by signed-in staff and the server-side management client.
grant usage on schema public to authenticated, service_role;
grant select on public.staff_profiles to authenticated;

grant all privileges on table public.organizations to service_role;
grant all privileges on table public.admin_allowlist to service_role;
grant all privileges on table public.staff_profiles to service_role;
grant all privileges on table public.audit_logs to service_role;
grant usage, select on sequence public.audit_logs_id_seq to service_role;

insert into public.organizations (slug, name)
values ('miter', '米堤爾幼兒園')
on conflict (slug) do update set name = excluded.name;

-- 執行 migration 後，請將園長 Google Email 加入白名單：
-- insert into public.admin_allowlist (email, organization_id, role)
-- select '園長的 Google Email', id, 'owner'
-- from public.organizations where slug = 'miter';
