<script lang="ts">
	import MapPinned from 'lucide-svelte/icons/map-pinned';
	import GitHub from '$lib/assets/icons/GitHub.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import DarkModeSelector from './DarkModeSelector.svelte';

	import { default as docsearch } from '@docsearch/js';
	import '@docsearch/css/dist/button.css';
	import '@docsearch/css/dist/modal.css';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	if (browser) {
		docsearch({
			container: '#docsearch',
			appId: '78TOQ3W600',
			indexName: 'svelte-maplibre-gl',
			apiKey: '096ebe16a7ae7b573fc996e9a08edbc0',
			navigator: {
				navigate({ itemUrl }) {
					const url = new URL(itemUrl);
					goto(url.pathname + url.search + url.hash);
				}
			}
		});
	}
</script>

<div class="flex h-16 w-full shrink-0 items-center justify-between leading-none">
	<div class="flex h-full w-full items-center gap-x-4">
		<h1 class="pr-2 text-xl font-bold">
			<a href="/" class="">
				<MapPinned class="inline-block !size-6 pb-1" /> <span>Svelte MapLibre GL</span>
			</a>
		</h1>
		<a
			href="/examples/"
			data-active={$page.url.pathname.startsWith('/examples/')}
			class="text-sm text-foreground/70 transition-colors hover:text-foreground data-[active=true]:font-semibold"
			>Examples</a
		>
		<a
			href="/components/"
			data-active={$page.url.pathname.startsWith('/components/')}
			class="text-sm text-foreground/70 transition-colors hover:text-foreground data-[active=true]:font-semibold"
			>Components</a
		>
	</div>
	<div class="flex items-center text-xs leading-none">
		<div class="mr-4">
			<div id="docsearch"></div>
		</div>
		<Button variant="ghost" size="icon">
			<a href="https://github.com/MIERUNE/svelte-maplibre-gl" target="_blank"><GitHub class="!size-5" /></a>
		</Button>
		<div>
			<DarkModeSelector />
		</div>
	</div>
</div>
