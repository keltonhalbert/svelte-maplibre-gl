<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { GeoJSONSourceSpecification } from 'maplibre-gl';
	import RawSource from './RawSource.svelte';

	interface Props extends Omit<GeoJSONSourceSpecification, 'type'> {
		id?: string;
		children?: Snippet;
	}
	let { id: _id, children, ...spec }: Props = $props();
</script>

<RawSource spec={{ type: 'geojson', ...spec }}>
	{@render children?.()}
</RawSource>
