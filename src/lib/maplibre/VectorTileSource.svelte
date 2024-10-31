<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext, prepareSourceContext } from './context.svelte';
	import type { VectorTileSource } from 'maplibre-gl';

	interface Props {
		id: string;
		tiles: string[];
		minzoom: number;
		maxzoom: number;
		attribution?: string;
		children?: Snippet;
	}

	let { id, tiles, minzoom, maxzoom, attribution, children }: Props = $props();

	const { map } = getMapContext();
	if (!map) {
		throw new Error('Map is not initialized');
	}

	map.addSource(id, {
		type: 'vector',
		tiles,
		minzoom,
		maxzoom,
		attribution
	});
	const sourceContext = prepareSourceContext();
	sourceContext.sourceId = id;

	const source = map.getSource(id) as VectorTileSource;

	let firstRun = true; // prevent reactivity on first run

	$effect(() => {
		if (firstRun) {
			return;
		}
		source.setTiles(tiles);
	});
	$effect(() => {
		source.maxzoom = maxzoom;
		source.minzoom = minzoom;
	});
	$effect(() => {
		firstRun = false;
	});

	onDestroy(() => {
		map?.removeSource(id);
	});
</script>

{#if source}
	{@render children?.()}
{/if}
