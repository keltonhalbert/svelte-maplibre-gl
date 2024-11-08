<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { RasterLayerSpecification } from 'maplibre-gl';
	import RawLayer from './RawLayer.svelte';
	import type { MapLayerEventProps } from './common.js';

	interface Props
		extends Omit<RasterLayerSpecification, 'id' | 'source' | 'type' | 'source-layer'>,
			MapLayerEventProps {
		id?: string;
		sourceLayer?: RasterLayerSpecification['source-layer'];
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<RawLayer type="raster" {...props}>
	{@render children?.()}
</RawLayer>
