<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext, prepareSourceContext } from './context.svelte';
	import type { RasterTileSource } from 'maplibre-gl';

	interface Props {
		id: string;
		tiles: string[];
		minzoom: number;
		maxzoom: number;
		tileSize?: number;
		attribution?: string;
		children?: Snippet;
	}
	let { id, tiles, minzoom, maxzoom, tileSize = 256, attribution, children }: Props = $props();

	const { map } = getMapContext();
	if (!map) {
		throw new Error('Map is not initialized');
	}

	map.addSource(id, {
		type: 'raster',
		tiles,
		tileSize,
		minzoom,
		maxzoom,
		attribution
	});
	const sourceContext = prepareSourceContext();
	sourceContext.sourceId = id;

	const source = $state(map.getSource(id) as RasterTileSource);

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
		source.tileSize = tileSize;
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
