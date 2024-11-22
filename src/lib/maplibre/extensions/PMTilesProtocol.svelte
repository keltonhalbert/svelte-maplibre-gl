<script lang="ts">
	import { Protocol as MapLibreProtocol } from 'svelte-maplibre-gl';
	// @ts-expect-error: Missing types
	import { Protocol } from 'pmtiles';

	let { name = 'pmtiles' }: { name?: string } = $props();

	const protocol = new Protocol();
</script>

<MapLibreProtocol {name} loadFn={protocol.tile} />
