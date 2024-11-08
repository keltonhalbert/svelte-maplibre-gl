<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import type { LayerSpecification, FilterSpecification } from 'maplibre-gl';
	import { getMapContext, getSourceContext } from '../context.svelte.js';
	import { generateLayerID, resetLayerEventListener } from '../utils.js';
	import type { MapLayerEventProps } from './common.js';

	interface Props extends Omit<LayerSpecification, 'id' | 'source' | 'source-layer' | 'filter'>, MapLayerEventProps {
		id?: string;
		beforeId?: string;
		filter?: FilterSpecification;
		sourceLayer?: string;
		children?: Snippet;
	}

	let {
		id: _id,
		beforeId,
		type,
		paint,
		layout,
		filter,
		sourceLayer,
		maxzoom,
		minzoom,
		children,

		// Events
		// https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MapLayerEventType/
		onclick,
		ondblclick,
		onmousedown,
		onmouseup,
		onmousemove,
		onmouseenter,
		onmouseleave,
		onmouseover,
		onmouseout,
		oncontextmenu,
		ontouchstart,
		ontouchend,
		ontouchcancel
	}: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('Map instance is not initialized.');
	}

	const id = _id ?? generateLayerID();

	const addLayerObj = {
		id,
		type,
		layout: $state.snapshot(layout) ?? {},
		paint: $state.snapshot(paint) ?? {}
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
	if (addLayerObj.type !== 'background') {
		if (sourceLayer) {
			addLayerObj['source-layer'] = sourceLayer;
		}
		if (filter) {
			addLayerObj['filter'] = filter;
		}
	}

	mapCtx.addLayer(addLayerObj, beforeId);

	$effect(() => resetLayerEventListener(mapCtx.map, 'click', id, onclick));
	$effect(() => resetLayerEventListener(mapCtx.map, 'dblclick', id, ondblclick));
	$effect(() => resetLayerEventListener(mapCtx.map, 'mousedown', id, onmousedown));
	$effect(() => resetLayerEventListener(mapCtx.map, 'mouseup', id, onmouseup));
	$effect(() => resetLayerEventListener(mapCtx.map, 'mousemove', id, onmousemove));
	$effect(() => resetLayerEventListener(mapCtx.map, 'mouseenter', id, onmouseenter));
	$effect(() => resetLayerEventListener(mapCtx.map, 'mouseleave', id, onmouseleave));
	$effect(() => resetLayerEventListener(mapCtx.map, 'mouseover', id, onmouseover));
	$effect(() => resetLayerEventListener(mapCtx.map, 'mouseout', id, onmouseout));
	$effect(() => resetLayerEventListener(mapCtx.map, 'contextmenu', id, oncontextmenu));
	$effect(() => resetLayerEventListener(mapCtx.map, 'touchstart', id, ontouchstart));
	$effect(() => resetLayerEventListener(mapCtx.map, 'touchend', id, ontouchend));
	$effect(() => resetLayerEventListener(mapCtx.map, 'touchcancel', id, ontouchcancel));

	let firstRun = true;

	let prevPaint: Record<string, unknown> = $state.snapshot(paint) ?? {};
	$effect(() => {
		paint;
		const map = mapCtx.map;
		if (!firstRun && map) {
			const keysRemoved = new Set(Object.keys(prevPaint));
			for (const [key, value] of Object.entries((paint ?? {}) as object)) {
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

	let prevLayout: Record<string, unknown> = $state.snapshot(layout) ?? {};
	$effect(() => {
		layout;
		const map = mapCtx.map;
		if (!firstRun && map) {
			const keysRemoved = new Set(Object.keys(prevLayout));
			for (const [key, value] of Object.entries((layout ?? {}) as object)) {
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
			mapCtx.map?.setLayerZoomRange(id, minzoom ?? 0, maxzoom ?? 22);
		}
	});

	$effect(() => {
		filter;
		if (!firstRun) {
			mapCtx.map?.setFilter(id, filter);
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
