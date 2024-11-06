<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { HillshadeLayerSpecification } from 'maplibre-gl';
	import Layer from './_Layer.svelte';

	interface Props extends Omit<HillshadeLayerSpecification, 'id' | 'source' | 'type' | 'source-layer'> {
		id?: string;
		sourceLayer?: HillshadeLayerSpecification['source-layer'];
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<Layer type="hillshade" {...props}>
	{@render children?.()}
</Layer>
