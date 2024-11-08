<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { VectorSourceSpecification } from 'maplibre-gl';
	import RawSource from './RawSource.svelte';

	interface Props extends Omit<VectorSourceSpecification, 'type'> {
		id?: string;
		children?: Snippet;
	}
	let { id: _id, children, ...spec }: Props = $props();
</script>

<RawSource spec={{ type: 'vector', ...spec }}>
	{@render children?.()}
</RawSource>
