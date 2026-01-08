-- 1. RESET: Drop everything if exists to start fresh
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop table if exists public.profiles;

-- 2. Create table with First and Last Name
create table public.profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  username text unique,
  first_name text,
  last_name text,
  full_name text generated always as (first_name || ' ' || last_name) stored, -- Auto-generated full name
  
  constraint username_length check (char_length(username) >= 3)
);

-- 3. Enable RLS
alter table public.profiles enable row level security;

-- 4. Policies
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- 5. Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (
    new.id, 
    new.raw_user_meta_data->>'first_name', 
    new.raw_user_meta_data->>'last_name'
  );
  return new;
end;
$$ language plpgsql security definer;

-- 6. Trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
