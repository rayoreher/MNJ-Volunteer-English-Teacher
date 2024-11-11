drop policy "everyone can create" on "public"."reviews";

drop policy "only logged in users can edit" on "public"."reviews";

drop policy "everyone can create" on "public"."volunteers";

alter table "public"."reviews" drop column "content";

alter table "public"."reviews" add column "comment" text not null default ''::text;

alter table "public"."reviews" alter column "fullname" set default ''::text;

alter table "public"."reviews" alter column "id" drop identity;

create policy "only logged in users can create"
on "public"."reviews"
as permissive
for insert
to authenticated
with check (true);


create policy "only logged in users can update"
on "public"."reviews"
as permissive
for update
to authenticated
using (true)
with check (true);


create policy "only logged in users can create"
on "public"."volunteers"
as permissive
for insert
to authenticated
with check (true);



