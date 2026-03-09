import { fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { competitions, } from '$lib/server/db/schema';

export async function load() {
	const allCompetitions = await db.select()
		.from( competitions )
		.orderBy( competitions.identifier );

	return { competitions: allCompetitions };
}

export const actions: Actions = {
	delete: async ( { request } ) => {
		const formData = await request.formData();

		const id = formData.get( 'id' ) as string;

		if ( !id ) return fail( 400, { message: 'Missing id' } );

		await db.delete( competitions )
			.where( eq( competitions.id, id ) );

		redirect( 303, '/competitions' );
	},
}
