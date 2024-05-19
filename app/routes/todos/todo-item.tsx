import { Checkbox } from "~/components/ui/checkbox";
import { Form } from "@remix-run/react";
import { INTENTS } from "./constants";
import { Button } from "~/components/ui/button";
import { Trash } from "lucide-react";
import { SerializeFrom } from "@netlify/remix-runtime";
import { Todo } from "~/db/schema";
import { Skeleton as BaseSkeleton } from "~/components/ui/skeleton";

function TodoItem({ title, id, isCompleted }: SerializeFrom<Todo>) {
	return (
		<div className="flex items-center gap-x-2">
			<Form method="post" className="flex">
				<input type="hidden" name="_intent" value={INTENTS.toggleTodo} />
				<input type="hidden" name="id" value={id} />
				<Checkbox checked={isCompleted} type="submit" />
			</Form>
			<p className="text-md flex flex-1 font-medium leading-none">{title}</p>
			<Form method="post">
				<input type="hidden" name="_intent" value={INTENTS.removeTodo} />
				<input type="hidden" name="id" value={id} />
				<Button type="submit">
					<Trash size={16} />
				</Button>
			</Form>
		</div>
	);
}

function Skeleton() {
	return (
		<div className="flex items-center gap-x-2">
			<BaseSkeleton className="flex h-[40px] flex-1" />
			<BaseSkeleton className="flex h-[40px] w-[48px]" />
		</div>
	);
}

TodoItem.Skeleton = Skeleton;

export { TodoItem };
