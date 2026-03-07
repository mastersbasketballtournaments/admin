import { redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
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

export const actions: Actions = {
	delete: async ( { request } ) => {
		const formData = await request.formData();

		const id = formData.get( 'id' );

		await db.delete( competitions )
			.where( eq( competitions.id, id ) );


		/* const { error } = await supabase.from('fixtures')
			.delete()
			.eq( 'id', id ); */

		redirect( 303, '/competitions' );
	},
}
