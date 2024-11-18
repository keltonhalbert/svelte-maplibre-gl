<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { RasterDEMTileSource, RasterDEMSourceSpecification } from 'maplibre-gl';
	import RawSource from './RawSource.svelte';

	interface Props extends Omit<RasterDEMSourceSpecification, 'type'> {
		id?: string;
		source?: RasterDEMTileSource;
		children?: Snippet;
	}
	let { source = $bindable(undefined), id, children, ...spec }: Props = $props();
</script>

<RawSource {id} bind:source type="raster-dem" {...spec}>
	{@render children?.()}
</RawSource>
