<script lang="ts">
	import { browser } from '$app/environment';
	import { createHighlighter, type Highlighter } from 'shiki';
	import svelte from 'shiki/langs/svelte.mjs';
	import dark from 'shiki/themes/github-dark-default.mjs';

	let {
		content
	}: {
		content: string;
	} = $props();

	let shiki: Promise<Highlighter> | undefined = $state.raw();
	if (browser) {
		shiki = createHighlighter({
			themes: [dark],
			langs: [svelte]
		});
	}

	const _content = $derived.by(() => {
		return content.replaceAll('\t', '  ').trim();
	});
</script>

<div class="my-6 subpixel-antialiased">
	{#if shiki}
		{#await shiki then shiki}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html shiki.codeToHtml(_content, { lang: 'svelte', theme: 'github-dark-default' })}
		{/await}
	{:else}
		<pre class="shiki"><code
				>{#each _content.split('\n') as line}<span class="line">{line + '\n'}</span>{/each}</code
			></pre>
	{/if}
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
		width: 1em;
		margin-right: 1em;
		display: inline-block;
		text-align: right;
		color: rgba(115, 138, 148, 0.5);
	}
</style>
