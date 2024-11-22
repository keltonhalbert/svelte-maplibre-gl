<script lang="ts">
	import { onDestroy } from 'svelte';

	import maplibregl from 'maplibre-gl';

	const { name, loadFn }: { name: string; loadFn: maplibregl.AddProtocolAction } = $props();

	$effect(() => {
		maplibregl.addProtocol(name, loadFn); // no error even when already added
	});

	onDestroy(() => {
		maplibregl.removeProtocol(name);
	});
</script>
