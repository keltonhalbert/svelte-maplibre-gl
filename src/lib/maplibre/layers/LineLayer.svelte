<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { LineLayerSpecification } from 'maplibre-gl';
	import Layer from './_Layer.svelte';

	interface Props extends Omit<LineLayerSpecification, 'id' | 'source' | 'type' | 'source-layer'> {
		id?: string;
		sourceLayer?: LineLayerSpecification['source-layer'];
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<Layer type="line" {...props}>
	{@render children?.()}
</Layer>
