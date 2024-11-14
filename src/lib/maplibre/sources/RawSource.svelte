<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext, prepareSourceContext } from '../context.svelte.js';
	import { generateSourceID } from '../utils.js';
	import type {
		SourceSpecification,
		GeoJSONSource,
		VectorTileSource,
		RasterTileSource,
		RasterDEMTileSource,
		VideoSource,
		ImageSource
	} from 'maplibre-gl';

	type SourceTypes =
		| GeoJSONSource
		| VectorTileSource
		| RasterTileSource
		| RasterDEMTileSource
		| VideoSource
		| ImageSource;

	type Props = {
		id?: string;
		children?: Snippet;
		spec: SourceSpecification;
	};
	let { id: _id, children, spec }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('Map instance is not initialized.');
	}

	const id = _id ?? generateSourceID();
	mapCtx.addSource(id, $state.snapshot(spec) as SourceSpecification);
	const sourceCtx = prepareSourceContext();
	sourceCtx.id = id;
	const source: SourceTypes | undefined = mapCtx.map.getSource(id);
	if (!source) {
		throw new Error(`Failed to add source {id}`);
	}

	let firstRun = true;

	$effect(() => {
		if (spec.type !== 'image' && spec.type !== 'video') {
			source.maxzoom = spec.maxzoom ?? 22;
			if (spec.type !== 'geojson') {
				source.minzoom = spec.minzoom ?? 0;
			}
		}
	});
	$effect(() => {
		if (spec.type !== 'geojson' && spec.type !== 'image' && spec.type !== 'video') {
			if (!('setTiles' in source)) {
				throw new Error('setTiles not in source');
			}
			spec.tiles;
			if (!firstRun) {
				source.setTiles(spec.tiles ?? []);
			}
		}
	});
	$effect(() => {
		if (spec.type !== 'geojson' && spec.type !== 'image' && spec.type !== 'video') {
			if (!('setUrl' in source)) {
				throw new Error('setUrl not in source');
			}
			spec.url;
			if (!firstRun) {
				source.setUrl(spec.url as string);
			}
		}
	});
	$effect(() => {
		if (spec.type === 'geojson') {
			spec.data;
			if (!('setData' in source)) {
				throw new Error('setData not in source');
			}
			if (!firstRun) {
				// TODO: support diffrential update ? (updateData)
				source.setData(spec.data);
			}
		}
	});
	$effect(() => {
		if (spec.type === 'geojson') {
			spec.cluster;
			spec.clusterMaxZoom;
			spec.clusterRadius;
			if (!('setClusterOptions' in source)) {
				throw new Error('setClusterOptions not in source');
			}
			if (!firstRun) {
				source.setClusterOptions({
					cluster: spec.cluster,
					clusterMaxZoom: spec.clusterMaxZoom,
					clusterRadius: spec.clusterRadius
				});
			}
		}
	});
	$effect(() => {
		if (spec.type === 'image') {
			spec.url;
			if (source.type !== 'image') {
				throw new Error('ImageSource is expected');
			}
			if (!firstRun) {
				source.updateImage({
					url: spec.url as string
				});
			}
		}
	});
	$effect(() => {
		if (spec.type === 'image') {
			spec.coordinates;
			if (source.type !== 'image') {
				throw new Error('ImageSource is expected');
			}
			if (!firstRun) {
				source.setCoordinates(spec.coordinates);
			}
		}
	});

	$effect(() => {
		firstRun = false;
	});

	onDestroy(() => {
		mapCtx.removeSource(id);
	});
</script>

{#if source}
	{@render children?.()}
{/if}
