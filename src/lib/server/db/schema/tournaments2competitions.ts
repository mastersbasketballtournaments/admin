import { mysqlTable, char, primaryKey } from 'drizzle-orm/mysql-core';

export const tournaments2competitions = mysqlTable( 'tournaments2competitions', {
	tournamentID: char( 'tournamentID', { length: 36 } ),
	competitionID: char( 'competitionID', { length: 36 } ),
	old_tournamentID: char( 'old_tournamentID', { length: 36 } ),
	old_competitionID: char( 'old_competitionID', { length: 36 } ),
}, ( table ) => [
	primaryKey( { columns: [ table.tournamentID, table.competitionID ] } ),
] );
