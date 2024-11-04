<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { HeatmapLayerSpecification } from 'maplibre-gl';
	import VectorLayer from './_VectorLayer.svelte';

	interface Props
		extends Omit<HeatmapLayerSpecification, 'id' | 'source' | 'type' | 'source-layer'> {
		id?: string;
		sourceLayer?: HeatmapLayerSpecification['source-layer'];
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<VectorLayer type="heatmap" {...props}>
	{@render children?.()}
</VectorLayer>
