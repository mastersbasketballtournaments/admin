import { sql } from 'drizzle-orm';
import { mysqlTable, char, varchar, datetime, date } from 'drizzle-orm/mysql-core';

export const tournaments = mysqlTable( 'tournaments', {
	id: char( 'id', { length: 36 } ).primaryKey().notNull(),

	old_id: char( { length: 36 } ),

	name: varchar( 'name', { length: 255 } ).notNull(),
	dateStart: date( 'dateStart' ).notNull(),
	dateEnd: date( 'dateEnd' ).notNull(),
	contact: varchar( 'contact', { length: 255 } ).notNull(),
	emailAddress: varchar( 'emailAddress', { length: 255 } ).notNull(),
	website: varchar( 'website', { length: 255 } ),
	facebook: varchar( 'facebook', { length: 255 } ),
	twitter: varchar( 'twitter', { length: 255 } ),
	instagram: varchar( 'instagram', { length: 255 } ),
	continent: varchar( 'continent', { length: 255 } ).notNull(),
	country: varchar( 'country', { length: 255 } ).notNull(),
	location: varchar( 'location', { length: 255 } ).notNull(),

	createdAt: datetime().default(sql`now()`).notNull(),
	updatedAt: datetime().default(sql`now()`).notNull(),
	deletedAt: datetime(),
} );

/*
	createdAt: datetime().default(sql`now()`).notNull(),
	updatedAt: datetime().default(sql`now()`).notNull(),
	deletedAt: datetime(),



	dateCreated: datetime().default(sql`now()`).notNull(),
	dateUpdated: datetime().default(sql`now()`).notNull(),
	dateDeleted: datetime(),
 */
