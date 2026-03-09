import { fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { tournaments } from '$lib/server/db/schema';

export async function load() {
	const allTournaments = await db.select()
		.from( tournaments )
		.orderBy( tournaments.name );

	return { tournaments: allTournaments };
}

export const actions: Actions = {
	delete: async ( { request } ) => {
		const formData = await request.formData();

		const id = formData.get( 'id' ) as string;

		if ( !id ) return fail( 400, { message: 'Missing id' } );

		await db.delete( tournaments )
			.where( eq( tournaments.id, id ) );

		redirect( 303, '/tournaments' );
	},
}
