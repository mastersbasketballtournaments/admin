CREATE TABLE `task` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`priority` int NOT NULL DEFAULT 1,
	CONSTRAINT `task_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `account` (
	`id` varchar(36) NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` timestamp(3),
	`refresh_token_expires_at` timestamp(3),
	`scope` text,
	`password` text,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL,
	CONSTRAINT `account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(36) NOT NULL,
	`expires_at` timestamp(3) NOT NULL,
	`token` varchar(255) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` varchar(36) NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`),
	CONSTRAINT `session_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified` boolean NOT NULL DEFAULT false,
	`image` text,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` varchar(36) NOT NULL,
	`identifier` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`expires_at` timestamp(3) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `verification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `competitions` (
	`id` varchar(255) NOT NULL,
	`old_id` char(36),
	`identifier` varchar(255) NOT NULL,
	`gender` varchar(255) NOT NULL,
	`ageOver` varchar(255) NOT NULL,
	`createdAt` datetime NOT NULL DEFAULT now(),
	`updatedAt` datetime NOT NULL DEFAULT now(),
	`deletedAt` datetime,
	CONSTRAINT `competitions_id` PRIMARY KEY(`id`),
	CONSTRAINT `competitions_identifier_unique` UNIQUE(`identifier`)
);
--> statement-breakpoint
CREATE TABLE `tournaments` (
	`id` varchar(255) NOT NULL,
	`old_id` char(36),
	`name` varchar(255) NOT NULL,
	`dateStart` date NOT NULL,
	`dateEnd` date NOT NULL,
	`contact` varchar(255) NOT NULL,
	`emailAddress` varchar(255) NOT NULL,
	`website` varchar(255),
	`facebook` varchar(255),
	`twitter` varchar(255),
	`instagram` varchar(255),
	`continent` varchar(255) NOT NULL,
	`country` varchar(255) NOT NULL,
	`location` varchar(255) NOT NULL,
	`createdAt` datetime NOT NULL DEFAULT now(),
	`updatedAt` datetime NOT NULL DEFAULT now(),
	`deletedAt` datetime,
	CONSTRAINT `tournaments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tournaments2competitions` (
	`tournamentID` varchar(255) NOT NULL,
	`competitionID` varchar(255) NOT NULL,
	`old_tournamentID` char(36),
	`old_competitionID` char(36),
	CONSTRAINT `tournaments2competitions_tournamentID_competitionID_pk` PRIMARY KEY(`tournamentID`,`competitionID`)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tournaments2competitions` ADD CONSTRAINT `tournaments2competitions_tournamentID_tournaments_id_fk` FOREIGN KEY (`tournamentID`) REFERENCES `tournaments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tournaments2competitions` ADD CONSTRAINT `tournaments2competitions_competitionID_competitions_id_fk` FOREIGN KEY (`competitionID`) REFERENCES `competitions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `account` (`user_id`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `session` (`user_id`);--> statement-breakpoint
CREATE INDEX `verification_identifier_idx` ON `verification` (`identifier`);