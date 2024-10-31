<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getMapContext } from './context.svelte.js';
	import {
		type GeolocateControlOptions as ControlOptions,
		type GeolocateControl as ControlType
	} from 'maplibre-gl';
	import maplibregl from 'maplibre-gl';

	const Control = maplibregl.GeolocateControl;

	interface Props {
		position?: maplibregl.ControlPosition;
	}
	let { position, ...options }: Props & ControlOptions = $props();

	const { map } = getMapContext();
	if (!map) {
		throw new Error('Map is not initialized');
	}

	let control: ControlType | null = null;
	$effect(() => {
		control && map?.removeControl(control);
		control = new Control(options);
		map.addControl(control, position);
	});

	onDestroy(() => {
		if (control) {
			map?.removeControl(control);
		}
	});
</script>
