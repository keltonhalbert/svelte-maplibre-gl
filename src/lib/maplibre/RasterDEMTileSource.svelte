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
		tileSize,
		minzoom,
		maxzoom,
		attribution,
		encoding
	};
	if (redFactor !== undefined) {
		sourceSpec.redFactor = redFactor;
	}
	if (greenFactor !== undefined) {
		sourceSpec.greenFactor = greenFactor;
	}
	if (blueFactor !== undefined) {
		sourceSpec.blueFactor = blueFactor;
	}
	if (baseShift !== undefined) {
		sourceSpec.baseShift = baseShift;
	}
	if (url) {
		sourceSpec.url = url;
	}
	if (tiles) {
		sourceSpec.tiles = tiles;
	}
	mapCtx.addSource(id, sourceSpec);
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
		mapCtx.removeSource(id);
	});
</script>

{#if source}
	{@render children?.()}
{/if}
