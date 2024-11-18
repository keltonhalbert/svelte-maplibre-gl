<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { VectorTileSource, VectorSourceSpecification } from 'maplibre-gl';
	import RawSource from './RawSource.svelte';

	interface Props extends Omit<VectorSourceSpecification, 'type'> {
		id?: string;
		source?: VectorTileSource;
		children?: Snippet;
	}
	let { source = $bindable(undefined), id, children, ...spec }: Props = $props();
</script>

<RawSource {id} bind:source type="vector" {...spec}>
	{@render children?.()}
</RawSource>
