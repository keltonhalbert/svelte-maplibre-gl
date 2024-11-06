<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { FillExtrusionLayerSpecification } from 'maplibre-gl';
	import Layer from './_Layer.svelte';

	interface Props extends Omit<FillExtrusionLayerSpecification, 'id' | 'source' | 'type' | 'source-layer'> {
		id?: string;
		sourceLayer?: FillExtrusionLayerSpecification['source-layer'];
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<Layer type="fill-extrusion" {...props}>
	{@render children?.()}
</Layer>
