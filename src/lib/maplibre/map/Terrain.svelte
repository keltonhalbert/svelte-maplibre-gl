<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getMapContext, getSourceContext } from '../context.svelte.js';
	import type { TerrainSpecification } from 'maplibre-gl';

	interface Props extends Omit<TerrainSpecification, 'source'> {
		source?: string;
	}
	let { source, ...spec }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) throw new Error('Map instance is not initialized.');

	// Get source id from source context or props
	const sourceId = $derived(source ?? getSourceContext().id);

	$effect(() => {
		mapCtx.userTerrain = $state.snapshot({
			...spec,
			source: sourceId
		});
		mapCtx.map?.setTerrain(mapCtx.userTerrain);
	});

	onDestroy(() => {
		mapCtx.userTerrain = undefined;
		mapCtx.map?.setTerrain(mapCtx.baseTerrain ?? null);
	});
</script>
