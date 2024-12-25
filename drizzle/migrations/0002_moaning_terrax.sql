DROP INDEX IF EXISTS "seasonId";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "season_id" ON "matches" USING btree ("season_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "started_at" ON "matches" USING btree ("started_at" desc);