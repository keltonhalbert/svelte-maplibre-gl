<script lang="ts">
	import { onDestroy } from 'svelte';

	import maplibregl from 'maplibre-gl';

	const { name, loadFn }: { name: string; loadFn: maplibregl.AddProtocolAction } = $props();

	$effect(() => {
		maplibregl.addProtocol(name, loadFn);
		return () => {
			maplibregl.removeProtocol(name);
		};
	});
</script>
