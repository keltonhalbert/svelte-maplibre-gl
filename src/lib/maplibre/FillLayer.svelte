<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { FillLayerSpecification } from 'maplibre-gl';
	import VectorLayer from './_VectorLayer.svelte';

	interface Props extends Omit<FillLayerSpecification, 'id' | 'source' | 'type' | 'source-layer'> {
		id?: string;
		sourceLayer?: FillLayerSpecification['source-layer'];
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<VectorLayer type="fill" {...props}>
	{@render children?.()}
</VectorLayer>
