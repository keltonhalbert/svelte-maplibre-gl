<script lang="ts">
	import maplibregl from 'maplibre-gl';

	const { name, loadFn }: { name: string; loadFn: maplibregl.AddProtocolAction } = $props();

	$effect(() => {
		maplibregl.addProtocol(name, loadFn);
		const prevName = name;
		return () => {
			maplibregl.removeProtocol(prevName);
		};
	});
</script>
