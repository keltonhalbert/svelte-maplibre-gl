<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext, prepareSourceContext } from '../context.svelte.js';
	import { generateSourceID } from '../utils.js';
	import {
		type CanvasSourceSpecification,
		type SourceSpecification,
		type VectorTileSource,
		type RasterTileSource,
		type RasterDEMTileSource,
		type CanvasSource,
		type VideoSource,
		ImageSource,
		GeoJSONSource
	} from 'maplibre-gl';

	type Source =
		| GeoJSONSource
		| CanvasSource
		| VectorTileSource
		| RasterTileSource
		| RasterDEMTileSource
		| CanvasSource
		| ImageSource
		| VideoSource;

	type Specs = SourceSpecification | CanvasSourceSpecification;

	type Props = {
		id?: string;
		source?: Source;
		children?: Snippet;
	} & Specs;
	let { source = $bindable(undefined), id: _id, children, ...spec }: Props = $props();
	spec = spec as Specs;

	const mapCtx = getMapContext();
	if (!mapCtx.map) throw new Error('Map instance is not initialized.');

	const id = _id ?? generateSourceID();
	mapCtx.addSource(id, $state.snapshot(spec) as Specs);
	const sourceCtx = prepareSourceContext();
	sourceCtx.id = id;
	source = mapCtx.map.getSource(id);
	if (!source) throw new Error(`Failed to add source {id}`);

	let firstRun = true;

	$effect(() => {
		if (source && spec.type !== 'canvas' && spec.type !== 'video' && spec.type !== 'image') {
			source.maxzoom = spec.maxzoom ?? 22;
			if (spec.type !== 'geojson') {
				source.minzoom = spec.minzoom ?? 0;
			}
		}
	});
	$effect(() => {
		if (source && (spec.type === 'vector' || spec.type === 'raster' || spec.type === 'raster-dem')) {
			spec.tiles;
			if (!firstRun && 'setTiles' in source) {
				source.setTiles(spec.tiles ?? []);
			}
		}
	});
	$effect(() => {
		if (source && (spec.type === 'vector' || spec.type === 'raster' || spec.type === 'raster-dem')) {
			spec.url;
			if (!firstRun && 'setUrl' in source) {
				source.setUrl(spec.url as string);
			}
		}
	});
	$effect(() => {
		if (source && spec.type === 'image') {
			spec.url;
			if (!firstRun) {
				if (!(source instanceof ImageSource)) throw new Error('Must be ImageSource');
				source.updateImage({ url: spec.url });
			}
		}
	});
	$effect(() => {
		if (source && (spec.type === 'image' || spec.type === 'video' || spec.type === 'canvas')) {
			spec.coordinates;
			if (!firstRun) {
				if (!('setCoordinates' in source)) throw new Error('setCoordinates method is not supported');
				source.setCoordinates(spec.coordinates);
			}
		}
	});
	$effect(() => {
		if (spec.type === 'canvas') {
			spec.animate;
			if (source && spec.animate !== undefined && !firstRun) {
				const cs = source as CanvasSource;
				spec.animate ? cs.play() : cs.pause();
			}
		}
	});
	$effect(() => {
		if (source && spec.type === 'geojson') {
			if (!(source instanceof GeoJSONSource)) throw new Error('Must be GeoJSONSource');
			spec.data;
			if (!firstRun) {
				// TODO: support diffrential update ? (updateData)
				source.setData(spec.data);
			}
		}
	});
	$effect(() => {
		if (source && spec.type === 'geojson') {
			if (!(source instanceof GeoJSONSource)) throw new Error('Must be GEOJSONSource');
			spec.cluster;
			spec.clusterMaxZoom;
			spec.clusterRadius;
			if (!firstRun) {
				if (spec.clusterRadius !== undefined) {
					source.workerOptions.superclusterOptions!.radius = spec.clusterRadius * (8192 / source.tileSize);
				}
				source.setClusterOptions({
					cluster: spec.cluster,
					clusterMaxZoom: spec.clusterMaxZoom
					// clusterRadius: spec.clusterRadius, // TODO: Requires a fix in maplibre-gl-js
				});
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
