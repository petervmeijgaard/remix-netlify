import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { TodoItem } from "./todo-item";
import { ComponentProps, Fragment, Suspense } from "react";
import { SerializeFrom } from "@netlify/remix-runtime";
import { SelectTodo } from "~/db/schema";
import { Separator } from "~/components/ui/separator";
import { Await } from "@remix-run/react";

type Todos = SerializeFrom<Array<SelectTodo>>;

type SkeletonProps = {
	amount?: number;
};

function Skeleton({ amount = 3 }: SkeletonProps) {
	return Array.from({ length: amount }).map((_, index) => (
		<Fragment key={index}>
			{index !== 0 && <Separator />}
			<TodoItem.Skeleton />
		</Fragment>
	));
}

function Error() {
	return <p className="text-red-500">Failed to fetch todos...</p>;
}

type ResultProps = {
	data: Todos;
};

function Result({ data }: ResultProps) {
	if (!data.length) {
		return <>No todo items found</>;
	}

	return data.map((todo, index) => (
		<Fragment key={todo.id}>
			{index !== 0 && <Separator />}
			<TodoItem {...todo} />
		</Fragment>
	));
}

type TodoOverviewCardProps = ComponentProps<typeof Card> & {
	promise: Promise<Todos>;
};

export function TodoOverviewCard({ promise, ...props }: TodoOverviewCardProps) {
	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Todos</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<Suspense fallback={<Skeleton {...props} />}>
					<Await resolve={promise} errorElement={<Error {...props} />}>
						{(items) => <Result data={items} {...props} />}
					</Await>
				</Suspense>
			</CardContent>
		</Card>
	);
}
