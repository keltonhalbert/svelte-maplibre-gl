<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { RasterDEMSourceSpecification } from 'maplibre-gl';
	import RawSource from './RawSource.svelte';

	interface Props extends Omit<RasterDEMSourceSpecification, 'type'> {
		id?: string;
		children?: Snippet;
	}
	let { id: _id, children, ...spec }: Props = $props();
</script>

<RawSource spec={{ type: 'raster-dem', ...spec }}>
	{@render children?.()}
</RawSource>
