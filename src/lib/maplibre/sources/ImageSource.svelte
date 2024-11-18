<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ImageSource, ImageSourceSpecification } from 'maplibre-gl';
	import RawSource from './RawSource.svelte';

	interface Props extends Omit<ImageSourceSpecification, 'type'> {
		id?: string;
		source?: ImageSource;
		children?: Snippet;
	}
	let { source = $bindable(undefined), id, children, ...spec }: Props = $props();
</script>

<RawSource {id} bind:source type="image" {...spec}>
	{@render children?.()}
</RawSource>
