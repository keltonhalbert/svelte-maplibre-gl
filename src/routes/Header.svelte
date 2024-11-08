<script lang="ts">
	import MapPinned from 'lucide-svelte/icons/map-pinned';
	import GitHub from '$lib/assets/icons/GitHub.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import DarkModeSelector from './DarkModeSelector.svelte';
</script>

<div class="flex h-16 w-full shrink-0 items-center justify-between leading-none">
	<div class="flex h-full w-full items-center gap-x-4">
		<h1 class="pr-2 text-xl font-bold">
			<a href="/" class="">
				<MapPinned class="mr-1.5 inline-block !size-6 pb-1" />Svelte MapLibre GL
			</a>
		</h1>
		<a href="/examples/" class="text-sm text-foreground/70 transition-colors hover:text-foreground">Examples</a>
		<a href="/components" class="text-sm text-foreground/70 transition-colors hover:text-foreground">Components</a>
	</div>
	<div class="flex items-center text-xs leading-none">
		<div class="mr-4">SearchBox</div>
		<Button variant="ghost" size="icon">
			<a href="https://github.com/MIERUNE/svelte-maplibre-gl" target="_blank"><GitHub class="!size-5" /></a>
		</Button>
		<div>
			<DarkModeSelector />
		</div>
	</div>
</div>
