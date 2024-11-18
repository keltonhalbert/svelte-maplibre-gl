<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { RasterTileSource, RasterSourceSpecification } from 'maplibre-gl';
	import RawSource from './RawSource.svelte';

	interface Props extends Omit<RasterSourceSpecification, 'type'> {
		id?: string;
		source?: RasterTileSource;
		children?: Snippet;
	}
	let { source = $bindable(undefined), id, children, ...spec }: Props = $props();
</script>

<RawSource {id} bind:source type="raster" {...spec}>
	{@render children?.()}
</RawSource>
