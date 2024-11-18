<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { CanvasSource, CanvasSourceSpecification } from 'maplibre-gl';
	import RawSource from './RawSource.svelte';

	interface Props extends Omit<CanvasSourceSpecification, 'type'> {
		id?: string;
		source?: CanvasSource;
		children?: Snippet;
	}
	let { source = $bindable(undefined), id, children, ...spec }: Props = $props();
</script>

<RawSource {id} bind:source type="canvas" {...spec}>
	{@render children?.()}
</RawSource>
