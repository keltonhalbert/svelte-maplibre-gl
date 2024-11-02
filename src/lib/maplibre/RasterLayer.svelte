<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext, getSourceContext } from './context.svelte';
	import type { RasterLayerSpecification } from 'maplibre-gl';

	interface Props extends Omit<RasterLayerSpecification, 'source' | 'type' | 'source-layer'> {
		beforeId?: string;
		sourceLayer?: string;
		children?: Snippet;
	}

	let { id, paint, layout, beforeId, sourceLayer, maxzoom, minzoom, children }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('Map is not initialized');
	}

	const sourceCtx = getSourceContext();

	const addLayerObj = {
		id,
		type: 'raster',
		source: sourceCtx.id,
		layout: $state.snapshot(layout) || {},
		paint: $state.snapshot(paint) || {}
	} as RasterLayerSpecification;

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
		mapCtx.map?.removeLayer(id);
	});
</script>

{@render children?.()}
