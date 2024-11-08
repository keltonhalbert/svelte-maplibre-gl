<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LineLayerSpecification } from 'maplibre-gl';
	import RawLayer from './RawLayer.svelte';
	import type { MapLayerEventProps } from './common.js';

	interface Props extends Omit<LineLayerSpecification, 'id' | 'source' | 'type' | 'source-layer'>, MapLayerEventProps {
		id?: string;
		sourceLayer?: LineLayerSpecification['source-layer'];
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<RawLayer type="line" {...props}>
	{@render children?.()}
</RawLayer>
