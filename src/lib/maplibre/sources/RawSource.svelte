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
		ImageSource,
		CanvasSource,
		CanvasSourceSpecification
	} from 'maplibre-gl';

	type SourceTypes =
		| GeoJSONSource
		| VectorTileSource
		| RasterTileSource
		| RasterDEMTileSource
		| VideoSource
		| ImageSource
		| CanvasSource;

	type Props = {
		source?: SourceTypes;
		id?: string;
		children?: Snippet;
		spec: SourceSpecification | CanvasSourceSpecification;
	};
	let { source = $bindable(undefined), id: _id, children, spec }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) throw new Error('Map instance is not initialized.');

	const id = _id ?? generateSourceID();
	mapCtx.addSource(id, $state.snapshot(spec) as SourceSpecification | CanvasSourceSpecification);
	const sourceCtx = prepareSourceContext();
	sourceCtx.id = id;
	source = mapCtx.map.getSource(id);
	if (!source) throw new Error(`Failed to add source {id}`);

	let firstRun = true;

	const notRaster = spec.type !== 'image' && spec.type !== 'video' && spec.type !== 'canvas';

	$effect(() => {
		if (source && notRaster) {
			``;
			source.maxzoom = spec.maxzoom ?? 22;
			if (spec.type !== 'geojson') {
				source.minzoom = spec.minzoom ?? 0;
			}
		}
	});
	$effect(() => {
		if (source && spec.type !== 'geojson' && notRaster) {
			if (!('setTiles' in source)) throw new Error('setTiles not in source');
			spec.tiles;
			if (!firstRun) {
				source.setTiles(spec.tiles ?? []);
			}
		}
	});
	$effect(() => {
		if (source && spec.type !== 'geojson' && notRaster) {
			if (!('setUrl' in source)) throw new Error('setUrl not in source');
			spec.url;
			if (!firstRun) {
				source.setUrl(spec.url as string);
			}
		}
	});
	$effect(() => {
		if (source && spec.type === 'geojson') {
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
		if (source && spec.type === 'geojson') {
			spec.cluster;
			spec.clusterMaxZoom;
			spec.clusterRadius;
			if (!('setClusterOptions' in source)) throw new Error('setClusterOptions not in source');
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
		if (source && spec.type === 'image') {
			spec.url;
			if (source.type !== 'image') throw new Error('ImageSource is expected');
			if (!firstRun) {
				source.updateImage({
					url: spec.url as string
				});
			}
		}
	});
	$effect(() => {
		if (source && (spec.type === 'image' || spec.type === 'video')) {
			spec.coordinates;
			if (source.type !== 'image' && source.type !== 'video') throw new Error('ImageSource is expected');
			if (!firstRun) {
				source.setCoordinates(spec.coordinates);
			}
		}
	});
	$effect(() => {
		if (source && spec.type === 'canvas') {
			spec.animate;
			if (spec.animate !== undefined && !firstRun) {
				const cs = source as CanvasSource;
				spec.animate ? cs.play() : cs.pause();
			}
		}
	});

	$effect(() => {
		firstRun = false;
	});

	onDestroy(() => {
		mapCtx.removeSource(id);
		source = undefined;
	});
</script>

{#if source}
	{@render children?.()}
{/if}
