<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getMapContext } from './context.svelte.js';
	import type { ProjectionSpecification } from 'maplibre-gl';

	interface Props extends ProjectionSpecification {}
	let { ...spec }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('MapLibre is not initialized');
	}

	$effect(() => {
		mapCtx.map?.setProjection({
			...spec
		});
	});

	onDestroy(() => {
		mapCtx.map?.setProjection(undefined as unknown as ProjectionSpecification);
	});
</script>
