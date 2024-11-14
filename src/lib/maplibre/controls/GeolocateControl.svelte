<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getMapContext } from '../context.svelte.js';
	import type { GeolocateControlOptions as ControlOptions, GeolocateControl as ControlType } from 'maplibre-gl';
	import maplibregl from 'maplibre-gl';
	import { resetEventListener } from '../utils.js';
	import type { Listener, Event } from '../common.js';

	const Control = maplibregl.GeolocateControl;
	type GeolocateEvent = Event<ControlType> & Object;

	interface Props extends ControlOptions {
		position?: maplibregl.ControlPosition;
		// Events
		// https://maplibre.org/maplibre-gl-js/docs/API/classes/GeolocateControl/#events
		ontrackuserlocationend?: Listener<GeolocateEvent>;
		ontrackuserlocationstart?: Listener<GeolocateEvent>;
		onuserlocationlostfocus?: Listener<GeolocateEvent>;
		onuserlocationfocus?: Listener<GeolocateEvent>;
		ongeolocate?: Listener<GeolocateEvent & GeolocationPosition>;
		onerror?: Listener<GeolocateEvent & GeolocationPositionError>;
		onoutofmaxbounds?: Listener<GeolocateEvent & GeolocationPosition>;
	}
	let {
		position,
		ontrackuserlocationend,
		ontrackuserlocationstart,
		onuserlocationlostfocus,
		onuserlocationfocus,
		ongeolocate,
		onerror,
		onoutofmaxbounds,
		...options
	}: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) throw new Error('Map instance is not initialized.');

	let control: ControlType | null = null;
	$effect(() => {
		control && mapCtx.map?.removeControl(control);
		control = new Control(options);
		mapCtx.map?.addControl(control, position);
	});

	$effect(() => resetEventListener(control, 'trackuserlocationstart', ontrackuserlocationstart));
	$effect(() => resetEventListener(control, 'trackuserlocationend', ontrackuserlocationend));
	$effect(() => resetEventListener(control, 'userlocationlostfocus', onuserlocationlostfocus));
	$effect(() => resetEventListener(control, 'geolocate', ongeolocate));
	$effect(() => resetEventListener(control, 'error', onerror));
	$effect(() => resetEventListener(control, 'outofmaxbounds', onoutofmaxbounds));

	onDestroy(() => {
		if (control) {
			mapCtx.map?.removeControl(control);
		}
	});
</script>
