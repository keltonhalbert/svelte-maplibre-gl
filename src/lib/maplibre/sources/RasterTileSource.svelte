<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { RasterSourceSpecification, RasterTileSource } from 'maplibre-gl';
	import RawSource from './RawSource.svelte';

	interface Props extends Omit<RasterSourceSpecification, 'type'> {
		id?: string;
		children?: Snippet;
		source?: RasterTileSource;
	}
	let { id, children, source = $bindable(), ...spec }: Props = $props();
</script>

<RawSource {id} spec={{ type: 'raster', ...spec }} bind:source>
	{@render children?.()}
</RawSource>
