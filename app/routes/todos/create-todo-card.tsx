import { ComponentProps, ComponentRef, FormEvent, useRef } from "react";
import { Input } from "~/components/ui/input";
import { Form, useSubmit } from "@remix-run/react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ADD_TODO_FORM, INTENTS } from "./constants";
import { invariant } from "~/lib/invariant";

export function CreateTodoCard(props: ComponentProps<typeof Card>) {
	const inputRef = useRef<ComponentRef<typeof Input>>(null);
	const submit = useSubmit();

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		submit(formData, {
			method: "post",
			navigate: false,
		});

		invariant(inputRef.current, "Input ref is missing");

		inputRef.current.value = "";
	};

	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Add new todo</CardTitle>
			</CardHeader>
			<CardContent>
				<Form
					method="post"
					className="space-y-4"
					onSubmit={onSubmit}
					id={ADD_TODO_FORM}
				>
					<input type="hidden" name="_intent" value={INTENTS.addTodo} />
					<Input
						name="title"
						type="text"
						placeholder="Enter your todo"
						ref={inputRef}
						minLength={3}
						required
					/>
				</Form>
			</CardContent>
			<CardFooter>
				<Button type="submit" form={ADD_TODO_FORM}>
					Create Todo
				</Button>
			</CardFooter>
		</Card>
	);
}
