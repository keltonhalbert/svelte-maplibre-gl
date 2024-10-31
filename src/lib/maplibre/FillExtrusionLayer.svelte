<script lang="ts">
	import { type Snippet } from 'svelte';
	import VectorLayer from './_VectorLayer.svelte';
	import type { FillExtrusionLayerSpecification } from 'maplibre-gl';

	interface Props
		extends Omit<FillExtrusionLayerSpecification, 'source' | 'type' | 'source-layer'> {
		sourceLayer?: FillExtrusionLayerSpecification['source-layer'];
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<VectorLayer type="fill-extrusion" {...props}>
	{@render children?.()}
</VectorLayer>
