import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { competitions } from '$lib/server/db/schema';

export const GET: RequestHandler = async ( { request } ) => {
	const authHeader = request.headers.get( 'authorization' );

	if ( authHeader !== `Bearer ${process.env.CRON_SECRET}` ) {
		return json( { error: 'Unauthorized' }, { status: 401 } );
	}

	const recordset = await db
		.select( {
			id: competitions.id,
			identifier: competitions.identifier,
			gender: competitions.gender,
			ageOver: competitions.ageOver,
		} )
		.from( competitions )
		.orderBy( competitions.identifier );

	return json( recordset );
};
