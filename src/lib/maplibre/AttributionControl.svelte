<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getMapContext } from './context.svelte.js';
	import {
		type AttributionControlOptions as ControlOptions,
		type AttributionControl as ControlType
	} from 'maplibre-gl';
	import maplibregl from 'maplibre-gl';

	const Control = maplibregl.AttributionControl;

	interface Props {
		position?: maplibregl.ControlPosition;
	}
	let { position, ...options }: Props & ControlOptions = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) {
		throw new Error('Map is not initialized');
	}

	let control: ControlType | null = null;
	$effect(() => {
		control && mapCtx.map?.removeControl(control);
		control = new Control(options);
		mapCtx.map?.addControl(control, position);
	});

	onDestroy(() => {
		if (control) {
			mapCtx.map?.removeControl(control);
		}
	});
</script>
