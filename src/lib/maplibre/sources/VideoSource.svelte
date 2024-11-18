<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { VideoSource, VideoSourceSpecification } from 'maplibre-gl';
	import RawSource from './RawSource.svelte';

	interface Props extends Omit<VideoSourceSpecification, 'type'> {
		id?: string;
		source?: VideoSource;
		children?: Snippet;
	}
	let { source = $bindable(undefined), id, children, ...spec }: Props = $props();
</script>

<RawSource {id} bind:source type="video" {...spec}>
	{@render children?.()}
</RawSource>
