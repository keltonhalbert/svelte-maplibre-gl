<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { RasterSourceSpecification } from 'maplibre-gl';
	import RawSource from './RawSource.svelte';

	interface Props extends Omit<RasterSourceSpecification, 'type'> {
		id?: string;
		children?: Snippet;
	}
	let { id: _id, children, ...spec }: Props = $props();
</script>

<RawSource spec={{ type: 'raster', ...spec }}>
	{@render children?.()}
</RawSource>
