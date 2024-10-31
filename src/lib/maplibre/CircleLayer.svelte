<script lang="ts">
	import { type Snippet } from 'svelte';
	import VectorLayer from './_VectorLayer.svelte';
	import type { CircleLayerSpecification } from 'maplibre-gl';

	interface Props extends Omit<CircleLayerSpecification, 'source' | 'type' | 'source-layer'> {
		sourceLayer?: CircleLayerSpecification['source-layer'];
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<VectorLayer type="circle" {...props}>
	{@render children?.()}
</VectorLayer>
