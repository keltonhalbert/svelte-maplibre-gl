<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { RasterDEMSourceSpecification, RasterDEMTileSource } from 'maplibre-gl';
	import RawSource from './RawSource.svelte';

	interface Props extends Omit<RasterDEMSourceSpecification, 'type'> {
		id?: string;
		children?: Snippet;
		source?: RasterDEMTileSource;
	}
	let { id, children, source = $bindable(), ...spec }: Props = $props();
</script>

<RawSource {id} spec={{ type: 'raster-dem', ...spec }} bind:source>
	{@render children?.()}
</RawSource>
