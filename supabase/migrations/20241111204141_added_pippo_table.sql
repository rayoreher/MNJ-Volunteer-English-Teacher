create table "public"."pippo" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."pippo" enable row level security;

alter table "public"."reviews" alter column "id" set default gen_random_uuid();

alter table "public"."reviews" alter column "id" set data type uuid using "id"::uuid;

CREATE UNIQUE INDEX pippo_pkey ON public.pippo USING btree (id);

alter table "public"."pippo" add constraint "pippo_pkey" PRIMARY KEY using index "pippo_pkey";

grant delete on table "public"."pippo" to "anon";

grant insert on table "public"."pippo" to "anon";

grant references on table "public"."pippo" to "anon";

grant select on table "public"."pippo" to "anon";

grant trigger on table "public"."pippo" to "anon";

grant truncate on table "public"."pippo" to "anon";

grant update on table "public"."pippo" to "anon";

grant delete on table "public"."pippo" to "authenticated";

grant insert on table "public"."pippo" to "authenticated";

grant references on table "public"."pippo" to "authenticated";

grant select on table "public"."pippo" to "authenticated";

grant trigger on table "public"."pippo" to "authenticated";

grant truncate on table "public"."pippo" to "authenticated";

grant update on table "public"."pippo" to "authenticated";

grant delete on table "public"."pippo" to "service_role";

grant insert on table "public"."pippo" to "service_role";

grant references on table "public"."pippo" to "service_role";

grant select on table "public"."pippo" to "service_role";

grant trigger on table "public"."pippo" to "service_role";

grant truncate on table "public"."pippo" to "service_role";

grant update on table "public"."pippo" to "service_role";


