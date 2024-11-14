<script lang="ts">
	// https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker/

	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext, prepareMarkerContext } from '../context.svelte.js';
	import maplibregl from 'maplibre-gl';
	import type { MarkerOptions, Marker, Listener } from 'maplibre-gl';
	import type { LngLat } from '../common.js';
	import { resetEventListener } from '../utils.js';

	interface Props extends Omit<MarkerOptions, 'className'> {
		lnglat: LngLat;
		class?: string;
		/** HTML content of the marker */
		content?: Snippet;
		children?: Snippet;
		// Events
		// https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker/#events
		ondrag?: Listener;
		ondragstart?: Listener;
		ondragend?: Listener;
	}

	let container = $state<HTMLElement | null>(null);

	let {
		lnglat = $bindable(),
		class: className = undefined,
		draggable,
		rotation,
		rotationAlignment,
		pitchAlignment,
		opacity,
		color,
		opacityWhenCovered,
		offset,
		subpixelPositioning,
		content,
		children,
		ondrag,
		ondragstart,
		ondragend,
		...restOptions
	}: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) throw new Error('Map instance is not initialized.');

	let marker: Marker | null = $state.raw(null);

	const markerCtx = prepareMarkerContext();

	$effect(() => {
		if (marker) {
			return;
		}
		if (!mapCtx.map) throw new Error('MapLibre is not initialized');

		const options: MarkerOptions = {
			draggable,
			offset,
			opacity,
			className,
			opacityWhenCovered,
			rotation,
			color,
			rotationAlignment,
			pitchAlignment,
			subpixelPositioning,
			...restOptions
		};

		if (content) {
			if (!container) throw new Error('Marker container is not initialized');
			options.element = container;
		}

		marker = new maplibregl.Marker(options);
		markerCtx.marker = marker;

		marker.setLngLat($state.snapshot(lnglat)).addTo(mapCtx.map);

		marker.on('drag', (e) => {
			if (marker) {
				lnglat = marker.getLngLat();
			}
			ondrag?.(e);
		});
	});

	let firstRun = true;

	$effect(() => resetEventListener(marker, 'dragstart', ondragstart));
	$effect(() => resetEventListener(marker, 'dragend', ondragend));

	$effect(() => {
		draggable;
		if (!firstRun) {
			marker?.setDraggable(draggable);
		}
	});

	$effect(() => {
		if (lnglat && !firstRun) {
			const prevLnglat = marker?.getLngLat();
			if (prevLnglat && (prevLnglat.lat !== lnglat.lat || prevLnglat.lng !== lnglat.lng)) {
				marker?.setLngLat(lnglat);
			}
		}
	});

	$effect(() => {
		rotation;
		if (!firstRun) {
			marker?.setRotation(rotation);
		}
	});

	$effect(() => {
		if (offset && !firstRun) {
			marker?.setOffset(offset);
		}
	});
	$effect(() => {
		opacity;
		opacityWhenCovered;
		if (!firstRun) {
			marker?.setOpacity(opacity, opacityWhenCovered);
		}
	});
	$effect(() => {
		if (rotationAlignment && !firstRun) {
			marker?.setRotationAlignment(rotationAlignment);
		}
	});
	$effect(() => {
		if (pitchAlignment && !firstRun) {
			marker?.setPitchAlignment(pitchAlignment);
		}
	});
	$effect(() => {
		if (subpixelPositioning !== undefined && !firstRun) {
			marker?.setSubpixelPositioning(subpixelPositioning);
		}
	});

	$effect(() => {
		// TODO: differential update ?
		const classNames = (className ?? '')?.split(/\s/).filter(Boolean);
		if (marker && !firstRun) {
			for (const className of classNames) {
				marker.addClassName(className);
			}
		}
		return () => {
			if (marker) {
				for (const className of classNames) {
					marker.removeClassName(className);
				}
			}
		};
	});

	$effect(() => {
		firstRun = false;
	});

	onDestroy(() => {
		marker?.remove();
	});
</script>

{#if content}
	<div bind:this={container}>
		{@render content()}
	</div>
{:else}{/if}

{@render children?.()}
