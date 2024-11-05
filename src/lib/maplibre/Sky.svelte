<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getMapContext } from './context.svelte.js';
	import type { SkySpecification } from 'maplibre-gl';

	let { ...spec }: SkySpecification = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('MapLibre is not initialized');
	}

	const prevSky = mapCtx.map.getSky();

	$effect(() => {
		mapCtx.map?.setSky({
			...spec
		});
	});

	onDestroy(() => {
		mapCtx.map?.setSky(prevSky);
	});
</script>
