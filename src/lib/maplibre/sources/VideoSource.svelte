<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { VideoSource, VideoSourceSpecification } from 'maplibre-gl';
	import RawSource from './RawSource.svelte';

	interface Props extends Omit<VideoSourceSpecification, 'type'> {
		id?: string;
		children?: Snippet;
		source?: VideoSource;
	}
	let { id, children, source = $bindable(), ...spec }: Props = $props();
</script>

<RawSource {id} spec={{ type: 'video', ...spec }} bind:source>
	{@render children?.()}
</RawSource>
