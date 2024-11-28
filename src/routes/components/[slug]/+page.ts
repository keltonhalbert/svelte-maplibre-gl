import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';

import {
	createHighlighterCoreSync,
	createOnigurumaEngine,
	createJavaScriptRegexEngine,
	type HighlighterCore
} from 'shiki';
import svelte from 'shiki/langs/svelte.mjs';
import dark from 'shiki/themes/github-dark-default.mjs';
import { browser } from '$app/environment';

export const load = async ({ params }) => {
	const { slug } = params;

	const shiki = createHighlighterCoreSync({
		themes: [dark],
		langs: [svelte],
		// Use the WASM version of Oniguruma on the browser, and the JS engine on the server
		engine: browser ? await createOnigurumaEngine(import('shiki/wasm')) : createJavaScriptRegexEngine()
	});

	try {
		const post = (await import(`$content/examples/${slug}/content.svelte.md`)) as {
			default: Component<{ shiki: HighlighterCore }>;
			metadata: {
				title: string;
				description: string;
			};
		};
		return {
			Content: post.default,
			meta: { ...post.metadata, slug },
			shiki
		};
	} catch {
		error(404, `Example '${slug}' not found`);
	}
};
