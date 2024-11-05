<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext } from './context.svelte.js';
	import maplibregl from 'maplibre-gl';
	import type { MarkerOptions, Point, Marker, Listener } from 'maplibre-gl';
	import type { LngLat } from './common.js';

	interface Props extends Omit<MarkerOptions, 'className' | 'offset'> {
		lnglat: LngLat;
		offset?: Point;
		class?: string;
		/** HTML content of the marker */
		content?: Snippet;
		children?: Snippet;

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

	let marker: Marker | null = $state.raw(null);

	$effect(() => {
		if (!mapCtx.map) {
			throw new Error('MapLibre is not initialized');
		}

		if (marker) {
			return;
		}

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
			if (!container) {
				throw new Error('Marker container is not initialized');
			}
			options.element = container;
		}

		marker = new maplibregl.Marker(options).setLngLat($state.snapshot(lnglat)).addTo(mapCtx.map);

		marker.on('drag', (e) => {
			if (marker) {
				lnglat = marker.getLngLat();
			}
			if (ondrag) {
				ondrag?.(e);
			}
		});
	});

	let firstRun = true;

	$effect(() => {
		if (ondragstart) {
			marker?.on('dragstart', ondragstart);
			const prevListener = $state.snapshot(ondragstart) as Listener;
			return () => {
				marker?.off('dragstart', prevListener);
			};
		}
	});
	$effect(() => {
		if (ondragend) {
			marker?.on('dragend', ondragend);
			const prevListener = $state.snapshot(ondragend) as Listener;
			return () => {
				marker?.off('dragend', prevListener);
			};
		}
	});

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

	let prevClassNames = (className || '')?.split(/\s/);
	$effect(() => {
		className;
		const classNames = (className || '')?.split(/\s/);
		if (className) {
			for (const prevClassName of prevClassNames) {
				marker?.removeClassName(prevClassName);
			}
			for (const className of classNames) {
				marker?.addClassName(className);
			}
		}
		prevClassNames = classNames;
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
