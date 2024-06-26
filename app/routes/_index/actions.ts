import { json } from "@netlify/remix-runtime";
import { unstable_defineAction as defineAction } from "@remix-run/server-runtime";
import { addTodo, removeTodo, toggleTodo } from "./queries";
import { addTodoSchema, removeTodoSchema, toggleTodoSchema } from "./schemas";
import { badRequest } from "~/http/bad-request";

export const addTodoAction = defineAction(async ({ request }) => {
	const formPayload = Object.fromEntries(await request.formData());
	const result = addTodoSchema.safeParse(formPayload);

	if (!result.success) {
		throw badRequest("Invalid form data");
	}

	await addTodo(result.data);

	return json({ ok: true });
});

export const toggleTodoAction = defineAction(async ({ request }) => {
	const formPayload = Object.fromEntries(await request.formData());
	const result = toggleTodoSchema.safeParse(formPayload);

	if (!result.success) {
		throw badRequest("Invalid form data");
	}

	const toggleResult = await toggleTodo(result.data.id);

	if (!toggleResult.success) {
		throw badRequest(toggleResult.error);
	}

	return json({ ok: true });
});

export const removeTodoAction = defineAction(async ({ request }) => {
	const formPayload = Object.fromEntries(await request.formData());
	const result = removeTodoSchema.safeParse(formPayload);

	if (!result.success) {
		throw badRequest("Invalid form data");
	}

	const removeResult = await removeTodo(result.data.id);

	if (!removeResult.success) {
		throw badRequest(removeResult.error);
	}

	return json({ ok: true });
});
