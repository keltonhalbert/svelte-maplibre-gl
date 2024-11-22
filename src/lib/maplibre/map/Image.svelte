<script lang="ts">
	// https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#addimage

	import { onDestroy } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import { getMapContext } from '../contexts.svelte.js';

	interface Props {
		id: string;
		image:
			| HTMLImageElement
			| ImageBitmap
			| ImageData
			| { width: number; height: number; data: Uint8Array | Uint8ClampedArray }
			| maplibregl.StyleImageInterface;
	}

	let { id, image: srcImage }: Props = $props();

	const mapCtx = getMapContext();
	let prevId = id;

	$effect(() => {
		if (!mapCtx.map) {
			return;
		}

		// Remove previous image if id or dimensions have changed
		let prevImage: maplibregl.StyleImage | undefined = mapCtx.map.getImage(prevId);
		if (
			prevImage &&
			(id !== prevId || srcImage.width !== prevImage.data.width || srcImage.height !== prevImage.data.height)
		) {
			mapCtx.map?.removeImage(prevId);
			prevId = id;
		}

		if (!prevImage) {
			mapCtx.map.addImage(id, srcImage);
		} else {
			mapCtx.map.updateImage(id, srcImage);
		}
	});

	onDestroy(() => {
		mapCtx.map?.removeImage(id);
	});
</script>
