<script lang="ts">
	import { type Snippet } from 'svelte';
	import VectorLayer from './_VectorLayer.svelte';
	import type { LineLayerSpecification } from 'maplibre-gl';

	interface Props extends Omit<LineLayerSpecification, 'source' | 'type' | 'source-layer'> {
		sourceLayer?: LineLayerSpecification['source-layer'];
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<VectorLayer type="line" {...props}>
	{@render children?.()}
</VectorLayer>
