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
		mermaid({
			// autoTheme (default: true) already swaps between mermaid's
			// built-in 'dark'/'default' presets based on data-theme; these
			// variables layer on top of whichever one is active, so
			// diagrams pick up the site's palette in both modes instead of
			// mermaid's generic gray/blue defaults. Colors match the
			// tokens in src/styles/custom.css.
			//
			// Note: mermaid's "dark"/"default" presets (unlike "base") don't
			// derive node/edge colors from primaryColor/lineColor etc. — each
			// preset hardcodes its own values for those. The concrete
			// variables below (mainBkg, nodeBorder, ...) are the ones that
			// actually take effect on top of a non-base theme; verified by
			// initializing mermaid directly in a browser console against
			// this exact config before landing on these names.
			mermaidConfig: {
				themeVariables: {
					mainBkg: '#2bb8bd',
					nodeBorder: '#1f9599',
					textColor: '#0f1620',
					lineColor: '#7e8898',
					edgeLabelBackground: '#131b26',
					clusterBkg: '#16202c',
					clusterBorder: '#2a3341',
					fontFamily: 'Space Grotesk, system-ui, sans-serif',
				},
			},
		}),
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
