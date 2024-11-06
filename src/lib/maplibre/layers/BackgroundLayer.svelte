<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { BackgroundLayerSpecification } from 'maplibre-gl';
	import Layer from './_Layer.svelte';

	interface Props extends Omit<BackgroundLayerSpecification, 'id' | 'source' | 'type'> {
		id?: string;
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<Layer type="background" {...props}>
	{@render children?.()}
</Layer>
