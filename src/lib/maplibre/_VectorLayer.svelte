<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext, getSourceContext } from './context.svelte';
	import type maplibregl from 'maplibre-gl';

	type VectorLayerSpecification =
		| maplibregl.FillLayerSpecification
		| maplibregl.LineLayerSpecification
		| maplibregl.CircleLayerSpecification
		| maplibregl.FillExtrusionLayerSpecification;

	interface Props extends Omit<VectorLayerSpecification, 'source' | 'source-layer'> {
		beforeId?: string;
		sourceLayer?: string;
		children?: Snippet;
	}

	let { id, type, paint, layout, beforeId, sourceLayer, maxzoom, minzoom, children }: Props =
		$props();

	const { map } = getMapContext();
	if (!map) {
		throw new Error('Map is not initialized');
	}

	const sourceContext = getSourceContext();

	const addLayerObj = {
		id,
		type,
		source: sourceContext.sourceId,
		layout: layout || {},
		paint: paint || {}
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
		if ((minzoom !== undefined || maxzoom !== undefined) && !firstRun) {
			map.setLayerZoomRange(id, minzoom || 0, maxzoom || 24);
		}
	});

	$effect(() => {
		if (beforeId && !firstRun) {
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
