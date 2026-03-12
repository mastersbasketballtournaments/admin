import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { tournaments } from '$lib/server/db/schema';
import { sql, gte } from 'drizzle-orm';

export const GET: RequestHandler = async ( { request } ) => {
	const recordset = await db.selectDistinct( {
		season: sql<number>`extract(year from ${tournaments.dateStart})`,
	} )
		.from( tournaments )
		.where( gte( tournaments.dateStart, sql`current_date` ) )
		.orderBy( sql`extract(year from ${tournaments.dateStart})` );

	return json( recordset );
};
