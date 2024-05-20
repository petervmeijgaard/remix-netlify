import { json } from "@netlify/remix-runtime";
import { unstable_defineAction as defineAction } from "@remix-run/server-runtime";
import { addTodo, removeTodo, toggleTodo } from "./queries";
import { addTodoSchema, removeTodoSchema, toggleTodoSchema } from "./schemas";
import { badRequest } from "~/http/bad-request";
import { invariant } from "~/lib/invariant";

export const addTodoAction = defineAction(async ({ request }) => {
	const formPayload = Object.fromEntries(await request.formData());
	const result = addTodoSchema.safeParse(formPayload);

	invariant(result.success, badRequest("Invalid form data"));

	await addTodo(result.data);

	return json({ ok: true });
});

export const toggleTodoAction = defineAction(async ({ request }) => {
	const formPayload = Object.fromEntries(await request.formData());
	const result = toggleTodoSchema.safeParse(formPayload);

	invariant(result.success, badRequest("Invalid form data"));

	const toggleResult = await toggleTodo(result.data.id);

	invariant(toggleResult.success, badRequest("Adding todo failed"));

	return json({ ok: true });
});

export const removeTodoAction = defineAction(async ({ request }) => {
	const formPayload = Object.fromEntries(await request.formData());
	const result = removeTodoSchema.safeParse(formPayload);

	invariant(result.success, badRequest("Invalid form data"));

	const removeResult = await removeTodo(result.data.id);

	invariant(removeResult.success, badRequest("Removing todo failed"));

	return json({ ok: true });
});
