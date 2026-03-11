import { sql } from 'drizzle-orm';
import { pgTable, char, varchar, timestamp } from 'drizzle-orm/pg-core'; 

export const competitions = pgTable( 'competitions', {
	id: varchar( 'id', { length: 255 } ).primaryKey().notNull(),
	old_id: char( 'old_id', { length: 36 } ),
	identifier: varchar( 'identifier', { length: 255 } ).notNull().unique(),
	gender: varchar( 'gender', { length: 255 } ).notNull(),
	ageOver: varchar( 'ageOver', { length: 255 } ).notNull(),
	createdAt: timestamp( 'createdAt' ).default( sql`now()` ).notNull(),
	updatedAt: timestamp( 'updatedAt' )
		.default( sql`now()` )
		.$onUpdateFn( () => new Date() )
		.notNull(),
	deletedAt: timestamp( 'deletedAt' ),
} );
