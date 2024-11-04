<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext, prepareSourceContext } from './context.svelte';
	import type { RasterTileSource } from 'maplibre-gl';
	import { generateSourceID } from './utils.js';

	// TODO: extends RasterTileSourceSpecification ?
	interface Props {
		id?: string;
		tiles: string[];
		minzoom: number;
		maxzoom: number;
		tileSize?: number;
		attribution?: string;
		children?: Snippet;
	}
	let { id: _id, tiles, minzoom, maxzoom, tileSize = 256, attribution, children }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('MapLibre is not initialized');
	}

	const id = _id || generateSourceID();
	mapCtx.map.addSource(id, {
		type: 'raster',
		tiles,
		tileSize,
		minzoom,
		maxzoom,
		attribution
	});
	const sourceCtx = prepareSourceContext();
	sourceCtx.id = id;
	const source = mapCtx.map.getSource<RasterTileSource>(id);
	if (!source) {
		throw new Error(`Failed to add source {id}`);
	}

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
		mapCtx.map?.removeSource(id);
	});
</script>

{#if source}
	{@render children?.()}
{/if}
