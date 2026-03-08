import { relations } from 'drizzle-orm';
import { mysqlTable, varchar, char, primaryKey } from 'drizzle-orm/mysql-core';
import { tournaments } from './tournaments';
import { competitions } from './competitions';

export const tournaments2competitions = mysqlTable( 'tournaments2competitions', {
	tournamentID: varchar( 'tournamentID', { length: 255 } ).notNull().references( () => tournaments.id),
	competitionID: varchar( 'competitionID', { length: 255 } ).notNull().references( () => competitions.id),
	old_tournamentID: char( 'old_tournamentID', { length: 36 } ),
	old_competitionID: char( 'old_competitionID', { length: 36 } ),
}, ( table ) => [
	primaryKey( { columns: [ table.tournamentID, table.competitionID ] } ),
] );

/* export const relations = defineRelations({ tournaments, competitions, tournaments2competitions },
	(r) => ({
		tournaments: {
		competitions: r.many.competitions({
			from: r.tournaments.id.through(r.tournaments2competitions.tournamentID),
			to: r.competitions.id.through(r.tournaments2competitions.competitionID),
		}),
		},
		competitions: {
		participants: r.many.tournaments(),
		},
	})
); */

export const tournamentsRelations = relations( tournaments, ( { many } ) => ( {
	tournaments2competitions: many( tournaments2competitions ),
} ) );

export const competitionsRelations = relations( competitions, ( { many } ) => ( {
	tournaments2competitions: many( tournaments2competitions ),
} ) );

export const tournaments2competitionsRelations = relations( tournaments2competitions, ( { one } ) => ( {
	tournament: one( tournaments, {
		fields: [ tournaments2competitions.tournamentID ],
		references: [ tournaments.id ],
	} ),
	competition: one( competitions, {
		fields: [ tournaments2competitions.competitionID ],
		references: [ competitions.id ],
	} ),
} ) );
