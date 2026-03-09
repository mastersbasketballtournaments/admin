import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if ( !env.DATABASE_URL ) throw new Error( 'DATABASE_URL is not set' );

const client = mysql.createPool( {
		uri: env.DATABASE_URL,
		connectionLimit: 1,  // keep it low for serverless
		waitForConnections: true,
} );

export const db = drizzle( client, { schema, mode: 'default' } );
