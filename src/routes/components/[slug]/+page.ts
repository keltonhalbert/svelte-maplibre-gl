import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';

export const load = async ({ params }) => {
	const { slug } = params;

	try {
		const post = (await import(`$content/components/${slug}/content.svelte.md`)) as {
			default: Component;
			metadata: {
				title: string;
				description: string;
			};
		};
		return {
			Content: post.default,
			meta: { ...post.metadata, slug }
		};
	} catch {
		error(404, `Post '${slug}' not found`);
	}
};
