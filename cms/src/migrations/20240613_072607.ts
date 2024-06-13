import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_medias_type" AS ENUM('image', 'video', 'audio');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "medias_identification_tag" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"tag_name" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "medias" (
	"id" serial PRIMARY KEY NOT NULL,
	"identification_cote" varchar NOT NULL,
	"identification_title" varchar NOT NULL,
	"identification_date" varchar NOT NULL,
	"contexte_credits_name" varchar NOT NULL,
	"contexte_credits_link" varchar,
	"contexte_modality" varchar,
	"access_and_use_access_condition" varchar,
	"access_and_use_reproduction_condition" varchar,
	"other_references_conservation_location" varchar,
	"other_references_complementary_sources" varchar,
	"other_references_bibliography" varchar,
	"other_references_notes" varchar,
	"contributor" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"alt" varchar NOT NULL,
	"legend" varchar NOT NULL,
	"description" varchar NOT NULL,
	"location_location_name" varchar NOT NULL,
	"location_location_link" varchar,
	"type" "enum_medias_type" NOT NULL,
	"notice" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric
);

CREATE TABLE IF NOT EXISTS "thematics" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"title" varchar NOT NULL,
	"color" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "thematics_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"medias_id" integer
);

CREATE TABLE IF NOT EXISTS "cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"description" jsonb NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "cities_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"thematics_id" integer,
	"medias_id" integer
);

CREATE TABLE IF NOT EXISTS "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric
);

CREATE TABLE IF NOT EXISTS "sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "sections_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"thematics_id" integer,
	"documents_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "medias_identification_tag_order_idx" ON "medias_identification_tag" ("_order");
CREATE INDEX IF NOT EXISTS "medias_identification_tag_parent_id_idx" ON "medias_identification_tag" ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "medias_identification_identification_cote_idx" ON "medias" ("identification_cote");
CREATE UNIQUE INDEX IF NOT EXISTS "medias_contexte_contexte_modality_idx" ON "medias" ("contexte_modality");
CREATE UNIQUE INDEX IF NOT EXISTS "medias_slug_idx" ON "medias" ("slug");
CREATE INDEX IF NOT EXISTS "medias_created_at_idx" ON "medias" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "medias_filename_idx" ON "medias" ("filename");
CREATE UNIQUE INDEX IF NOT EXISTS "thematics_slug_idx" ON "thematics" ("slug");
CREATE INDEX IF NOT EXISTS "thematics_created_at_idx" ON "thematics" ("created_at");
CREATE INDEX IF NOT EXISTS "thematics_rels_order_idx" ON "thematics_rels" ("order");
CREATE INDEX IF NOT EXISTS "thematics_rels_parent_idx" ON "thematics_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "thematics_rels_path_idx" ON "thematics_rels" ("path");
CREATE UNIQUE INDEX IF NOT EXISTS "cities_name_idx" ON "cities" ("name");
CREATE UNIQUE INDEX IF NOT EXISTS "cities_slug_idx" ON "cities" ("slug");
CREATE INDEX IF NOT EXISTS "cities_created_at_idx" ON "cities" ("created_at");
CREATE INDEX IF NOT EXISTS "cities_rels_order_idx" ON "cities_rels" ("order");
CREATE INDEX IF NOT EXISTS "cities_rels_parent_idx" ON "cities_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "cities_rels_path_idx" ON "cities_rels" ("path");
CREATE INDEX IF NOT EXISTS "documents_created_at_idx" ON "documents" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "documents_filename_idx" ON "documents" ("filename");
CREATE INDEX IF NOT EXISTS "sections_created_at_idx" ON "sections" ("created_at");
CREATE INDEX IF NOT EXISTS "sections_rels_order_idx" ON "sections_rels" ("order");
CREATE INDEX IF NOT EXISTS "sections_rels_parent_idx" ON "sections_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "sections_rels_path_idx" ON "sections_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
DO $$ BEGIN
 ALTER TABLE "medias_identification_tag" ADD CONSTRAINT "medias_identification_tag_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "medias"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "thematics_rels" ADD CONSTRAINT "thematics_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "thematics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "thematics_rels" ADD CONSTRAINT "thematics_rels_medias_fk" FOREIGN KEY ("medias_id") REFERENCES "medias"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "cities_rels" ADD CONSTRAINT "cities_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "cities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "cities_rels" ADD CONSTRAINT "cities_rels_thematics_fk" FOREIGN KEY ("thematics_id") REFERENCES "thematics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "cities_rels" ADD CONSTRAINT "cities_rels_medias_fk" FOREIGN KEY ("medias_id") REFERENCES "medias"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sections_rels" ADD CONSTRAINT "sections_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "sections"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sections_rels" ADD CONSTRAINT "sections_rels_thematics_fk" FOREIGN KEY ("thematics_id") REFERENCES "thematics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sections_rels" ADD CONSTRAINT "sections_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "documents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "users";
DROP TABLE "medias_identification_tag";
DROP TABLE "medias";
DROP TABLE "thematics";
DROP TABLE "thematics_rels";
DROP TABLE "cities";
DROP TABLE "cities_rels";
DROP TABLE "documents";
DROP TABLE "sections";
DROP TABLE "sections_rels";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";`);

};
