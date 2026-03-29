// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
	integrations: [
		mermaid(),
		starlight({
			title: 'All About SBOMs',
			customCss: ['./src/styles/custom.css'],
			components: {
        		Header: './src/components/Header.astro',
				Footer: './src/components/Footer.astro',
      		},
			sidebar: [
			],
		}),
	],
});
