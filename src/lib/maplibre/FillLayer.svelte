<script lang="ts">
	import { type Snippet } from 'svelte';
	import VectorLayer from './_VectorLayer.svelte';
	import type { FillLayerSpecification } from 'maplibre-gl';

	interface Props extends Omit<FillLayerSpecification, 'source' | 'type' | 'source-layer'> {
		sourceLayer?: FillLayerSpecification['source-layer'];
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<VectorLayer type="fill" {...props}>
	{@render children?.()}
</VectorLayer>
