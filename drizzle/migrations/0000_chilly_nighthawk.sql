CREATE TABLE IF NOT EXISTS "match_user_results" (
	"match_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"username" text NOT NULL,
	"mode" integer NOT NULL,
	"team" integer NOT NULL,
	"character_id" integer NOT NULL,
	"skin" integer NOT NULL,
	"rank" integer NOT NULL,
	"score" real NOT NULL,
	"k" integer NOT NULL,
	"a" integer NOT NULL,
	"d" integer NOT NULL,
	"play_time" integer NOT NULL,
	"character_level" integer NOT NULL,
	"best_weapon" integer NOT NULL,
	"best_weapon_level" integer NOT NULL,
	"give_up" boolean NOT NULL,
	"e0" integer,
	"e1" integer,
	"e2" integer,
	"e3" integer,
	"e4" integer,
	"damage" integer NOT NULL,
	"damaged" integer NOT NULL,
	"heal" integer NOT NULL,
	"damage_to_monster" integer NOT NULL,
	"killed_monster" integer NOT NULL,
	"cc_time" integer NOT NULL,
	"clutchs" integer NOT NULL,
	"used_security_consoles" integer NOT NULL,
	"used_emp_drones" integer NOT NULL,
	"used_credits" integer NOT NULL,
	"terminated_teams" integer NOT NULL,
	CONSTRAINT "match_user_results_match_id_user_id_pk" PRIMARY KEY("match_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "matches" (
	"id" integer PRIMARY KEY NOT NULL,
	"season_id" integer NOT NULL,
	"server_name" text NOT NULL,
	"mode" integer NOT NULL,
	"size" integer NOT NULL,
	"team_size" integer NOT NULL,
	"started_at" timestamp with time zone NOT NULL,
	"total_time" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_user_results" ADD CONSTRAINT "match_user_results_match_id_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_user_results" ADD CONSTRAINT "match_user_results_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "seasonId" ON "matches" USING btree ("season_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "mode" ON "matches" USING btree ("mode");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name" ON "users" USING btree ("name");