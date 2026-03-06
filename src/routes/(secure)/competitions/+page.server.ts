import { db } from '$lib/server/db';
// import { eq } from 'drizzle-orm';
// import { competitions, tournaments2competitions } from '$lib/server/db/schema';
import { competitions, } from '$lib/server/db/schema';

// import crypto from 'node:crypto';

export async function load() {
	const allCompetitions = await db.select()
		.from( competitions )
		.orderBy( competitions.identifier );

	/* for ( const competition of allCompetitions ) {
		const uuid = crypto.randomUUID();

		await db.update(competitions)
			.set({ id: uuid })
			.where( eq( competitions.id, competition.id ) );
	} */

	/* or ( const competition of allCompetitions ) {
		const uuid = crypto.randomUUID();

		await db.update(tournaments2competitions)
			.set( { competitionID: competition.id } )
			.where( eq( tournaments2competitions.old_competitionID, competition.old_id ) );
	} */

	return { competitions: allCompetitions };
}
