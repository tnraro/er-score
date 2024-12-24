CREATE TABLE `match_user_results` (
	`match_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`username` text NOT NULL,
	`mode` integer NOT NULL,
	`team` integer NOT NULL,
	`character_id` integer NOT NULL,
	`skin` integer NOT NULL,
	`rank` integer NOT NULL,
	`score` real NOT NULL,
	`k` integer NOT NULL,
	`a` integer NOT NULL,
	`d` integer NOT NULL,
	`play_time` integer NOT NULL,
	`character_level` integer NOT NULL,
	`best_weapon` integer NOT NULL,
	`best_weapon_level` integer NOT NULL,
	`give_up` integer NOT NULL,
	`e0` integer,
	`e1` integer,
	`e2` integer,
	`e3` integer,
	`e4` integer,
	`damage` integer NOT NULL,
	`damaged` integer NOT NULL,
	`heal` integer NOT NULL,
	`damage_to_monster` integer NOT NULL,
	`killed_monster` integer NOT NULL,
	`cc_time` integer NOT NULL,
	`clutchs` integer NOT NULL,
	`used_security_consoles` integer NOT NULL,
	`used_emp_drones` integer NOT NULL,
	`used_credits` integer NOT NULL,
	`terminated_teams` integer NOT NULL,
	PRIMARY KEY(`match_id`, `user_id`),
	FOREIGN KEY (`match_id`) REFERENCES `matches`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `matches` (
	`id` integer PRIMARY KEY NOT NULL,
	`season_id` integer NOT NULL,
	`server_name` text NOT NULL,
	`mode` integer NOT NULL,
	`size` integer NOT NULL,
	`team_size` integer NOT NULL,
	`started_at` integer NOT NULL,
	`total_time` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `seasonId` ON `matches` (`season_id`);--> statement-breakpoint
CREATE INDEX `mode` ON `matches` (`mode`);--> statement-breakpoint
CREATE INDEX `name` ON `users` (`name`);