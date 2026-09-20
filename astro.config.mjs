// @ts-check
import { defineConfig } from 'astro/config';

// Static export so GitHub Pages can serve docs.billionail.com
// without a server runtime. Parent wires DNS separately.
export default defineConfig({
	site: 'https://docs.billionail.com',
	output: 'static',
	trailingSlash: 'always',
});
