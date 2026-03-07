import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { competitions, } from '$lib/server/db/schema';

import crypto from 'node:crypto';

export const load: PageServerLoad = async ( { params } ) => {
	if ( params.id != 'add' ) {
		const competition = await db.select()
			.from( competitions )
			.where( eq( competitions.id, params.id ) )
			.limit( 1 );

		/* if ( error ) {
			console.error( 'Error loading sport:', error );

			return {
				competition: competition || []
			};
		} */

		return {
			competition: competition[0]
		};
	}

	return {
		competition: null
	};
}

export const actions: Actions = {
	default: async ( { request, params } ) => {
		const { id } = params;

		const formData = await request.formData();

		const identifier = formData.get( 'identifier' ) as string
		const gender = formData.get( 'gender' ) as string
		const ageOver = formData.get( 'ageOver' ) as string

		if ( id === 'add' ) {
			await db.insert( competitions ).values(
				{
					id: crypto.randomUUID(),
					identifier: identifier,
					gender: gender,
					ageOver: ageOver
				}
			);

			/* if ( error ) {
				return fail( 500, {
					error: error.message
				} );
			} */

			throw redirect( 303, '/competitions/add' );
		} else {
			await db.update( competitions )
				.set( {
					identifier: identifier,
					gender: gender,
					ageOver: ageOver
				} ).where( eq( competitions.id, id ) )

			/* if ( error ) {
				return fail( 500, {
					error: error.message
				} );
			} */

			throw redirect( 303, '/competitions' );
		}
	}
}
