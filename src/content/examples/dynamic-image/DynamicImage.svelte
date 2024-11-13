<script lang="ts">
	import { MapLibre, Image, GeoJSONSource, SymbolLayer } from 'svelte-maplibre-gl';

	const size = 64; // The image will be 64 pixels square
	const bytesPerPixel = 4; // Each pixel is represented by 4 bytes: red, green, blue, and alpha.
	const data = new Uint8Array(size * size * bytesPerPixel);

	for (let x = 0; x < size; x++) {
		for (let y = 0; y < size; y++) {
			const offset = (y * size + x) * bytesPerPixel;
			data[offset + 0] = (y / size) * 255; // red
			data[offset + 1] = (x / size) * 255; // green
			data[offset + 2] = 128; // blue
			data[offset + 3] = 255; // alpha
		}
	}
</script>

<MapLibre
	class="h-[60vh] min-h-[300px]"
	style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
	zoom={4}
	center={{ lng: 137, lat: 36 }}
>
	<Image id="gradient" width={size} height={size} {data} />
	<GeoJSONSource
		data={{
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [137, 36]
					},
					properties: {}
				}
			]
		}}
	>
		<SymbolLayer layout={{ 'icon-image': 'gradient' }} />
	</GeoJSONSource>
</MapLibre>
