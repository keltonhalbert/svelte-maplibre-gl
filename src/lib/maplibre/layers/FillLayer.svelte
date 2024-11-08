<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { FillLayerSpecification } from 'maplibre-gl';
	import RawLayer from './RawLayer.svelte';
	import type { MapLayerEventProps } from './common.js';

	interface Props extends Omit<FillLayerSpecification, 'id' | 'source' | 'type' | 'source-layer'>, MapLayerEventProps {
		id?: string;
		sourceLayer?: FillLayerSpecification['source-layer'];
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<RawLayer type="fill" {...props}>
	{@render children?.()}
</RawLayer>
