<script lang="ts">
	// https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#addimage

	import { onDestroy } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import { getMapContext } from '../contexts.svelte.js';

	// TODO: support HTMLImageElement | ImageBitmap | ImageData (?)
	interface Props {
		id: string;
		width: number;
		height: number;
		data: Uint8Array | Uint8ClampedArray;
	}

	let { id, width, height, data }: Props = $props();

	const mapCtx = getMapContext();
	let prevId = id;

	$effect(() => {
		if (!mapCtx.map) {
			return;
		}

		let image: maplibregl.StyleImage | undefined = mapCtx.map.getImage(prevId);
		if (image && (id !== prevId || width !== image.data.width || height !== image.data.height)) {
			mapCtx.map?.removeImage(prevId);
			prevId = id;
		}

		if (!image) {
			mapCtx.map.addImage(id, { width, height, data });
		} else {
			mapCtx.map.updateImage(id, { width, height, data });
		}
	});

	onDestroy(() => {
		mapCtx.map?.removeImage(id);
	});
</script>
