import { mysqlTable, varchar, char, primaryKey } from 'drizzle-orm/mysql-core';
import { tournaments } from './tournaments';
import { competitions } from './competitions';

export const tournaments2competitions = mysqlTable( 'tournaments2competitions', {
	tournamentID: varchar( 'tournamentID', { length: 36 } ).notNull().references( () => tournaments.id),
	competitionID: varchar( 'competitionID', { length: 36 } ).notNull().references( () => competitions.id),
	old_tournamentID: char( 'old_tournamentID', { length: 36 } ),
	old_competitionID: char( 'old_competitionID', { length: 36 } ),
}, ( table ) => [
	primaryKey( { columns: [ table.tournamentID, table.competitionID ] } ),
] );
