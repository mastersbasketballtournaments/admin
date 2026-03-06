import { mysqlTable, serial, int, text } from 'drizzle-orm/mysql-core';

export const task = mysqlTable('task', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	priority: int('priority').notNull().default(1)
});

export * from './auth.schema';
export * from './schema/competitions';
export * from './schema/tournaments';
export * from './schema/tournaments2competitions';
