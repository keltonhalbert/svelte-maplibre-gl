<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext, prepareSourceContext } from './context.svelte';
	import type { GeoJSONSource, GeoJSONSourceSpecification } from 'maplibre-gl';
	import { generateSourceID } from './utils.js';

	interface Props extends Omit<GeoJSONSourceSpecification, 'type'> {
		id?: string;
		children?: Snippet;
	}

	let { id: _id, children, data, ...sourceSpec }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('MapLibre is not initialized');
	}

	const id = _id || generateSourceID();
	mapCtx.map.addSource(id, { type: 'geojson', data, ...sourceSpec });
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
			// TODO: support diffrential update ? (updateData)
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
