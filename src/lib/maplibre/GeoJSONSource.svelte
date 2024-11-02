<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext, prepareSourceContext } from './context.svelte';
	import type { GeoJSONSource, GeoJSONSourceSpecification } from 'maplibre-gl';

	interface Props extends Omit<GeoJSONSourceSpecification, 'type'> {
		id: string;
		children?: Snippet;
	}

	let { id, children, data, ...sourceSpec }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('Map is not initialized');
	}

	mapCtx.map.addSource(id, {
		type: 'geojson',
		data,
		...sourceSpec
	});
	const sourceCtx = prepareSourceContext();
	sourceCtx.id = id;

	const source = mapCtx.map.getSource<GeoJSONSource>(id);
	if (!source) {
		throw new Error(`Failed to add source {id}`);
	}

	let firstRun = true;

	$effect(() => {
		data;
		if (!firstRun) {
			source.setData(data);
		}
	});

	$effect(() => {
		firstRun = false;
	});

	onDestroy(() => {
		mapCtx.map?.removeSource(id);
	});
</script>

{#if source}
	{@render children?.()}
{/if}
