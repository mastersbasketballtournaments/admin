import { fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db';
import { eq, sql } from 'drizzle-orm';
import { tournaments } from '$lib/server/db/schema';

export async function load() {
	const recordset = await db.query.tournaments.findMany( {
		where: ( tournaments, { lt } ) => lt( tournaments.dateStart, sql`current_date` ),
		orderBy: ( tournaments, { asc } ) => asc( tournaments.dateStart )
	} );

	return { tournaments: recordset };
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
