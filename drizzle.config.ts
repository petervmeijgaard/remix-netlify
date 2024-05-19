import { defineConfig } from "drizzle-kit";
import { env } from "~/env/server";

export default defineConfig({
	schema: "./app/db/schema.ts",
	out: "./migrations",
	driver: "turso",
	dialect: "sqlite",
	dbCredentials: {
		url: env.TURSO_CONNECTION_URL,
		authToken: env.TURSO_AUTH_TOKEN,
	},
});
