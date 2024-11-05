<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getMapContext } from './context.svelte.js';
	import type { LightSpecification } from 'maplibre-gl';

	let { ...spec }: LightSpecification = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('MapLibre is not initialized');
	}

	const prevLight = mapCtx.map.getLight();

	$effect(() => {
		mapCtx.map?.setLight({
			...spec
		});
	});

	onDestroy(() => {
		mapCtx.map?.setLight(prevLight || {});
	});
</script>
