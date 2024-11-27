<script lang="ts" module>
	import { createHighlighterCoreSync, createJavaScriptRegexEngine } from 'shiki';
	import svelte from 'shiki/langs/svelte.mjs';
	import dark from 'shiki/themes/github-dark-default.mjs';

	export const shiki = createHighlighterCoreSync({
		themes: [dark],
		langs: [svelte],
		engine: createJavaScriptRegexEngine()
	});
</script>

<script lang="ts">
	let {
		content
	}: {
		content: string;
	} = $props();

	const highlighted = $derived.by(() => {
		return shiki.codeToHtml(content.trim(), { lang: 'svelte', theme: 'github-dark-default' });
	});
</script>

<div class="my-6 subpixel-antialiased">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html highlighted}
</div>

<style>
	:global(.shiki code) {
		font-size: 13px;
		tab-size: 2;
		counter-reset: step;
		counter-increment: step 0;
	}

	:global(.shiki code .line::before) {
		content: counter(step);
		counter-increment: step;
		width: 1rem;
		margin-right: 1.5rem;
		display: inline-block;
		text-align: right;
		color: rgba(115, 138, 148, 0.4);
	}
</style>
