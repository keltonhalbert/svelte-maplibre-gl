<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext, prepareSourceContext } from './context.svelte';
	import type { VectorTileSource } from 'maplibre-gl';

	interface Props {
		id: string;
		tiles: string[];
		minzoom: number;
		maxzoom: number;
		attribution?: string;
		children?: Snippet;
	}

	let { id, tiles, minzoom, maxzoom, attribution, children }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('Map is not initialized');
	}

	mapCtx.map.addSource(id, {
		type: 'vector',
		tiles,
		minzoom,
		maxzoom,
		attribution
	});
	const sourceCtx = prepareSourceContext();
	sourceCtx.id = id;

	const source = mapCtx.map.getSource<VectorTileSource>(id);
	if (!source) {
		throw new Error(`Failed to add source {id}`);
	}

	let firstRun = true; // prevent reactivity on first run

	$effect(() => {
		if (firstRun) {
			return;
		}
		source.setTiles(tiles);
	});
	$effect(() => {
		source.maxzoom = maxzoom;
		source.minzoom = minzoom;
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
