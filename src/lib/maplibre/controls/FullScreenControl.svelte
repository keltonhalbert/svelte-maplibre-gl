<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getMapContext } from '../context.svelte.js';
	import type { FullscreenControlOptions as ControlOptions, FullscreenControl as ControlType } from 'maplibre-gl';
	import maplibregl from 'maplibre-gl';
	import { resetEventListener } from '../utils.js';
	import type { Listener, Event } from '../common.js';

	const Control = maplibregl.FullscreenControl;

	interface Props extends ControlOptions {
		position?: maplibregl.ControlPosition;
		// Events
		// https://maplibre.org/maplibre-gl-js/docs/API/classes/FullscreenControl/#events
		onfullscreenstart?: Listener<Event<ControlType>>;
		onfullscreenend?: Listener<Event<ControlType>>;
	}
	let { position, onfullscreenstart, onfullscreenend, ...options }: Props & ControlOptions = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) throw new Error('Map instance is not initialized.');

	let control: ControlType | null = null;
	$effect(() => {
		control && mapCtx.map?.removeControl(control);
		control = new Control(options);
		mapCtx.map?.addControl(control, position);
	});

	$effect(() => resetEventListener(control, 'fullscreenstart', onfullscreenstart));
	$effect(() => resetEventListener(control, 'fullscreenend', onfullscreenend));

	onDestroy(() => {
		if (control) {
			mapCtx.map?.removeControl(control);
		}
	});
</script>
