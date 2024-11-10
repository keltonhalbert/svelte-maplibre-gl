<script lang="ts">
	import maplibre from 'maplibre-gl';
	import type { MapOptions, MapEventType, PaddingOptions, JumpToOptions } from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onDestroy, type Snippet } from 'svelte';
	import { prepareMapContext } from '../context.svelte.js';
	import type { LngLat } from '../common.js';
	import { resetEventListener } from '../utils.js';

	type MapEventProps = {
		[K in keyof MapEventType as `on${K}`]?: (ev: MapEventType[K]) => void;
	};

	interface Props extends Omit<MapOptions, 'container'>, MapEventProps {
		class?: string;
		inlineStyle?: string;
		map?: maplibre.Map | null;
		center?: LngLat;
		padding?: PaddingOptions;
		//
		showTileBoundaries?: boolean;
		// Snippets
		children?: Snippet;
	}

	let {
		map = $bindable(null),
		class: className = '',
		inlineStyle = '',
		interactive = undefined,
		style = { version: 8, sources: {}, layers: [] },
		center = $bindable(undefined),
		zoom = $bindable(undefined),
		pitch = $bindable(undefined),
		bearing = $bindable(undefined),
		roll = $bindable(undefined),
		elevation = $bindable(undefined),
		padding = { top: 0, bottom: 0, left: 0, right: 0 },
		minZoom,
		maxZoom,
		minPitch,
		maxPitch,
		maxBounds,
		attributionControl,
		antialias,
		showTileBoundaries,
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
		if (roll !== undefined) {
			options.roll = roll;
		}
		if (elevation !== undefined) {
			options.elevation = elevation;
		}
		if (maxBounds) {
			options.maxBounds = maxBounds;
		}

		map = new maplibre.Map(options);

		map.on('load', () => {
			mapCtx.map = map;
			loaded = true;
		});

		map.on('move', (ev) => {
			if (map) {
				const tr = map.transform;
				if (!center || center.lat !== tr.center.lat || center.lng !== tr.center.lng) {
					center = tr.center;
				}
				if (tr.zoom !== zoom) {
					zoom = tr.zoom;
				}
				if (tr.bearing !== bearing) {
					bearing = tr.bearing;
				}
				if (tr.pitch !== pitch) {
					pitch = tr.pitch;
				}
				if (tr.roll !== roll) {
					roll = tr.roll;
				}
				if (tr.elevation !== elevation) {
					elevation = tr.elevation;
				}
			}
		});
	});

	$effect(() => resetEventListener(map, 'boxzoomcancel', onboxzoomcancel));
	$effect(() => resetEventListener(map, 'boxzoomend', onboxzoomend));
	$effect(() => resetEventListener(map, 'boxzoomstart', onboxzoomstart));
	$effect(() => resetEventListener(map, 'click', onclick));
	$effect(() => resetEventListener(map, 'contextmenu', oncontextmenu));
	$effect(() => resetEventListener(map, 'cooperativegestureprevented', oncooperativegestureprevented));
	$effect(() => resetEventListener(map, 'data', ondata));
	$effect(() => resetEventListener(map, 'dataabort', ondataabort));
	$effect(() => resetEventListener(map, 'dataloading', ondataloading));
	$effect(() => resetEventListener(map, 'dblclick', ondblclick));
	$effect(() => resetEventListener(map, 'drag', ondrag));
	$effect(() => resetEventListener(map, 'dragend', ondragend));
	$effect(() => resetEventListener(map, 'dragstart', ondragstart));
	$effect(() => resetEventListener(map, 'error', onerror));
	$effect(() => resetEventListener(map, 'idle', onidle));
	$effect(() => resetEventListener(map, 'load', onload));
	$effect(() => resetEventListener(map, 'mousedown', onmousedown));
	$effect(() => resetEventListener(map, 'mousemove', onmousemove));
	$effect(() => resetEventListener(map, 'mouseout', onmouseout));
	$effect(() => resetEventListener(map, 'mouseover', onmouseover));
	$effect(() => resetEventListener(map, 'mouseup', onmouseup));
	$effect(() => resetEventListener(map, 'move', onmove));
	$effect(() => resetEventListener(map, 'moveend', onmoveend));
	$effect(() => resetEventListener(map, 'movestart', onmovestart));
	$effect(() => resetEventListener(map, 'pitch', onpitch));
	$effect(() => resetEventListener(map, 'pitchend', onpitchend));
	$effect(() => resetEventListener(map, 'pitchstart', onpitchstart));
	$effect(() => resetEventListener(map, 'projectiontransition', onprojectiontransition));
	$effect(() => resetEventListener(map, 'remove', onremove));
	$effect(() => resetEventListener(map, 'render', onrender));
	$effect(() => resetEventListener(map, 'resize', onresize));
	$effect(() => resetEventListener(map, 'rotate', onrotate));
	$effect(() => resetEventListener(map, 'rotateend', onrotateend));
	$effect(() => resetEventListener(map, 'rotatestart', onrotatestart));
	$effect(() => resetEventListener(map, 'sourcedata', onsourcedata));
	$effect(() => resetEventListener(map, 'sourcedataabort', onsourcedataabort));
	$effect(() => resetEventListener(map, 'sourcedataloading', onsourcedataloading));
	$effect(() => resetEventListener(map, 'styledata', onstyledata));
	$effect(() => resetEventListener(map, 'styledataloading', onstyledataloading));
	$effect(() => resetEventListener(map, 'styleimagemissing', onstyleimagemissing));
	$effect(() => resetEventListener(map, 'terrain', onterrain));
	$effect(() => resetEventListener(map, 'tiledataloading', ontiledataloading));
	$effect(() => resetEventListener(map, 'touchcancel', ontouchcancel));
	$effect(() => resetEventListener(map, 'touchend', ontouchend));
	$effect(() => resetEventListener(map, 'touchmove', ontouchmove));
	$effect(() => resetEventListener(map, 'touchstart', ontouchstart));
	$effect(() => resetEventListener(map, 'webglcontextlost', onwebglcontextlost));
	$effect(() => resetEventListener(map, 'webglcontextrestored', onwebglcontextrestored));
	$effect(() => resetEventListener(map, 'wheel', onwheel));
	$effect(() => resetEventListener(map, 'zoom', onzoom));
	$effect(() => resetEventListener(map, 'zoomend', onzoomend));
	$effect(() => resetEventListener(map, 'zoomstart', onzoomstart));

	let firstRun = true;

	$effect(() => {
		if (style && !firstRun) {
			mapCtx.setStyle(style);
		}
	});
	$effect(() => {
		maxZoom;
		if (!firstRun) {
			map?.setMaxZoom(maxZoom);
		}
	});
	$effect(() => {
		minZoom;
		if (!firstRun) {
			map?.setMinZoom(minZoom);
		}
	});
	$effect(() => {
		center;
		zoom;
		bearing;
		pitch;
		roll;
		elevation;
		padding;
		if (!firstRun && map) {
			const tr = map._getTransformForUpdate();
			let jumpTo: JumpToOptions = {};
			let changed = false;

			function notAlmostEqual(a: number, b: number) {
				// The globe projection causes rounding errors, so we need to allow for a small difference
				return Math.abs(a - b) > 1e-14;
			}

			if (center && (notAlmostEqual(tr.center.lat, center.lat) || notAlmostEqual(tr.center.lng, center.lng))) {
				jumpTo.center = center;
				changed = true;
			}
			if (zoom !== undefined && notAlmostEqual(tr.zoom, zoom)) {
				jumpTo.zoom = zoom;
				changed = true;
			}
			if (bearing !== undefined && notAlmostEqual(tr.bearing, bearing)) {
				jumpTo.bearing = bearing;
				changed = true;
			}
			if (pitch !== undefined && tr.pitch !== pitch) {
				jumpTo.pitch = pitch;
				changed = true;
			}
			if (roll !== undefined && tr.roll !== roll) {
				jumpTo.roll = roll;
				changed = true;
			}
			if (elevation !== undefined && tr.elevation !== elevation) {
				jumpTo.elevation = elevation;
				changed = true;
			}
			if (padding && !tr.isPaddingEqual(padding)) {
				jumpTo.padding = padding;
				changed = true;
			}

			if (changed) {
				// Temporarily replace `stop` with `_stop(allowGestures: true)` to allow ongoing gestures during `jumpTo`,
				const originalStop = map.stop;
				map.stop = () => map!._stop(true);
				map?.jumpTo(jumpTo, { reactivity: true });
				map.stop = originalStop;
			}
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
		if (map && showTileBoundaries !== undefined) {
			map.showTileBoundaries = showTileBoundaries;
		}
	});

	$effect(() => {
		// TODO: differential update ?
		className;
		const classNames = (className ?? '')?.split(/\s/).filter(Boolean);
		if (container && !firstRun) {
			for (const className of classNames) {
				container.classList.add(className);
			}
		}
		return () => {
			if (container) {
				for (const className of classNames) {
					container.classList.remove(className);
				}
			}
		};
	});

	$effect(() => {
		firstRun = false;
	});

	onDestroy(() => {
		mapCtx.map = null;
		map?.remove();
	});
</script>

<div class={className} style={inlineStyle} bind:this={container}></div>

{#if map && loaded}
	{@render children?.()}
{/if}
