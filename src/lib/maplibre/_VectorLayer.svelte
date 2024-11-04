<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext, getSourceContext } from './context.svelte';
	import type maplibregl from 'maplibre-gl';
	import { generateLayerID } from './utils.js';

	type VectorLayerSpecification =
		| maplibregl.FillLayerSpecification
		| maplibregl.LineLayerSpecification
		| maplibregl.CircleLayerSpecification
		| maplibregl.FillExtrusionLayerSpecification
		| maplibregl.HeatmapLayerSpecification;

	interface Props extends Omit<VectorLayerSpecification, 'id' | 'source' | 'source-layer'> {
		id?: string;
		beforeId?: string;
		sourceLayer?: string;
		children?: Snippet;
	}

	let {
		id: _id,
		type,
		paint,
		layout,
		beforeId,
		sourceLayer,
		maxzoom,
		minzoom,
		children
	}: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('MapLibre is not initialized');
	}

	const sourceCtx = getSourceContext();
	const id = _id || generateLayerID();

	const addLayerObj = {
		id,
		type,
		source: sourceCtx.id,
		layout: $state.snapshot(layout) || {},
		paint: $state.snapshot(paint) || {}
	} as VectorLayerSpecification;

	if (maxzoom !== undefined) {
		addLayerObj.maxzoom = maxzoom;
	}
	if (minzoom !== undefined) {
		addLayerObj.minzoom = minzoom;
	}
	if (sourceLayer) {
		addLayerObj['source-layer'] = sourceLayer;
	}

	mapCtx.map.addLayer(addLayerObj, beforeId);

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
		if ((minzoom !== undefined || maxzoom !== undefined) && !firstRun) {
			mapCtx.map?.setLayerZoomRange(id, minzoom || 0, maxzoom || 24);
		}
	});

	$effect(() => {
		if (beforeId && !firstRun) {
			mapCtx.map?.moveLayer(id, beforeId);
		}
	});

	$effect(() => {
		firstRun = false;
	});

	onDestroy(() => {
		mapCtx.map?.removeLayer(id);
	});
</script>

{@render children?.()}
