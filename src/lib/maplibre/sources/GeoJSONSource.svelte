<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { GeoJSONSource, GeoJSONSourceSpecification } from 'maplibre-gl';
	import RawSource from './RawSource.svelte';

	interface Props extends Omit<GeoJSONSourceSpecification, 'type'> {
		id?: string;
		source?: GeoJSONSource;
		children?: Snippet;
	}
	let { source = $bindable(undefined), id, children, ...spec }: Props = $props();
</script>

<RawSource {id} bind:source type="geojson" {...spec}>
	{@render children?.()}
</RawSource>
