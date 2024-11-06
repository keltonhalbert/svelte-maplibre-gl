<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext, getSourceContext } from '../context.svelte.js';
	import type { RasterLayerSpecification } from 'maplibre-gl';
	import { generateLayerID } from '../utils.js';

	interface Props extends Omit<RasterLayerSpecification, 'id' | 'source' | 'type' | 'source-layer'> {
		id?: string;
		beforeId?: string;
		sourceLayer?: string;
		children?: Snippet;
	}

	let { id: _id, paint, layout, beforeId, sourceLayer, maxzoom, minzoom, children }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('MapLibre is not initialized');
	}

	const sourceCtx = getSourceContext();
	const id = _id || generateLayerID();

	const addLayerObj: RasterLayerSpecification = {
		id,
		type: 'raster',
		source: sourceCtx.id,
		layout: ($state.snapshot(layout) as RasterLayerSpecification['layout']) || {},
		paint: ($state.snapshot(paint) as RasterLayerSpecification['paint']) || {}
	};

	if (maxzoom !== undefined) {
		addLayerObj.maxzoom = maxzoom;
	}
	if (minzoom !== undefined) {
		addLayerObj.minzoom = minzoom;
	}
	if (sourceLayer) {
		addLayerObj['source-layer'] = sourceLayer;
	}

	mapCtx.addLayer(addLayerObj, beforeId);

	let firstRun = true;

	let prevPaint = $state.snapshot(paint) as Record<string, unknown>;
	$effect(() => {
		const map = mapCtx.map;
		if (paint && !firstRun && map) {
			Object.entries((paint || {}) as object).forEach(([key, value]) => {
				if (prevPaint[key] !== value) {
					map.setPaintProperty(id, key, value);
				}
			});
			prevPaint = $state.snapshot(paint) as Record<string, unknown>;
		}
	});

	let prevLayout = $state.snapshot(layout) as Record<string, unknown>;
	$effect(() => {
		const map = mapCtx.map;
		if (layout && !firstRun && map) {
			Object.entries((layout || {}) as object).forEach(([key, value]) => {
				if (prevLayout[key] !== value) {
					map.setLayoutProperty(id, key, value);
				}
			});
			prevLayout = $state.snapshot(layout) as Record<string, unknown>;
		}
	});

	$effect(() => {
		minzoom;
		maxzoom;
		if ((minzoom !== undefined || maxzoom !== undefined) && !firstRun) {
			mapCtx.map?.setLayerZoomRange(id, minzoom || 0, maxzoom || 24);
		}
	});

	$effect(() => {
		beforeId;
		if (!firstRun) {
			mapCtx.map?.moveLayer(id, beforeId);
		}
	});

	$effect(() => {
		firstRun = false;
	});

	onDestroy(() => {
		mapCtx.removeLayer(id);
	});
</script>

{@render children?.()}
