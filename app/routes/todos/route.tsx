import { defer, type MetaFunction } from "@netlify/remix-runtime";
import {
	unstable_defineAction as defineAction,
	unstable_defineLoader as defineLoader,
} from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import { CreateTodoCard } from "./create-todo-card";
import { badRequest } from "~/http/bad-request";
import { INTENTS } from "./constants";
import { addTodoAction, removeTodoAction, toggleTodoAction } from "./actions";
import { getAllTodos } from "./queries";
import { TodoOverviewCard } from "./todo-overview-card";

export const meta: MetaFunction = () => [
	{ title: "New Remix App" },
	{ name: "description", content: "Welcome to Remix!" },
];

export const loader = defineLoader(async () => {
	const todosPromise = getAllTodos();

	return defer({ todosPromise });
});

export const action = defineAction(async (args) => {
	const formData = await args.request.clone().formData();
	const intent = formData.get("_intent");

	if (!intent) {
		throw badRequest("Missing intent");
	}

	switch (intent) {
		case INTENTS.addTodo:
			return addTodoAction(args);
		case INTENTS.removeTodo:
			return removeTodoAction(args);
		case INTENTS.toggleTodo:
			return toggleTodoAction(args);
		default:
			throw badRequest("Invalid intent");
	}
});

export default function Index() {
	const { todosPromise } = useLoaderData<typeof loader>();

	return (
		<div className="container py-6">
			<div className="grid items-start gap-4 md:grid-cols-3">
				<CreateTodoCard className="col-span-1" />
				<TodoOverviewCard
					resolve={todosPromise}
					className="col-span-1 md:order-first md:col-span-2"
				/>
			</div>
		</div>
	);
}
