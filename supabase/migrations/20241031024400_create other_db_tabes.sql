create type "public"."volunteer_status" as enum ('pending', 'done');

drop policy "everyone can see posts" on "public"."posts";

drop policy "only logged in users can create posts" on "public"."posts";

drop policy "only the user can delete his own posts" on "public"."posts";

drop policy "only the user can edit" on "public"."posts";

create table "public"."galleries" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "urls" text[],
    "name" text not null,
    "description" text
);


alter table "public"."galleries" enable row level security;

create table "public"."projects" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null default ''::text,
    "description" text default ''::text
);


alter table "public"."projects" enable row level security;

create table "public"."projects_galleries" (
    "project_id" uuid not null,
    "gallery_id" uuid not null
);


alter table "public"."projects_galleries" enable row level security;

create table "public"."volunteers" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "fullname" text not null,
    "email" text not null,
    "start_date" date not null,
    "end_date" date not null,
    "status" volunteer_status not null default 'pending'::volunteer_status,
    "age" numeric not null,
    "nationality" text not null,
    "medical_problems" text,
    "allergies" text
);


alter table "public"."volunteers" enable row level security;

alter table "public"."posts" add column "project_id" uuid;

alter table "public"."posts" add column "thumb" text not null;

CREATE UNIQUE INDEX galleries_pkey ON public.galleries USING btree (id);

CREATE UNIQUE INDEX projects_galleries_pkey ON public.projects_galleries USING btree (project_id, gallery_id);

CREATE UNIQUE INDEX projects_pkey ON public.projects USING btree (id);

CREATE UNIQUE INDEX volunteers_pkey ON public.volunteers USING btree (id);

alter table "public"."galleries" add constraint "galleries_pkey" PRIMARY KEY using index "galleries_pkey";

alter table "public"."projects" add constraint "projects_pkey" PRIMARY KEY using index "projects_pkey";

alter table "public"."projects_galleries" add constraint "projects_galleries_pkey" PRIMARY KEY using index "projects_galleries_pkey";

alter table "public"."volunteers" add constraint "volunteers_pkey" PRIMARY KEY using index "volunteers_pkey";

alter table "public"."posts" add constraint "posts_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) not valid;

alter table "public"."posts" validate constraint "posts_project_id_fkey";

alter table "public"."projects_galleries" add constraint "projects_galleries_gallery_id_fkey" FOREIGN KEY (gallery_id) REFERENCES galleries(id) not valid;

alter table "public"."projects_galleries" validate constraint "projects_galleries_gallery_id_fkey";

alter table "public"."projects_galleries" add constraint "projects_galleries_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) not valid;

alter table "public"."projects_galleries" validate constraint "projects_galleries_project_id_fkey";

grant delete on table "public"."galleries" to "anon";

grant insert on table "public"."galleries" to "anon";

grant references on table "public"."galleries" to "anon";

grant select on table "public"."galleries" to "anon";

grant trigger on table "public"."galleries" to "anon";

grant truncate on table "public"."galleries" to "anon";

grant update on table "public"."galleries" to "anon";

grant delete on table "public"."galleries" to "authenticated";

grant insert on table "public"."galleries" to "authenticated";

grant references on table "public"."galleries" to "authenticated";

grant select on table "public"."galleries" to "authenticated";

grant trigger on table "public"."galleries" to "authenticated";

grant truncate on table "public"."galleries" to "authenticated";

grant update on table "public"."galleries" to "authenticated";

grant delete on table "public"."galleries" to "service_role";

grant insert on table "public"."galleries" to "service_role";

grant references on table "public"."galleries" to "service_role";

grant select on table "public"."galleries" to "service_role";

grant trigger on table "public"."galleries" to "service_role";

grant truncate on table "public"."galleries" to "service_role";

grant update on table "public"."galleries" to "service_role";

grant delete on table "public"."projects" to "anon";

grant insert on table "public"."projects" to "anon";

grant references on table "public"."projects" to "anon";

grant select on table "public"."projects" to "anon";

grant trigger on table "public"."projects" to "anon";

grant truncate on table "public"."projects" to "anon";

grant update on table "public"."projects" to "anon";

grant delete on table "public"."projects" to "authenticated";

grant insert on table "public"."projects" to "authenticated";

grant references on table "public"."projects" to "authenticated";

grant select on table "public"."projects" to "authenticated";

grant trigger on table "public"."projects" to "authenticated";

grant truncate on table "public"."projects" to "authenticated";

grant update on table "public"."projects" to "authenticated";

grant delete on table "public"."projects" to "service_role";

grant insert on table "public"."projects" to "service_role";

grant references on table "public"."projects" to "service_role";

grant select on table "public"."projects" to "service_role";

grant trigger on table "public"."projects" to "service_role";

grant truncate on table "public"."projects" to "service_role";

grant update on table "public"."projects" to "service_role";

grant delete on table "public"."projects_galleries" to "anon";

grant insert on table "public"."projects_galleries" to "anon";

grant references on table "public"."projects_galleries" to "anon";

grant select on table "public"."projects_galleries" to "anon";

grant trigger on table "public"."projects_galleries" to "anon";

grant truncate on table "public"."projects_galleries" to "anon";

grant update on table "public"."projects_galleries" to "anon";

grant delete on table "public"."projects_galleries" to "authenticated";

grant insert on table "public"."projects_galleries" to "authenticated";

grant references on table "public"."projects_galleries" to "authenticated";

grant select on table "public"."projects_galleries" to "authenticated";

grant trigger on table "public"."projects_galleries" to "authenticated";

grant truncate on table "public"."projects_galleries" to "authenticated";

grant update on table "public"."projects_galleries" to "authenticated";

grant delete on table "public"."projects_galleries" to "service_role";

grant insert on table "public"."projects_galleries" to "service_role";

grant references on table "public"."projects_galleries" to "service_role";

grant select on table "public"."projects_galleries" to "service_role";

grant trigger on table "public"."projects_galleries" to "service_role";

grant truncate on table "public"."projects_galleries" to "service_role";

grant update on table "public"."projects_galleries" to "service_role";

grant delete on table "public"."volunteers" to "anon";

grant insert on table "public"."volunteers" to "anon";

grant references on table "public"."volunteers" to "anon";

grant select on table "public"."volunteers" to "anon";

grant trigger on table "public"."volunteers" to "anon";

grant truncate on table "public"."volunteers" to "anon";

grant update on table "public"."volunteers" to "anon";

grant delete on table "public"."volunteers" to "authenticated";

grant insert on table "public"."volunteers" to "authenticated";

grant references on table "public"."volunteers" to "authenticated";

grant select on table "public"."volunteers" to "authenticated";

grant trigger on table "public"."volunteers" to "authenticated";

grant truncate on table "public"."volunteers" to "authenticated";

grant update on table "public"."volunteers" to "authenticated";

grant delete on table "public"."volunteers" to "service_role";

grant insert on table "public"."volunteers" to "service_role";

grant references on table "public"."volunteers" to "service_role";

grant select on table "public"."volunteers" to "service_role";

grant trigger on table "public"."volunteers" to "service_role";

grant truncate on table "public"."volunteers" to "service_role";

grant update on table "public"."volunteers" to "service_role";

create policy "everyone can read"
on "public"."galleries"
as permissive
for select
to public
using (true);


create policy "only logged in users can create"
on "public"."galleries"
as permissive
for insert
to authenticated
with check (true);


create policy "only logged in users can delete"
on "public"."galleries"
as permissive
for delete
to authenticated
using (true);


create policy "only logged in users can edit"
on "public"."galleries"
as permissive
for update
to authenticated
using (true)
with check (true);


create policy "everyone can read"
on "public"."posts"
as permissive
for select
to public
using (true);


create policy "only logged in users can create"
on "public"."posts"
as permissive
for insert
to authenticated
with check (true);


create policy "only logged in users can delete"
on "public"."posts"
as permissive
for delete
to authenticated
using (true);


create policy "only logged in users can edit"
on "public"."posts"
as permissive
for update
to authenticated
using (true)
with check (true);


create policy "everyone can read"
on "public"."projects"
as permissive
for select
to public
using (true);


create policy "only logged in users can create"
on "public"."projects"
as permissive
for insert
to authenticated
with check (true);


create policy "only logged in users can delete"
on "public"."projects"
as permissive
for delete
to authenticated
using (true);


create policy "only logged in users can edit"
on "public"."projects"
as permissive
for update
to authenticated
using (true)
with check (true);


create policy "everyone can read"
on "public"."projects_galleries"
as permissive
for select
to public
using (true);


create policy "only logged in users can create"
on "public"."projects_galleries"
as permissive
for insert
to authenticated
with check (true);


create policy "only logged in users can delete"
on "public"."projects_galleries"
as permissive
for delete
to authenticated
using (true);


create policy "only logged in users can edit"
on "public"."projects_galleries"
as permissive
for update
to authenticated
using (true)
with check (true);


create policy "everyone can create"
on "public"."volunteers"
as permissive
for insert
to public
with check (true);


create policy "only logged in users can delete"
on "public"."volunteers"
as permissive
for delete
to authenticated
using (true);


create policy "only logged in users can read"
on "public"."volunteers"
as permissive
for select
to authenticated
using (true);


create policy "only logged in users can update"
on "public"."volunteers"
as permissive
for update
to authenticated
using (true)
with check (true);