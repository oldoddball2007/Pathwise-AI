create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.syllabi (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content text not null,
  roadmap_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.study_plans (
  id uuid primary key default uuid_generate_v4(),
  syllabus_id uuid references public.syllabi(id) on delete cascade,
  exam_date date not null,
  daily_hours int not null,
  study_days int not null,
  plan_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.progress (
  id uuid primary key default uuid_generate_v4(),
  study_plan_id uuid references public.study_plans(id) on delete cascade,
  completed_topics int not null default 0,
  study_hours numeric not null default 0,
  completion_percentage int not null default 0,
  learning_streak int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.focus_sessions (
  id uuid primary key default uuid_generate_v4(),
  study_plan_id uuid references public.study_plans(id) on delete cascade,
  topic text not null,
  duration int not null,
  completed boolean not null default false,
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

create table if not exists public.chat_history (
  id uuid primary key default uuid_generate_v4(),
  study_plan_id uuid references public.study_plans(id) on delete cascade,
  question text not null,
  answer text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_syllabi_created_at on public.syllabi(created_at desc);
create index if not exists idx_study_plans_syllabus on public.study_plans(syllabus_id);
create index if not exists idx_progress_plan on public.progress(study_plan_id);
create index if not exists idx_focus_sessions_plan on public.focus_sessions(study_plan_id);
create index if not exists idx_chat_history_plan on public.chat_history(study_plan_id);

alter table public.profiles enable row level security;
alter table public.syllabi enable row level security;
alter table public.study_plans enable row level security;
alter table public.progress enable row level security;
alter table public.focus_sessions enable row level security;
alter table public.chat_history enable row level security;

drop policy if exists profiles_select_all on public.profiles;
drop policy if exists profiles_insert_all on public.profiles;
drop policy if exists profiles_update_all on public.profiles;
create policy profiles_select_all on public.profiles for select using (true);
create policy profiles_insert_all on public.profiles for insert with check (true);
create policy profiles_update_all on public.profiles for update using (true) with check (true);

drop policy if exists syllabi_select_all on public.syllabi;
drop policy if exists syllabi_insert_all on public.syllabi;
drop policy if exists syllabi_update_all on public.syllabi;
drop policy if exists syllabi_delete_all on public.syllabi;
create policy syllabi_select_all on public.syllabi for select using (true);
create policy syllabi_insert_all on public.syllabi for insert with check (true);
create policy syllabi_update_all on public.syllabi for update using (true) with check (true);
create policy syllabi_delete_all on public.syllabi for delete using (true);

drop policy if exists study_plans_select_all on public.study_plans;
drop policy if exists study_plans_insert_all on public.study_plans;
drop policy if exists study_plans_update_all on public.study_plans;
create policy study_plans_select_all on public.study_plans for select using (true);
create policy study_plans_insert_all on public.study_plans for insert with check (true);
create policy study_plans_update_all on public.study_plans for update using (true) with check (true);

drop policy if exists progress_select_all on public.progress;
drop policy if exists progress_insert_all on public.progress;
drop policy if exists progress_update_all on public.progress;
create policy progress_select_all on public.progress for select using (true);
create policy progress_insert_all on public.progress for insert with check (true);
create policy progress_update_all on public.progress for update using (true) with check (true);

drop policy if exists focus_sessions_select_all on public.focus_sessions;
drop policy if exists focus_sessions_insert_all on public.focus_sessions;
drop policy if exists focus_sessions_update_all on public.focus_sessions;
create policy focus_sessions_select_all on public.focus_sessions for select using (true);
create policy focus_sessions_insert_all on public.focus_sessions for insert with check (true);
create policy focus_sessions_update_all on public.focus_sessions for update using (true) with check (true);

drop policy if exists chat_history_select_all on public.chat_history;
drop policy if exists chat_history_insert_all on public.chat_history;
drop policy if exists chat_history_update_all on public.chat_history;
create policy chat_history_select_all on public.chat_history for select using (true);
create policy chat_history_insert_all on public.chat_history for insert with check (true);
create policy chat_history_update_all on public.chat_history for update using (true) with check (true);

insert into storage.buckets (id, name, public) values ('syllabi', 'syllabi', true)
on conflict (id) do nothing;

drop policy if exists syllabi_storage_select on storage.objects;
drop policy if exists syllabi_storage_insert on storage.objects;
drop policy if exists syllabi_storage_update on storage.objects;
drop policy if exists syllabi_storage_delete on storage.objects;
create policy syllabi_storage_select on storage.objects for select using (bucket_id = 'syllabi');
create policy syllabi_storage_insert on storage.objects for insert with check (bucket_id = 'syllabi');
create policy syllabi_storage_update on storage.objects for update using (bucket_id = 'syllabi') with check (bucket_id = 'syllabi');
create policy syllabi_storage_delete on storage.objects for delete using (bucket_id = 'syllabi');
