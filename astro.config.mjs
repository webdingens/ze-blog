import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import image from "@astrojs/image";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://blog.webdingens.de",
	integrations: [
		mdx(),
		sitemap(),
		react(),
		image({
			serviceEntryPoint: "@astrojs/image/sharp",
		}),
	],
});
