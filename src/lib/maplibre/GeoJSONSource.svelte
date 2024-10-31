<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext, prepareSourceContext } from './context.svelte';
	import type { GeoJSONSource, GeoJSONSourceSpecification } from 'maplibre-gl';

	interface Props extends Omit<GeoJSONSourceSpecification, 'type'> {
		id: string;
		children?: Snippet;
	}

	let { id, children, ...sourceSpec }: Props = $props();

	const { map } = getMapContext();
	if (!map) {
		throw new Error('Map is not initialized');
	}

	map.addSource(id, {
		type: 'geojson',
		...sourceSpec
	});
	const sourceContext = prepareSourceContext();
	sourceContext.sourceId = id;

	const source = map.getSource(id) as GeoJSONSource;

	// let firstRun = true;

	// $effect(() => {
	// 	if (firstRun) {
	// 		return;
	// 	}

	// 	source.setData(sourceSpec.data);
	// });

	// $effect(() => {
	// 	firstRun = false;
	// });

	onDestroy(() => {
		map?.removeSource(id);
	});
</script>

{#if source}
	{@render children?.()}
{/if}
