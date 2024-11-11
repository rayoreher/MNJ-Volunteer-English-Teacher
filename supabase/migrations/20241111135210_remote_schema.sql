drop policy "everyone can create" on "public"."volunteers";

alter table "public"."reviews" drop column "content";

alter table "public"."reviews" add column "comment" text not null default ''::text;

alter table "public"."reviews" alter column "fullname" set default ''::text;

alter table "public"."reviews" alter column "id" set default gen_random_uuid();

alter table "public"."reviews" alter column "id" drop identity;

alter table "public"."reviews" alter column "id" set data type uuid using "id"::uuid;

create policy "only logged in users can create"
on "public"."volunteers"
as permissive
for insert
to authenticated
with check (true);



