<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext, getSourceContext } from '../context.svelte.js';
	import type { LayerSpecification } from 'maplibre-gl';
	import { generateLayerID } from '../utils.js';

	interface Props extends Omit<LayerSpecification, 'id' | 'source' | 'source-layer'> {
		id?: string;
		beforeId?: string;
		sourceLayer?: string;
		children?: Snippet;
	}

	let { id: _id, type, paint, layout, beforeId, sourceLayer, maxzoom, minzoom, children }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('MapLibre is not initialized');
	}

	const id = _id || generateLayerID();

	const addLayerObj = {
		id,
		type,
		layout: $state.snapshot(layout) || {},
		paint: $state.snapshot(paint) || {}
	} as LayerSpecification;

	if (addLayerObj.type !== 'background') {
		addLayerObj.source = getSourceContext().id;
	}

	if (maxzoom !== undefined) {
		addLayerObj.maxzoom = maxzoom;
	}
	if (minzoom !== undefined) {
		addLayerObj.minzoom = minzoom;
	}
	if (sourceLayer && addLayerObj.type !== 'background') {
		addLayerObj['source-layer'] = sourceLayer;
	}

	mapCtx.addLayer(addLayerObj, beforeId);

	let firstRun = true;

	let prevPaint = $state.snapshot(paint) as Record<string, unknown>;
	$effect(() => {
		const map = mapCtx.map;
		if (paint && !firstRun && map) {
			const keysRemoved = new Set(Object.keys(prevPaint));
			for (const [key, value] of Object.entries((paint || {}) as object)) {
				keysRemoved.delete(key);
				if (prevPaint[key] !== value) {
					map.setPaintProperty(id, key, value);
				}
			}
			for (const key of keysRemoved) {
				map.setPaintProperty(id, key, undefined);
			}
			prevPaint = $state.snapshot(paint) as Record<string, unknown>;
		}
	});

	let prevLayout = $state.snapshot(layout) as Record<string, unknown>;
	$effect(() => {
		const map = mapCtx.map;
		if (layout && !firstRun && map) {
			const keysRemoved = new Set(Object.keys(prevLayout));
			for (const [key, value] of Object.entries((layout || {}) as object)) {
				keysRemoved.delete(key);
				if (prevLayout[key] !== value) {
					map.setLayoutProperty(id, key, value);
				}
			}
			for (const key of keysRemoved) {
				map.setLayoutProperty(id, key, undefined);
			}
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
		mapCtx.removeLayer(id);
	});
</script>

{@render children?.()}
