<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getMapContext } from '../context.svelte.js';
	import type { SkySpecification } from 'maplibre-gl';

	let { ...spec }: SkySpecification = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('MapLibre is not initialized');
	}

	$effect(() => {
		mapCtx.userSky = spec;
		mapCtx.map?.setSky(mapCtx.userSky);
	});

	onDestroy(() => {
		mapCtx.userSky = undefined;
		mapCtx.map?.setSky(mapCtx.baseSky || {});
	});
</script>
