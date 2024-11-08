<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { BackgroundLayerSpecification } from 'maplibre-gl';
	import RawLayer from './RawLayer.svelte';
	import type { MapLayerEventProps } from './common.js';

	interface Props extends Omit<BackgroundLayerSpecification, 'id' | 'source' | 'type'>, MapLayerEventProps {
		id?: string;
		beforeId?: string;
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<RawLayer type="background" {...props}>
	{@render children?.()}
</RawLayer>
