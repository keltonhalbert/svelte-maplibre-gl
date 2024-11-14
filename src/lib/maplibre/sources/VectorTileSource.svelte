<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { VectorSourceSpecification, VectorTileSource } from 'maplibre-gl';
	import RawSource from './RawSource.svelte';

	interface Props extends Omit<VectorSourceSpecification, 'type'> {
		id?: string;
		children?: Snippet;
		source?: VectorTileSource;
	}
	let { id, children, source = $bindable(), ...spec }: Props = $props();
</script>

<RawSource {id} spec={{ type: 'vector', ...spec }} bind:source>
	{@render children?.()}
</RawSource>
