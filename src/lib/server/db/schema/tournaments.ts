import { relations, sql } from 'drizzle-orm';
import { pgTable, char, varchar, timestamp, date } from 'drizzle-orm/pg-core';  // ← changed

export const tournaments = pgTable( 'tournaments', {   // ← pgTable
	id: varchar( 'id', { length: 255 } ).primaryKey().notNull(),
	old_id: char( 'old_id', { length: 36 } ),
	name: varchar( 'name', { length: 255 } ).notNull(),
	dateStart: date( 'dateStart', { mode: 'string' } ).notNull(),
	dateEnd: date( 'dateEnd', { mode: 'string' } ).notNull(),
	contact: varchar( 'contact', { length: 255 } ).notNull(),
	emailAddress: varchar( 'emailAddress', { length: 255 } ).notNull(),
	website: varchar( 'website', { length: 255 } ),
	facebook: varchar( 'facebook', { length: 255 } ),
	twitter: varchar( 'twitter', { length: 255 } ),
	instagram: varchar( 'instagram', { length: 255 } ),
	continent: varchar( 'continent', { length: 255 } ).notNull(),
	country: varchar( 'country', { length: 255 } ).notNull(),
	location: varchar( 'location', { length: 255 } ).notNull(),
	createdAt: timestamp( 'createdAt' ).default( sql`now()` ).notNull(), 
	updatedAt: timestamp( 'updatedAt' )
		.default( sql`now()` )
		.$onUpdateFn( () => new Date() )
		.notNull(),
	deletedAt: timestamp( 'deletedAt' ),
} );
