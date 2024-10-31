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

	const { map } = getMapContext();
	if (!map) {
		throw new Error('Map is not initialized');
	}

	const sourceContext = getSourceContext();

	const addLayerObj = {
		id,
		type: 'raster',
		source: sourceContext.sourceId,
		layout: layout || {},
		paint: paint || {}
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

	map.addLayer(addLayerObj, beforeId);

	let firstRun = true;

	let prevPaint = $state.snapshot(paint) as Record<string, unknown>;
	$effect(() => {
		if (paint && !firstRun) {
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
		if (layout && !firstRun) {
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
			map.setLayerZoomRange(id, minzoom || 0, maxzoom || 24);
		}
	});

	$effect(() => {
		beforeId;
		if (!firstRun) {
			map.moveLayer(id, beforeId);
		}
	});

	$effect(() => {
		firstRun = false;
	});

	onDestroy(() => {
		map?.removeLayer(id);
	});
</script>

{@render children?.()}
