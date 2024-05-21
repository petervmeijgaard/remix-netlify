import { z } from "zod";

export const addTodoSchema = z.object({
	title: z.string().min(3),
});

export const removeTodoSchema = z.object({
	id: z.coerce.number().int(),
});

export const toggleTodoSchema = z.object({
	id: z.coerce.number().int(),
});
