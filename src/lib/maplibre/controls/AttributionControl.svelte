<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getMapContext } from '../context.svelte.js';
	import type { AttributionControlOptions as ControlOptions, AttributionControl as ControlType } from 'maplibre-gl';
	import maplibregl from 'maplibre-gl';

	const Control = maplibregl.AttributionControl;

	interface Props extends ControlOptions {
		position?: maplibregl.ControlPosition;
	}
	let { position, ...options }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('Map instance is not initialized.');
	}

	let control: ControlType | null = null;
	$effect(() => {
		control && mapCtx.map?.removeControl(control);
		control = new Control($state.snapshot(options));
		mapCtx.map?.addControl(control, position);
	});

	onDestroy(() => {
		if (control) {
			mapCtx.map?.removeControl(control);
		}
	});
</script>
