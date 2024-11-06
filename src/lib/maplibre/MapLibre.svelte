<script lang="ts">
	import maplibre from 'maplibre-gl';
	import type { MapOptions, MapEventType, AttributionControlOptions, LngLatBoundsLike } from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onDestroy, type Snippet } from 'svelte';
	import { prepareMapContext } from './context.svelte.js';
	import type { LngLat } from './common.js';

	type EventProps = {
		[K in keyof MapEventType as `on${K}`]?: (ev: MapEventType[K]) => void;
	};
	interface Props extends EventProps {
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

	let container: HTMLElement | undefined = $state();
	const mapCtx = prepareMapContext();

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
		...events
	}: Props = $props();

	let loaded = $state(false);

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

		for (const [key, value] of Object.entries(events)) {
			if (key.startsWith('on')) {
				map?.on(key.slice(2), value);
			}
		}

		map.on('move', () => {
			if (map) {
				center = map.getCenter();
				pitch = map.getPitch();
				bearing = map.getBearing();
				zoom = map?.getZoom();
			}
		});
	});

	let firstRun = true;

	$effect(() => {
		style;
		if (!firstRun) {
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
