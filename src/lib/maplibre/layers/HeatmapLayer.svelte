<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HeatmapLayerSpecification } from 'maplibre-gl';
	import RawLayer from './RawLayer.svelte';
	import type { MapLayerEventProps } from './common.js';

	interface Props
		extends Omit<HeatmapLayerSpecification, 'id' | 'source' | 'type' | 'source-layer'>,
			MapLayerEventProps {
		id?: string;
		sourceLayer?: HeatmapLayerSpecification['source-layer'];
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<RawLayer type="heatmap" {...props}>
	{@render children?.()}
</RawLayer>
