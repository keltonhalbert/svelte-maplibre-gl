<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HillshadeLayerSpecification } from 'maplibre-gl';
	import RawLayer from './RawLayer.svelte';
	import type { MapLayerEventProps } from './common.js';

	interface Props
		extends Omit<HillshadeLayerSpecification, 'id' | 'source' | 'type' | 'source-layer'>,
			MapLayerEventProps {
		id?: string;
		sourceLayer?: HillshadeLayerSpecification['source-layer'];
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<RawLayer type="hillshade" {...props}>
	{@render children?.()}
</RawLayer>
