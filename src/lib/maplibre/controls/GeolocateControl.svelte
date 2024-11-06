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
	if (!mapCtx.map) {
		throw new Error('MapLibre is not initialized');
	}

	let control: ControlType | null = null;
	$effect(() => {
		control && mapCtx.map?.removeControl(control);
		control = new Control($state.snapshot(options) as ControlOptions);
		mapCtx.map?.addControl(control, position);
	});

	$effect(() => resetEventListener(control, ontrackuserlocationstart, 'trackuserlocationstart'));
	$effect(() => resetEventListener(control, ontrackuserlocationend, 'trackuserlocationend'));
	$effect(() => resetEventListener(control, onuserlocationlostfocus, 'userlocationlostfocus'));
	$effect(() => resetEventListener(control, ongeolocate, 'geolocate'));
	$effect(() => resetEventListener(control, onerror, 'error'));
	$effect(() => resetEventListener(control, onoutofmaxbounds, 'outofmaxbounds'));

	onDestroy(() => {
		if (control) {
			mapCtx.map?.removeControl(control);
		}
	});
</script>
