<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getMapContext, getSourceContext } from './context.svelte.js';
	import type { TerrainSpecification } from 'maplibre-gl';

	interface Props extends Omit<TerrainSpecification, 'source'> {
		source?: string;
	}
	let { source, ...terrain }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('MapLibre is not initialized');
	}

	// Get source id from source context or props
	const sourceId = $derived(source || getSourceContext().id);

	$effect(() => {
		mapCtx.map?.setTerrain({
			source: sourceId,
			...terrain
		});
	});

	onDestroy(() => {
		mapCtx.map?.setTerrain(null);
	});
</script>
