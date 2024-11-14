<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { GeoJSONSource, GeoJSONSourceSpecification } from 'maplibre-gl';
	import RawSource from './RawSource.svelte';

	interface Props extends Omit<GeoJSONSourceSpecification, 'type'> {
		id?: string;
		children?: Snippet;
		source?: GeoJSONSource;
	}
	let { id, children, source = $bindable(), ...spec }: Props = $props();
</script>

<RawSource {id} spec={{ type: 'geojson', ...spec }} bind:source>
	{@render children?.()}
</RawSource>
