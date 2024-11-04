<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext } from './context.svelte.js';
	import maplibregl from 'maplibre-gl';
	import type { MarkerOptions, Point } from 'maplibre-gl';
	import type { LngLat } from './common.js';

	interface Props extends Omit<MarkerOptions, 'offset'> {
		lnglat: LngLat;
		offset?: Point;
		content?: Snippet;
		children?: Snippet;
	}

	let {
		lnglat = $bindable(),
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
		...restOptions
	}: Props = $props();

	const mapCtx = getMapContext();

	const options: MarkerOptions = {
		draggable,
		offset,
		opacity,
		opacityWhenCovered,
		rotation,
		color,
		rotationAlignment,
		pitchAlignment,
		subpixelPositioning,
		...restOptions
	};

	function nodeFoo(node: HTMLElement) {
		console.log(node);

		if (!mapCtx.map) {
			throw new Error('MapLibre is not initialized');
		}

		const marker = new maplibregl.Marker(options);
		marker.setLngLat(lnglat);
		marker.addTo(mapCtx.map);

		marker.on('drag', () => {
			lnglat = marker.getLngLat();
		});

		let firstRun = true;

		$effect(() => {
			draggable;
			if (!firstRun) {
				marker.setDraggable(draggable);
			}
		});

		$effect(() => {
			if (lnglat && !firstRun) {
				const prevLnglat = marker.getLngLat();
				if (prevLnglat.lat !== lnglat.lat || prevLnglat.lng !== lnglat.lng) {
					marker.setLngLat(lnglat);
				}
			}
		});

		$effect(() => {
			rotation;
			if (!firstRun) {
				marker.setRotation(rotation);
			}
		});

		$effect(() => {
			if (offset && !firstRun) {
				marker.setOffset(offset);
			}
		});
		$effect(() => {
			opacity;
			opacityWhenCovered;
			if (!firstRun) {
				marker.setOpacity(opacity, opacityWhenCovered);
			}
		});
		$effect(() => {
			if (rotationAlignment && !firstRun) {
				marker.setRotationAlignment(rotationAlignment);
			}
		});
		$effect(() => {
			if (pitchAlignment && !firstRun) {
				marker.setPitchAlignment(pitchAlignment);
			}
		});
		$effect(() => {
			if (subpixelPositioning !== undefined && !firstRun) {
				marker.setSubpixelPositioning(subpixelPositioning);
			}
		});

		$effect(() => {
			firstRun = false;
		});

		onDestroy(() => {
			marker.remove();
		});
	}
</script>

{#if content}
	<div use:nodeFoo>
		{@render content()}
	</div>
{:else}{/if}

{@render children?.()}
