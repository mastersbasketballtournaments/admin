import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { tournaments } from '$lib/server/db/schema';
import { asc, gte, sql } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
	const allTournaments = await db.query.tournaments.findMany( {
		where: ( tournaments, { gte } ) => gte( tournaments.dateStart, sql`current_date` ),
		orderBy: asc( tournaments.dateStart ),
		with: {
			tournaments2competitions: {
				with: {
					competition: {
						columns: {
							gender: true,
							ageOver: true,
						}
					}
				}
			}
		}
	} );

	const formatDate = ( dateStr: string ) => {
		const date = new Date( dateStr );
		return date.toLocaleDateString( 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' } ).replace( / /g, '-' );
	};

	return json( allTournaments.map( tournament => ( {
		id: tournament.id,
		name: tournament.name,
		dateStart: formatDate( tournament.dateStart ),
		dateEnd: formatDate( tournament.dateEnd ),
		year: new Date( tournament.dateStart ).getFullYear(),
		contact: tournament.contact,
		emailAddress: tournament.emailAddress,
		website: tournament.website ?? '',
		facebook: tournament.facebook ?? '',
		twitter: tournament.twitter ?? '',
		instagram: tournament.instagram ?? '',
		continent: tournament.continent,
		country: tournament.country,
		location: tournament.location,
		competitions: tournament.tournaments2competitions.map( t2c => ( {
			gender: t2c.competition.gender,
			ageOver: t2c.competition.ageOver,
		} ) ),
	} ) ) );
};
