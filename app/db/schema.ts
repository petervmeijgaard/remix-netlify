import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";

export const todos = sqliteTable("todo", {
	id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	title: text("title").notNull(),
	isCompleted: int("is_completed", { mode: "boolean" })
		.notNull()
		.default(false),
	createdAt: int("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
	updatedAt: int("updated_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});

export type Todo = InferSelectModel<typeof todos>;

export type NewTodo = InferInsertModel<typeof todos>;
