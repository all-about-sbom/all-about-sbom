// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
	markdown: {
        rehypePlugins: [
            [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
        ],
    },
	integrations: [
		mermaid(),
		starlight({
			title: 'All About SBOMs',
			customCss: ['./src/styles/custom.css'],
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 2 },
			components: {
        		Header: './src/components/Header.astro',
				Footer: './src/components/Footer.astro',
      		},
			sidebar: [
			],
		}),
	],
});
