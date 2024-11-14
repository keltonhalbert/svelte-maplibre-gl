<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getMapContext } from '../context.svelte.js';
	import type { GlobeControl as ControlType } from 'maplibre-gl';
	import maplibregl from 'maplibre-gl';

	const Control = maplibregl.GlobeControl;

	interface Props {
		position?: maplibregl.ControlPosition;
	}
	let { position }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) throw new Error('Map instance is not initialized.');

	let control: ControlType | null = null;
	$effect(() => {
		control && mapCtx.map?.removeControl(control);
		control = new Control();
		mapCtx.map?.addControl(control, position);
	});

	onDestroy(() => {
		if (control) {
			mapCtx.map?.removeControl(control);
		}
	});
</script>
