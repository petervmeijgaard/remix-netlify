import { InsertTodo, todos } from "~/db/schema";
import { db } from "~/db";
import { desc, eq } from "drizzle-orm";
import { error, success } from "~/lib/result";

export async function getAllTodos() {
	return db.query.todos.findMany({
		orderBy: [desc(todos.createdAt)],
	});
}

export async function addTodo(newTodo: InsertTodo) {
	return db.insert(todos).values(newTodo);
}

export async function toggleTodo(id: number) {
	const todo = await db.query.todos.findFirst({ where: eq(todos.id, id) });

	if (!todo) {
		return error("Todo not found");
	}

	const updated = await db
		.update(todos)
		.set({ isCompleted: !todo.isCompleted })
		.where(eq(todos.id, id));

	return success(updated);
}

export async function removeTodo(id: number) {
	const [deleted] = await db.delete(todos).where(eq(todos.id, id)).returning();

	if (!deleted) {
		return error("Todo not found");
	}

	return success(deleted);
}
