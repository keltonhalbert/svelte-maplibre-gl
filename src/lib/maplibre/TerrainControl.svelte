<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getMapContext, getSourceContext } from './context.svelte.js';
	import type { TerrainSpecification, TerrainControl } from 'maplibre-gl';
	import maplibregl from 'maplibre-gl';

	interface Props extends Omit<TerrainSpecification, 'source'> {
		source?: string;
		position?: maplibregl.ControlPosition;
	}
	let { position, source, ...restOptions }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('MapLibre is not initialized');
	}

	const options = $derived({
		source: source || getSourceContext().id,
		...restOptions
	});

	let control: TerrainControl | null = null;
	$effect(() => {
		if (control) {
			mapCtx.map?.removeControl(control);
		}
		control = new maplibregl.TerrainControl(options);
		mapCtx.map?.addControl(control, position);
	});

	onDestroy(() => {
		if (control) {
			mapCtx.map?.removeControl(control);
		}
	});
</script>
