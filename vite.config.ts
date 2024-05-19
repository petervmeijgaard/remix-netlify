import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { netlifyPlugin } from "@netlify/remix-edge-adapter/plugin";

export default defineConfig({
	plugins: [
		remix({
			ignoredRouteFiles: ["**/.*"],
			future: {
				unstable_singleFetch: true,
			},
		}),
		netlifyPlugin(),
		tsconfigPaths(),
	],
});
