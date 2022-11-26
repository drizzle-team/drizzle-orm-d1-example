import { integer, sqliteTable, text } from "drizzle-orm-sqlite";

export const users = sqliteTable('users', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull(),
});