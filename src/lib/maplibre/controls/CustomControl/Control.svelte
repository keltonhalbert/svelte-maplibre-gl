<script lang="ts">
	// https://maplibre.org/maplibre-gl-js/docs/API/interfaces/IControl/

	import { onDestroy, type Snippet } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import { getMapContext } from '../../contexts.svelte.js';

	interface Props {
		position?: maplibregl.ControlPosition;
		control?: maplibregl.IControl;
		children?: Snippet;
	}
	let { position, control, children }: Props = $props();
	if (!control && !children) throw new Error('You must provide either control or children.');

	const mapCtx = getMapContext();
	if (!mapCtx.map) throw new Error('Map instance is not initialized.');

	let el: HTMLDivElement | undefined = $state(undefined);
	if (children) {
		control = {
			onAdd: () => {
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
