import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import "@netlify/edge-functions";

const getEnv = (key: string) => {
	if (typeof Netlify !== "undefined") {
		return Netlify.env.get(key);
	}

	return process.env[key];
};

export const env = createEnv({
	server: {
		TURSO_CONNECTION_URL: z.string().url(),
		TURSO_AUTH_TOKEN: z.string().min(1),
	},
	runtimeEnv: {
		TURSO_CONNECTION_URL: getEnv("TURSO_CONNECTION_URL"),
		TURSO_AUTH_TOKEN: getEnv("TURSO_AUTH_TOKEN"),
	},
	emptyStringAsUndefined: true,
});
