-- ============================================================
-- AAASE Alumni Network Platform — Supabase Schema
-- Migration: 001_initial_schema.sql
-- ============================================================

-- Enable extensions
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";
-- For AI semantic search (optional, requires Supabase Vector)
-- create extension if not exists "vector";

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  -- Identity
  full_name text not null,
  first_name text,
  initials text generated always as (upper(left(full_name, 1))) stored,
  avatar_url text,
  bio text,

  -- Professional
  role text,
  company text,
  industry text,
  linkedin_url text,
  website_url text,

  -- AAASE membership
  graduation_year int check (graduation_year >= 1950 and graduation_year <= 2030),
  member_number text unique,
  member_since date default current_date,
  is_verified boolean default false,
  is_mentor boolean default false,
  is_founder boolean default false,
  profile_completeness int default 0 check (profile_completeness between 0 and 100),

  -- Location
  city text,
  country text default 'Portugal',
  latitude numeric,
  longitude numeric,

  -- Trust
  trust_score int default 50 check (trust_score between 0 and 100),

  -- Languages (array)
  languages text[] default '{"Portuguese"}',

  -- Skills & interests (arrays)
  skills text[] default '{}',
  interests text[] default '{}',

  -- Admin
  is_admin boolean default false,
  is_active boolean default true,

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: members can read all profiles, only edit their own
alter table public.profiles enable row level security;

create policy "Profiles are viewable by all authenticated members"
  on public.profiles for select
  using (auth.role() = 'authenticated');

create policy "Members can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Members can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-update timestamp
create or replace function public.update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at();

-- ============================================================
-- CONNECTIONS (graph edges between members)
-- ============================================================
create table public.connections (
  id uuid primary key default gen_random_uuid(),
  from_user_id uuid references public.profiles(id) on delete cascade not null,
  to_user_id uuid references public.profiles(id) on delete cascade not null,
  strength text check (strength in ('close', 'warm', 'distant')) default 'warm',
  status text check (status in ('pending', 'accepted', 'declined')) default 'pending',
  created_at timestamptz default now(),
  unique(from_user_id, to_user_id)
);

alter table public.connections enable row level security;

create policy "Connections viewable by participants"
  on public.connections for select
  using (auth.uid() = from_user_id or auth.uid() = to_user_id);

create policy "Members can request connections"
  on public.connections for insert
  with check (auth.uid() = from_user_id);

create policy "Members can update their connections"
  on public.connections for update
  using (auth.uid() = from_user_id or auth.uid() = to_user_id);

-- ============================================================
-- INTRODUCTIONS
-- ============================================================
create table public.introductions (
  id uuid primary key default gen_random_uuid(),
  from_user_id uuid references public.profiles(id) on delete cascade not null,
  to_user_id uuid references public.profiles(id) on delete cascade not null,
  via_user_id uuid references public.profiles(id) on delete set null,
  message text not null,
  collaboration_angle text,
  talking_points text[] default '{}',
  status text check (status in ('pending', 'accepted', 'declined', 'completed')) default 'pending',
  ai_generated boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.introductions enable row level security;

create policy "Introductions viewable by participants"
  on public.introductions for select
  using (auth.uid() = from_user_id or auth.uid() = to_user_id or auth.uid() = via_user_id);

create policy "Members can create introductions"
  on public.introductions for insert
  with check (auth.uid() = from_user_id);

create trigger introductions_updated_at
  before update on public.introductions
  for each row execute procedure public.update_updated_at();

-- ============================================================
-- GROUPS (micro-communities)
-- ============================================================
create table public.groups (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  emoji text default '👥',
  category text check (category in ('Professional', 'Regional', 'Cause', 'Life', 'Values', 'Social')),
  is_private boolean default false,
  created_by uuid references public.profiles(id) on delete set null,
  member_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.groups enable row level security;

create policy "Groups viewable by all authenticated members"
  on public.groups for select
  using (auth.role() = 'authenticated');

create policy "Admins can manage groups"
  on public.groups for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- Group memberships
create table public.group_members (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references public.groups(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text check (role in ('member', 'moderator', 'admin')) default 'member',
  joined_at timestamptz default now(),
  unique(group_id, user_id)
);

alter table public.group_members enable row level security;

create policy "Group members viewable by all authenticated members"
  on public.group_members for select
  using (auth.role() = 'authenticated');

create policy "Members can join groups"
  on public.group_members for insert
  with check (auth.uid() = user_id);

create policy "Members can leave groups"
  on public.group_members for delete
  using (auth.uid() = user_id);

-- Auto-update group member count
create or replace function public.update_group_member_count()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    update public.groups set member_count = member_count + 1 where id = new.group_id;
  elsif tg_op = 'DELETE' then
    update public.groups set member_count = greatest(0, member_count - 1) where id = old.group_id;
  end if;
  return null;
end;
$$;

create trigger group_member_count_trigger
  after insert or delete on public.group_members
  for each row execute procedure public.update_group_member_count();

-- ============================================================
-- BUSINESSES (Alumni Commerce)
-- ============================================================
create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  founder_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  category text,
  description text,
  logo_url text,
  logo_emoji text,
  website_url text,
  city text,
  country text default 'Portugal',
  founded_year int,
  community_perk text,
  is_verified boolean default false,
  trust_badge boolean default false,
  endorsement_count int default 0,
  rating numeric(2,1) default 0 check (rating between 0 and 5),
  review_count int default 0,
  tags text[] default '{}',
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.businesses enable row level security;

create policy "Businesses viewable by all authenticated members"
  on public.businesses for select
  using (auth.role() = 'authenticated');

create policy "Founders can manage their businesses"
  on public.businesses for all
  using (auth.uid() = founder_id);

create trigger businesses_updated_at
  before update on public.businesses
  for each row execute procedure public.update_updated_at();

-- Business endorsements
create table public.business_endorsements (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.businesses(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(business_id, user_id)
);

alter table public.business_endorsements enable row level security;

create policy "Endorsements viewable by all authenticated members"
  on public.business_endorsements for select
  using (auth.role() = 'authenticated');

create policy "Members can endorse businesses"
  on public.business_endorsements for insert
  with check (auth.uid() = user_id);

create policy "Members can remove their endorsements"
  on public.business_endorsements for delete
  using (auth.uid() = user_id);

-- Business reviews
create table public.business_reviews (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.businesses(id) on delete cascade not null,
  reviewer_id uuid references public.profiles(id) on delete cascade not null,
  rating int check (rating between 1 and 5) not null,
  content text,
  is_featured boolean default false,
  created_at timestamptz default now(),
  unique(business_id, reviewer_id)
);

alter table public.business_reviews enable row level security;

create policy "Reviews viewable by all authenticated members"
  on public.business_reviews for select
  using (auth.role() = 'authenticated');

create policy "Members can write reviews"
  on public.business_reviews for insert
  with check (auth.uid() = reviewer_id);

-- ============================================================
-- OPPORTUNITIES
-- ============================================================
create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  posted_by uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  type text check (type in ('job', 'consulting', 'mentoring', 'speaking', 'investment', 'volunteer', 'collaboration')) not null,
  company text,
  description text,
  city text,
  country text,
  compensation text,
  deadline date,
  tags text[] default '{}',
  is_active boolean default true,
  applications_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.opportunities enable row level security;

create policy "Opportunities viewable by all authenticated members"
  on public.opportunities for select
  using (auth.role() = 'authenticated');

create policy "Members can post opportunities"
  on public.opportunities for insert
  with check (auth.uid() = posted_by);

create policy "Members can edit their opportunities"
  on public.opportunities for update
  using (auth.uid() = posted_by);

create trigger opportunities_updated_at
  before update on public.opportunities
  for each row execute procedure public.update_updated_at();

-- ============================================================
-- REWARDS & BENEFITS
-- ============================================================
create table public.rewards (
  id uuid primary key default gen_random_uuid(),
  partner_name text not null,
  partner_logo text,
  title text not null,
  description text,
  benefit text,
  category text,
  promo_code text,
  valid_until date,
  is_exclusive boolean default true,
  is_most_loved boolean default false,
  redemption_count int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

alter table public.rewards enable row level security;

create policy "Rewards viewable by all authenticated members"
  on public.rewards for select
  using (auth.role() = 'authenticated');

-- Track reward redemptions per member
create table public.reward_redemptions (
  id uuid primary key default gen_random_uuid(),
  reward_id uuid references public.rewards(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  redeemed_at timestamptz default now(),
  unique(reward_id, user_id)
);

alter table public.reward_redemptions enable row level security;

create policy "Members can view their own redemptions"
  on public.reward_redemptions for select
  using (auth.uid() = user_id);

create policy "Members can redeem rewards"
  on public.reward_redemptions for insert
  with check (auth.uid() = user_id);

-- ============================================================
-- EVENTS
-- ============================================================
create table public.events (
  id uuid primary key default gen_random_uuid(),
  organizer_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  type text check (type in ('networking', 'dinner', 'talk', 'webinar', 'reunion', 'workshop')) not null,
  event_date date not null,
  event_time time,
  location text,
  city text,
  country text default 'Portugal',
  is_virtual boolean default false,
  virtual_link text,
  capacity int,
  attendee_count int default 0,
  price_members numeric default 0,
  price_guests numeric,
  tags text[] default '{}',
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.events enable row level security;

create policy "Events viewable by all authenticated members"
  on public.events for select
  using (auth.role() = 'authenticated');

create policy "Members can create events"
  on public.events for insert
  with check (auth.uid() = organizer_id);

create policy "Organizers can edit events"
  on public.events for update
  using (auth.uid() = organizer_id);

create trigger events_updated_at
  before update on public.events
  for each row execute procedure public.update_updated_at();

-- Event registrations
create table public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  status text check (status in ('registered', 'waitlist', 'cancelled', 'attended')) default 'registered',
  registered_at timestamptz default now(),
  unique(event_id, user_id)
);

alter table public.event_registrations enable row level security;

create policy "Members can view event registrations"
  on public.event_registrations for select
  using (auth.role() = 'authenticated');

create policy "Members can register for events"
  on public.event_registrations for insert
  with check (auth.uid() = user_id);

create policy "Members can cancel their registration"
  on public.event_registrations for update
  using (auth.uid() = user_id);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text check (type in ('intro', 'connection', 'opportunity', 'event', 'reward', 'message', 'system')) not null,
  title text not null,
  body text,
  action_url text,
  is_read boolean default false,
  created_at timestamptz default now()
);

alter table public.notifications enable row level security;

create policy "Members can view their own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "Members can mark their notifications as read"
  on public.notifications for update
  using (auth.uid() = user_id);

-- ============================================================
-- TRUST SCORE FUNCTION
-- Recalculate trust score based on activity
-- ============================================================
create or replace function public.calculate_trust_score(user_id uuid)
returns int language plpgsql as $$
declare
  score int := 50;
  connection_count int;
  intro_count int;
  review_count int;
  completeness int;
begin
  -- Base from profile completeness
  select profile_completeness into completeness from public.profiles where id = user_id;
  score := score + (completeness / 10);

  -- Connections (max +15)
  select count(*) into connection_count from public.connections
  where (from_user_id = user_id or to_user_id = user_id) and status = 'accepted';
  score := score + least(15, connection_count);

  -- Introductions made (max +10)
  select count(*) into intro_count from public.introductions
  where via_user_id = user_id and status in ('accepted', 'completed');
  score := score + least(10, intro_count * 2);

  -- Reviews written (max +5)
  select count(*) into review_count from public.business_reviews where reviewer_id = user_id;
  score := score + least(5, review_count);

  return least(100, score);
end;
$$;

-- ============================================================
-- ADMIN VIEW: Community Stats
-- ============================================================
create or replace view public.community_stats as
select
  (select count(*) from public.profiles where is_active = true) as total_alumni,
  (select count(*) from public.profiles where updated_at > now() - interval '30 days') as active_this_month,
  (select count(*) from public.introductions where status in ('accepted', 'completed')) as introductions_made,
  (select count(*) from public.events where event_date > current_date) as upcoming_events,
  (select count(*) from public.businesses where is_active = true) as total_businesses,
  (select count(*) from public.groups) as total_groups;

-- ============================================================
-- SEED: Auto-create profile on user signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Novo Membro'),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
