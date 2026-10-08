// src/routeData.ts
// Site navigation lives in the custom header (src/components/Header.astro), so
// Starlight's sidebar is always empty. Turning it off removes the blank left
// column and its duplicate mobile menu button; the "On this page" table of
// contents is unaffected.
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware((context) => {
	context.locals.starlightRoute.hasSidebar = false;
});
