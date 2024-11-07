<script lang="ts">
	import GlobeControl from '$lib/maplibre/controls/GlobeControl.svelte';
	import { MapLibre, NavigationControl, ScaleControl } from 'svelte-maplibre-gl';
</script>

<MapLibre
	class="h-[60vh] min-h-[300px]"
	style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
	zoom={4}
	center={{ lng: 137, lat: 36 }}
>
	<NavigationControl />
	<ScaleControl />
	<GlobeControl />
</MapLibre>
