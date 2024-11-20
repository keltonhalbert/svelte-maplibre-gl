<script lang="ts">
	// https://maplibre.org/maplibre-gl-js/docs/API/interfaces/IControl/

	import { onDestroy } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import { getMapContext } from '../../contexts.svelte.js';
	import type { Snippet } from 'svelte';

	interface Props {
		position?: maplibregl.ControlPosition;
		control?: maplibregl.IControl;
		children?: Snippet;
	}
	let { position, control, children }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) throw new Error('Map instance is not initialized.');

	if (!control && !children) throw new Error('You must provide either control or children.');

	let el: HTMLDivElement | undefined = $state(undefined);
	if (children) {
		control = {
			onAdd: (_: maplibregl.Map) => {
				return el!;
			},
			onRemove: () => {
				el?.parentNode?.removeChild(el);
			}
		};
	}

	$effect(() => {
		if (control) {
			mapCtx.map?.removeControl(control);
			mapCtx.map?.addControl(control, position);
		}
	});

	onDestroy(() => {
		if (control) {
			mapCtx.map?.removeControl(control);
		}
	});
</script>

<div bind:this={el} class="maplibregl-ctrl">
	{@render children?.()}
</div>
