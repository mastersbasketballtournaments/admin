import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { tournaments, competitions } from '$lib/server/db/schema';

import crypto from 'node:crypto';
import { log } from 'node:console';

export const load: PageServerLoad = async ( { params } ) => {
	const allCompetitions = await db.query.competitions.findMany( {
		orderBy: ( competitions, { asc } ) => asc( competitions.identifier )
	} );

	if ( params.id != 'add' ) {
		const tournament = await db.query.tournaments.findFirst({
			where: ( tournaments, { eq } ) => eq( tournaments.id, params.id ),
			with: {
					tournaments2competitions: {
						columns: {
							competition: true
						},
						orderBy: ( tournaments2competitions, { asc } ) => asc( tournaments2competitions.competitionID ),
						with: {
							competition: {
								columns: {
									id: true
								},
							}
						},
					},
				},
		} );

		const assignedCompetitions = tournament?.tournaments2competitions
			.map( t2c => t2c.competition ) ?? [];

		return {
			tournament: tournament,
			competitions: allCompetitions,
			assignedCompetitions: assignedCompetitions
		};
	}

	return {
		tournament: null,
		competitions: null,
		assignedCompetitions: null
	};
}

export const actions: Actions = {
	default: async ( { request, params } ) => {
		const { id } = params;

		const formData = await request.formData();

		const name = formData.get( 'name' ) as string;
		const dateStart = formData.get( 'dateStart' ) as string;
		const dateEnd = formData.get( 'dateEnd' ) as string;
		const contact = formData.get( 'contact' ) as string;
		const emailAddress = formData.get( 'emailAddress' ) as string;
		const website = formData.get( 'website' ) as string;
		const facebook = formData.get( 'facebook' ) as string;
		const twitter = formData.get( 'twitter' ) as string;
		const instagram = formData.get( 'instagram' ) as string;
		const continent = formData.get( 'continent' ) as string;
		const country = formData.get( 'country' ) as string;
		const location = formData.get( 'location' ) as string;

		if ( id === 'add' ) {
			await db.insert( tournaments ).values(
				{
					id: crypto.randomUUID(),
					name: name,
					dateStart: dateStart,
					dateEnd: dateEnd,
					contact: contact,
					emailAddress: emailAddress,
					website: website,
					facebook: facebook,
					twitter: twitter,
					instagram: instagram,
					continent: continent,
					country: country,
					location: location
				}
			);

			/* if ( error ) {
				return fail( 500, {
					error: error.message
				} );
			} */

			throw redirect( 303, '/tournaments/add' );
		} else {
			await db.update( tournaments )
				.set( {
					name: name,
					dateStart: dateStart,
					dateEnd: dateEnd,
					contact: contact,
					emailAddress: emailAddress,
					website: website,
					facebook: facebook,
					twitter: twitter,
					instagram: instagram,
					continent: continent,
					country: country,
					location: location
				} ).where( eq( tournaments.id, id ) )

			/* if ( error ) {
				return fail( 500, {
					error: error.message
				} );
			} */

			throw redirect( 303, '/tournaments' );
		}
	}
}
