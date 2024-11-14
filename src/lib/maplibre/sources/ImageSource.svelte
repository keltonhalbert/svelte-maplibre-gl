<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ImageSourceSpecification } from 'maplibre-gl';
	import RawSource from './RawSource.svelte';

	interface Props extends Omit<ImageSourceSpecification, 'type'> {
		id?: string;
		children?: Snippet;
	}
	let { id, children, ...spec }: Props = $props();
</script>

<RawSource {id} spec={{ type: 'image', ...spec }}>
	{@render children?.()}
</RawSource>
