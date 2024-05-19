import { type MetaFunction } from "@netlify/remix-runtime";

export const meta: MetaFunction = () => [
	{ title: "New Remix App" },
	{ name: "description", content: "Welcome to Remix!" },
];

export default function Index() {
	return <div>Remix sandbox</div>;
}
