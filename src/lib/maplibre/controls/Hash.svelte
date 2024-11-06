<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getMapContext } from '../context.svelte.js';
	import maplibregl from 'maplibre-gl';

	let {}: {} = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('MapLibre is not initialized');
	}

	let hash = new maplibregl.Hash().addTo(mapCtx.map);
	if (!hash._onHashChange()) {
		hash._updateHash();
	}

	onDestroy(() => {
		hash.remove();
	});
</script>
