<script lang="ts">
	import { MapLibre, NavigationControl, ScaleControl } from 'svelte-maplibre-gl';
</script>

<MapLibre
	class="h-[60vh] min-h-[300px]"
	style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
	zoom={2}
	maxPitch={80}
	center={{ lng: 137, lat: 36 }}
>
	<NavigationControl />
	<ScaleControl />
</MapLibre>
