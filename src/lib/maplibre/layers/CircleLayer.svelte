<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { CircleLayerSpecification } from 'maplibre-gl';
	import RawLayer from './RawLayer.svelte';
	import type { MapLayerEventProps } from './common.js';

	interface Props
		extends Omit<CircleLayerSpecification, 'id' | 'source' | 'type' | 'source-layer'>,
			MapLayerEventProps {
		id?: string;
		sourceLayer?: CircleLayerSpecification['source-layer'];
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<RawLayer type="circle" {...props}>
	{@render children?.()}
</RawLayer>
