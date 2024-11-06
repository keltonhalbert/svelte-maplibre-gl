<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { CircleLayerSpecification } from 'maplibre-gl';
	import Layer from './_Layer.svelte';

	interface Props extends Omit<CircleLayerSpecification, 'id' | 'source' | 'type' | 'source-layer'> {
		id?: string;
		sourceLayer?: CircleLayerSpecification['source-layer'];
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<Layer type="circle" {...props}>
	{@render children?.()}
</Layer>
