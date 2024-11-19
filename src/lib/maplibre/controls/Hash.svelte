<script lang="ts">
	// FIXME: SvelteKit interoperability

	import { onDestroy } from 'svelte';
	import { getMapContext } from '../contexts.svelte.js';
	import maplibregl from 'maplibre-gl';

	let {}: {} = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) throw new Error('Map instance is not initialized.');

	let hash = new maplibregl.Hash().addTo(mapCtx.map);
	if (!hash._onHashChange()) {
		hash._updateHash();
	}

	onDestroy(() => {
		hash.remove();
	});
</script>
