import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_medias_identification_type" AS ENUM('image', 'video', 'audio');
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
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "medias" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"identification_reference_code" varchar NOT NULL,
  	"identification_slug" varchar NOT NULL,
  	"identification_title" varchar NOT NULL,
  	"identification_type" "enum_medias_identification_type" NOT NULL,
  	"identification_background_audio_id" integer,
  	"identification_date" varchar NOT NULL,
  	"physical_characteristics_document_types_id" integer NOT NULL,
  	"physical_characteristics_material_types_and_formats_id" integer,
  	"physical_characteristics_colors_id" integer,
  	"contexte_credits_name" varchar NOT NULL,
  	"contexte_credits_link" varchar,
  	"legend" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"alt" varchar NOT NULL,
  	"location_location_reference_id" integer,
  	"location_location_details" varchar,
  	"location_location_link" varchar,
  	"notice" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_preview_url" varchar,
  	"sizes_preview_width" numeric,
  	"sizes_preview_height" numeric,
  	"sizes_preview_mime_type" varchar,
  	"sizes_preview_filesize" numeric,
  	"sizes_preview_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "medias_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"thematics_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "thematics" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"background_image_id" integer NOT NULL,
  	"rank" numeric,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
  	"thematics_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "sections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"rank" numeric,
  	"color" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "sections_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"thematics_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "document_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "material_types_and_formats" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "colors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"medias_id" integer,
  	"thematics_id" integer,
  	"cities_id" integer,
  	"sections_id" integer,
  	"documents_id" integer,
  	"document_types_id" integer,
  	"material_types_and_formats_id" integer,
  	"colors_id" integer
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
  
  DO $$ BEGIN
   ALTER TABLE "medias" ADD CONSTRAINT "medias_identification_background_audio_id_medias_id_fk" FOREIGN KEY ("identification_background_audio_id") REFERENCES "public"."medias"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "medias" ADD CONSTRAINT "medias_physical_characteristics_document_types_id_document_types_id_fk" FOREIGN KEY ("physical_characteristics_document_types_id") REFERENCES "public"."document_types"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "medias" ADD CONSTRAINT "medias_physical_characteristics_material_types_and_formats_id_material_types_and_formats_id_fk" FOREIGN KEY ("physical_characteristics_material_types_and_formats_id") REFERENCES "public"."material_types_and_formats"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "medias" ADD CONSTRAINT "medias_physical_characteristics_colors_id_colors_id_fk" FOREIGN KEY ("physical_characteristics_colors_id") REFERENCES "public"."colors"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "medias" ADD CONSTRAINT "medias_location_location_reference_id_cities_id_fk" FOREIGN KEY ("location_location_reference_id") REFERENCES "public"."cities"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "medias_rels" ADD CONSTRAINT "medias_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."medias"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "medias_rels" ADD CONSTRAINT "medias_rels_thematics_fk" FOREIGN KEY ("thematics_id") REFERENCES "public"."thematics"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "thematics" ADD CONSTRAINT "thematics_background_image_id_medias_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."medias"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cities_rels" ADD CONSTRAINT "cities_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cities_rels" ADD CONSTRAINT "cities_rels_thematics_fk" FOREIGN KEY ("thematics_id") REFERENCES "public"."thematics"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "sections_rels" ADD CONSTRAINT "sections_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "sections_rels" ADD CONSTRAINT "sections_rels_thematics_fk" FOREIGN KEY ("thematics_id") REFERENCES "public"."thematics"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_medias_fk" FOREIGN KEY ("medias_id") REFERENCES "public"."medias"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_thematics_fk" FOREIGN KEY ("thematics_id") REFERENCES "public"."thematics"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cities_fk" FOREIGN KEY ("cities_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sections_fk" FOREIGN KEY ("sections_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_document_types_fk" FOREIGN KEY ("document_types_id") REFERENCES "public"."document_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_material_types_and_formats_fk" FOREIGN KEY ("material_types_and_formats_id") REFERENCES "public"."material_types_and_formats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_colors_fk" FOREIGN KEY ("colors_id") REFERENCES "public"."colors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX IF NOT EXISTS "medias_identification_identification_reference_code_idx" ON "medias" USING btree ("identification_reference_code");
  CREATE UNIQUE INDEX IF NOT EXISTS "medias_identification_identification_slug_idx" ON "medias" USING btree ("identification_slug");
  CREATE INDEX IF NOT EXISTS "medias_identification_identification_background_audio_idx" ON "medias" USING btree ("identification_background_audio_id");
  CREATE INDEX IF NOT EXISTS "medias_physical_characteristics_physical_characteristics_document_types_idx" ON "medias" USING btree ("physical_characteristics_document_types_id");
  CREATE INDEX IF NOT EXISTS "medias_physical_characteristics_physical_characteristics_material_types_and_formats_idx" ON "medias" USING btree ("physical_characteristics_material_types_and_formats_id");
  CREATE INDEX IF NOT EXISTS "medias_physical_characteristics_physical_characteristics_colors_idx" ON "medias" USING btree ("physical_characteristics_colors_id");
  CREATE INDEX IF NOT EXISTS "medias_location_location_location_reference_idx" ON "medias" USING btree ("location_location_reference_id");
  CREATE INDEX IF NOT EXISTS "medias_updated_at_idx" ON "medias" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "medias_created_at_idx" ON "medias" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "medias_filename_idx" ON "medias" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "medias_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "medias" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "medias_sizes_preview_sizes_preview_filename_idx" ON "medias" USING btree ("sizes_preview_filename");
  CREATE INDEX IF NOT EXISTS "medias_rels_order_idx" ON "medias_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "medias_rels_parent_idx" ON "medias_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "medias_rels_path_idx" ON "medias_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "medias_rels_thematics_id_idx" ON "medias_rels" USING btree ("thematics_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "thematics_slug_idx" ON "thematics" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "thematics_background_image_idx" ON "thematics" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "thematics_updated_at_idx" ON "thematics" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "thematics_created_at_idx" ON "thematics" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "cities_name_idx" ON "cities" USING btree ("name");
  CREATE UNIQUE INDEX IF NOT EXISTS "cities_slug_idx" ON "cities" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "cities_updated_at_idx" ON "cities" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "cities_created_at_idx" ON "cities" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "cities_rels_order_idx" ON "cities_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "cities_rels_parent_idx" ON "cities_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "cities_rels_path_idx" ON "cities_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "cities_rels_thematics_id_idx" ON "cities_rels" USING btree ("thematics_id");
  CREATE INDEX IF NOT EXISTS "sections_updated_at_idx" ON "sections" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "sections_created_at_idx" ON "sections" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "sections_rels_order_idx" ON "sections_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "sections_rels_parent_idx" ON "sections_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "sections_rels_path_idx" ON "sections_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "sections_rels_thematics_id_idx" ON "sections_rels" USING btree ("thematics_id");
  CREATE INDEX IF NOT EXISTS "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "documents_filename_idx" ON "documents" USING btree ("filename");
  CREATE UNIQUE INDEX IF NOT EXISTS "document_types_name_idx" ON "document_types" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "document_types_updated_at_idx" ON "document_types" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "document_types_created_at_idx" ON "document_types" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "material_types_and_formats_name_idx" ON "material_types_and_formats" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "material_types_and_formats_updated_at_idx" ON "material_types_and_formats" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "material_types_and_formats_created_at_idx" ON "material_types_and_formats" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "colors_name_idx" ON "colors" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "colors_updated_at_idx" ON "colors" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "colors_created_at_idx" ON "colors" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_medias_id_idx" ON "payload_locked_documents_rels" USING btree ("medias_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_thematics_id_idx" ON "payload_locked_documents_rels" USING btree ("thematics_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_cities_id_idx" ON "payload_locked_documents_rels" USING btree ("cities_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_sections_id_idx" ON "payload_locked_documents_rels" USING btree ("sections_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_document_types_id_idx" ON "payload_locked_documents_rels" USING btree ("document_types_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_material_types_and_formats_id_idx" ON "payload_locked_documents_rels" USING btree ("material_types_and_formats_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_colors_id_idx" ON "payload_locked_documents_rels" USING btree ("colors_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "medias" CASCADE;
  DROP TABLE "medias_rels" CASCADE;
  DROP TABLE "thematics" CASCADE;
  DROP TABLE "cities" CASCADE;
  DROP TABLE "cities_rels" CASCADE;
  DROP TABLE "sections" CASCADE;
  DROP TABLE "sections_rels" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "document_types" CASCADE;
  DROP TABLE "material_types_and_formats" CASCADE;
  DROP TABLE "colors" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_medias_identification_type";`)
}
