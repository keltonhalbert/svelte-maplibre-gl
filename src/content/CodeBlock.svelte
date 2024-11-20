<script lang="ts">
	import Prism from 'prismjs';
	import 'prism-svelte';

	let {
		content,
		lang = 'svelte'
	}: {
		content: string;
		lang: string;
	} = $props();

	let highlighted = $derived(Prism.highlight(content, Prism.languages[lang], 'svelte'));
</script>

<div class="my-6 text-[14px] subpixel-antialiased">
	<pre class={`language-${lang}`}><code class={`language-${lang}`}>{@html highlighted}</code></pre>
</div>
