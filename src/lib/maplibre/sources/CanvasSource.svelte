<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { CanvasSource, CanvasSourceSpecification } from 'maplibre-gl';
	import RawSource from './RawSource.svelte';

	interface Props extends Omit<CanvasSourceSpecification, 'type'> {
		id?: string;
		children?: Snippet;
		source?: CanvasSource;
	}
	let { id, children, source = $bindable(), ...spec }: Props = $props();
</script>

<RawSource {id} spec={{ type: 'canvas', ...spec }} bind:source>
	{@render children?.()}
</RawSource>
