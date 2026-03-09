import { sql } from 'drizzle-orm';
import { mysqlTable, char, varchar, datetime } from 'drizzle-orm/mysql-core';

export const competitions = mysqlTable( 'competitions', {
	id: varchar( 'id', { length: 255 } ).primaryKey().notNull(),

	old_id: char( 'old_id', { length: 36 } ),

	identifier: varchar( 'identifier', { length: 255 } ).notNull().unique(),
	gender: varchar( 'gender', { length: 255 } ).notNull(),
	ageOver: varchar( 'ageOver', { length: 255 } ).notNull(),
	createdAt: datetime().default( sql`now()` ).notNull(),
	updatedAt: datetime().default( sql`now()` ).$onUpdateFn( () => new Date() ).notNull(),
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
