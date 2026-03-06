import { db } from '$lib/server/db';
// import { eq } from 'drizzle-orm';
// import { tournaments, tournaments2competitions } from '$lib/server/db/schema';
import { tournaments } from '$lib/server/db/schema';

// import crypto from 'node:crypto';

export async function load() {
	const allTournaments = await db.select()
		.from( tournaments )
		.orderBy( tournaments.name );

	/* for ( const tournament of allTournaments ) {
		const uuid = crypto.randomUUID();

		await db.update(tournaments)
			.set({ id: uuid })
			.where( eq( tournaments.id, tournament.id ) );
	} */

	/* for ( const tournament of allTournaments ) {
		const uuid = crypto.randomUUID();

		await db.update(tournaments2competitions)
			.set( { tournamentID: tournament.id } )
			.where( eq( tournaments2competitions.old_tournamentID, tournament.old_id ) );
	} */

	return { tournaments: allTournaments };
}
