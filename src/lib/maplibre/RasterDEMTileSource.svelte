<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext, prepareSourceContext } from './context.svelte.js';
	import type { DEMEncoding, RasterDEMTileSource, RasterDEMSourceSpecification } from 'maplibre-gl';
	import { generateSourceID } from './utils.js';

	// TODO: extends RasterDEMSourceSpecification ?
	interface Props {
		id?: string;
		tiles?: string[];
		url?: string;
		minzoom: number;
		maxzoom: number;
		tileSize?: number;
		attribution?: string;

		encoding?: DEMEncoding;
		redFactor?: number;
		greenFactor?: number;
		blueFactor?: number;
		baseShift?: number;

		children?: Snippet;
	}
	let {
		id: _id,
		tiles,
		url,
		minzoom,
		maxzoom,
		tileSize = 256,
		attribution,
		encoding,
		redFactor,
		greenFactor,
		blueFactor,
		baseShift,
		children
	}: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('MapLibre is not initialized');
	}

	const id = _id || generateSourceID();
	const sourceSpec: RasterDEMSourceSpecification = {
		type: 'raster-dem',
		url,
		tileSize,
		minzoom,
		maxzoom,
		attribution,
		encoding,
		redFactor,
		greenFactor,
		blueFactor,
		baseShift
	};
	if (tiles) {
		sourceSpec.tiles = tiles;
	}
	mapCtx.map.addSource(id, sourceSpec);
	const sourceCtx = prepareSourceContext();
	sourceCtx.id = id;
	const source = mapCtx.map.getSource<RasterDEMTileSource>(id);
	if (!source) {
		throw new Error(`Failed to add source {id}`);
	}

	let firstRun = true; // prevent reactivity on first run

	$effect(() => {
		if (firstRun) {
			return;
		}
		if (url) {
			source.setUrl(url);
		} else if (tiles) {
			source.setTiles(tiles);
		}
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
