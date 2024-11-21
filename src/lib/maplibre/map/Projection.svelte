<script lang="ts">
	// https://maplibre.org/maplibre-style-spec/projection/

	import { onDestroy } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import { getMapContext } from '../contexts.svelte.js';

	interface Props extends maplibregl.ProjectionSpecification {}
	let { ...spec }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) throw new Error('Map instance is not initialized.');

	$effect(() => {
		mapCtx.userProjection = $state.snapshot(spec) as maplibregl.ProjectionSpecification;
		mapCtx.map?.setProjection(mapCtx.userProjection);
	});

	onDestroy(() => {
		mapCtx.userProjection = undefined;
		mapCtx.map?.setProjection(mapCtx.baseProjection ?? { type: 'mercator' });
	});
</script>
