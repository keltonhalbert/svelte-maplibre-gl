<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getMapContext } from './context.svelte.js';
	import type { LightSpecification } from 'maplibre-gl';

	let { ...spec }: LightSpecification = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('MapLibre is not initialized');
	}

	$effect(() => {
		mapCtx.userLight = spec;
		mapCtx.map?.setLight(mapCtx.userLight);
	});

	onDestroy(() => {
		mapCtx.userLight = undefined;
		mapCtx.map?.setLight(mapCtx.baseLight || {});
	});
</script>
