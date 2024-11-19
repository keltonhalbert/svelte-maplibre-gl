<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getMapContext } from '../contexts.svelte.js';
	import type { ProjectionSpecification } from 'maplibre-gl';

	interface Props extends ProjectionSpecification {}
	let { ...spec }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) throw new Error('Map instance is not initialized.');

	$effect(() => {
		mapCtx.userProjection = $state.snapshot(spec);
		mapCtx.map?.setProjection(mapCtx.userProjection);
	});

	onDestroy(() => {
		mapCtx.userProjection = undefined;
		mapCtx.map?.setProjection(mapCtx.baseProjection ?? { type: 'mercator' });
	});
</script>
