<script lang="ts">
	import maplibre from 'maplibre-gl';
	import type { MapOptions, MapEventType, AttributionControlOptions, LngLatBoundsLike } from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onDestroy, type Snippet } from 'svelte';
	import { prepareMapContext } from '../context.svelte.js';
	import type { LngLat } from '../common.js';
	import { resetEventListener } from '../utils.js';

	type MapEventProps = {
		[K in keyof MapEventType as `on${K}`]?: (ev: MapEventType[K]) => void;
	};

	interface Props extends MapEventProps {
		class?: string;
		map?: maplibre.Map | null;
		interactive?: boolean;
		style?: MapOptions['style'];
		center?: LngLat;
		zoom?: number;
		pitch?: number;
		bearing?: number;
		minZoom?: number | null;
		maxZoom?: number | null;
		minPitch?: number | null;
		maxPitch?: number | null;
		antialias?: boolean;
		maxBounds?: LngLatBoundsLike;
		attributionControl?: false | AttributionControlOptions;
		children?: Snippet;
	}

	let {
		class: className = '',
		map = $bindable(null),
		interactive = undefined,
		style = { version: 8, sources: {}, layers: [] },
		center = $bindable(undefined),
		zoom = $bindable(undefined),
		pitch = $bindable(undefined),
		bearing = $bindable(undefined),
		minZoom = undefined,
		maxZoom = undefined,
		minPitch = undefined,
		maxPitch = undefined,
		maxBounds = undefined,
		attributionControl = undefined,
		antialias,
		children,

		// Events
		// https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MapEventType/
		onerror,
		onload,
		onidle,
		onremove,
		onrender,
		onresize,
		onwebglcontextlost,
		onwebglcontextrestored,
		ondataloading,
		ondata,
		ontiledataloading,
		onsourcedataloading,
		onstyledataloading,
		onsourcedata,
		onstyledata,
		onstyleimagemissing,
		ondataabort,
		onsourcedataabort,
		onboxzoomcancel,
		onboxzoomstart,
		onboxzoomend,
		ontouchcancel,
		ontouchmove,
		ontouchend,
		ontouchstart,
		onclick,
		oncontextmenu,
		ondblclick,
		onmousemove,
		onmouseup,
		onmousedown,
		onmouseout,
		onmouseover,
		onmovestart,
		onmove,
		onmoveend,
		onzoomstart,
		onzoom,
		onzoomend,
		onrotatestart,
		onrotate,
		onrotateend,
		ondragstart,
		ondrag,
		ondragend,
		onpitchstart,
		onpitch,
		onpitchend,
		onwheel,
		onterrain,
		oncooperativegestureprevented,
		onprojectiontransition
	}: Props = $props();

	let container: HTMLElement | undefined = $state();
	let loaded = $state(false);

	const mapCtx = prepareMapContext();

	$effect(() => {
		if (map || !container) {
			return;
		}
		const options: MapOptions = {
			container,
			style,
			center,
			minZoom,
			maxZoom,
			minPitch,
			maxPitch,
			antialias
		};
		if (interactive !== undefined) {
			options.interactive = interactive;
		}
		if (attributionControl !== undefined) {
			options.attributionControl = attributionControl;
		}
		if (zoom !== undefined) {
			options.zoom = zoom;
		}
		if (pitch !== undefined) {
			options.pitch = pitch;
		}
		if (bearing !== undefined) {
			options.bearing = bearing;
		}
		if (maxBounds) {
			options.maxBounds = maxBounds;
		}

		map = new maplibre.Map(options);

		map.on('load', () => {
			mapCtx.map = map;
			loaded = true;
		});

		map.on('move', () => {
			if (map) {
				center = map.getCenter();
				pitch = map.getPitch();
				bearing = map.getBearing();
				zoom = map?.getZoom();
			}
		});
	});

	$effect(resetEventListener(map, 'boxzoomcancel', onboxzoomcancel));
	$effect(resetEventListener(map, 'boxzoomend', onboxzoomend));
	$effect(resetEventListener(map, 'boxzoomstart', onboxzoomstart));
	$effect(resetEventListener(map, 'click', onclick));
	$effect(resetEventListener(map, 'contextmenu', oncontextmenu));
	$effect(resetEventListener(map, 'cooperativegestureprevented', oncooperativegestureprevented));
	$effect(resetEventListener(map, 'data', ondata));
	$effect(resetEventListener(map, 'dataabort', ondataabort));
	$effect(resetEventListener(map, 'dataloading', ondataloading));
	$effect(resetEventListener(map, 'dblclick', ondblclick));
	$effect(resetEventListener(map, 'drag', ondrag));
	$effect(resetEventListener(map, 'dragend', ondragend));
	$effect(resetEventListener(map, 'dragstart', ondragstart));
	$effect(resetEventListener(map, 'error', onerror));
	$effect(resetEventListener(map, 'idle', onidle));
	$effect(resetEventListener(map, 'load', onload));
	$effect(resetEventListener(map, 'mousedown', onmousedown));
	$effect(resetEventListener(map, 'mousemove', onmousemove));
	$effect(resetEventListener(map, 'mouseout', onmouseout));
	$effect(resetEventListener(map, 'mouseover', onmouseover));
	$effect(resetEventListener(map, 'mouseup', onmouseup));
	$effect(resetEventListener(map, 'move', onmove));
	$effect(resetEventListener(map, 'moveend', onmoveend));
	$effect(resetEventListener(map, 'movestart', onmovestart));
	$effect(resetEventListener(map, 'pitch', onpitch));
	$effect(resetEventListener(map, 'pitchend', onpitchend));
	$effect(resetEventListener(map, 'pitchstart', onpitchstart));
	$effect(resetEventListener(map, 'projectiontransition', onprojectiontransition));
	$effect(resetEventListener(map, 'remove', onremove));
	$effect(resetEventListener(map, 'render', onrender));
	$effect(resetEventListener(map, 'resize', onresize));
	$effect(resetEventListener(map, 'rotate', onrotate));
	$effect(resetEventListener(map, 'rotateend', onrotateend));
	$effect(resetEventListener(map, 'rotatestart', onrotatestart));
	$effect(resetEventListener(map, 'sourcedata', onsourcedata));
	$effect(resetEventListener(map, 'sourcedataabort', onsourcedataabort));
	$effect(resetEventListener(map, 'sourcedataloading', onsourcedataloading));
	$effect(resetEventListener(map, 'styledata', onstyledata));
	$effect(resetEventListener(map, 'styledataloading', onstyledataloading));
	$effect(resetEventListener(map, 'styleimagemissing', onstyleimagemissing));
	$effect(resetEventListener(map, 'terrain', onterrain));
	$effect(resetEventListener(map, 'tiledataloading', ontiledataloading));
	$effect(resetEventListener(map, 'touchcancel', ontouchcancel));
	$effect(resetEventListener(map, 'touchend', ontouchend));
	$effect(resetEventListener(map, 'touchmove', ontouchmove));
	$effect(resetEventListener(map, 'touchstart', ontouchstart));
	$effect(resetEventListener(map, 'webglcontextlost', onwebglcontextlost));
	$effect(resetEventListener(map, 'webglcontextrestored', onwebglcontextrestored));
	$effect(resetEventListener(map, 'wheel', onwheel));
	$effect(resetEventListener(map, 'zoom', onzoom));
	$effect(resetEventListener(map, 'zoomend', onzoomend));
	$effect(resetEventListener(map, 'zoomstart', onzoomstart));

	let firstRun = true;

	$effect(() => {
		if (style && !firstRun) {
			mapCtx.setStyle(style);
		}
	});
	$effect(() => {
		maxZoom;
		if (!firstRun) {
			map?.setMaxZoom(maxZoom === undefined ? null : maxZoom);
		}
	});
	$effect(() => {
		minZoom;
		if (!firstRun) {
			map?.setMinZoom(minZoom === undefined ? null : minZoom);
		}
	});
	$effect(() => {
		if (zoom !== undefined && !firstRun) {
			map?.getZoom() !== zoom && map?.setZoom(zoom);
		}
	});
	$effect(() => {
		if (center && !firstRun) {
			const prevCenter = map?.getCenter();
			if (prevCenter && (prevCenter.lng !== center.lng || prevCenter.lat !== center.lat)) {
				map?.setCenter(center);
			}
		}
	});
	$effect(() => {
		if (pitch !== undefined && !firstRun) {
			map?.getPitch() !== pitch && map?.setPitch(pitch);
		}
	});
	$effect(() => {
		if (bearing !== undefined && !firstRun) {
			map?.getBearing() !== bearing && map?.setBearing(bearing);
		}
	});

	$effect(() => {
		maxPitch;
		minPitch;
		if (firstRun) {
			map?.setMaxPitch(maxPitch);
			map?.setMinPitch(minPitch);
		}
	});
	$effect(() => {
		maxBounds;
		if (!firstRun) {
			map?.setMaxBounds(maxBounds);
		}
	});

	$effect(() => {
		firstRun = false;
	});

	onDestroy(() => {
		mapCtx.map = null;
		map?.remove();
	});
</script>

<div class={className} bind:this={container}></div>

{#if map && loaded}
	{@render children?.()}
{/if}
