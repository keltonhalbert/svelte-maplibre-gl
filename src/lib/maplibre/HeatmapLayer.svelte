<script lang="ts">
	import { type Snippet } from 'svelte';
	import VectorLayer from './_VectorLayer.svelte';
	import type { HeatmapLayerSpecification } from 'maplibre-gl';

	interface Props extends Omit<HeatmapLayerSpecification, 'source' | 'type' | 'source-layer'> {
		sourceLayer?: HeatmapLayerSpecification['source-layer'];
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<VectorLayer type="heatmap" {...props}>
	{@render children?.()}
</VectorLayer>
