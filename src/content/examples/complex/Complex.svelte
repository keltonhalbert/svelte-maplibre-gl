<script lang="ts">
	import maplibregl from 'maplibre-gl';
	import MapLibre from '$lib/maplibre/MapLibre.svelte';
	import RasterTileSource from '$lib/maplibre/RasterTileSource.svelte';
	import VectorTileSource from '$lib/maplibre/VectorTileSource.svelte';
	import GeoJSONSource from '$lib/maplibre/GeoJSONSource.svelte';
	import BackgroundLayer from '$lib/maplibre/BackgroundLayer.svelte';
	import RasterLayer from '$lib/maplibre/RasterLayer.svelte';
	import FillLayer from '$lib/maplibre/FillLayer.svelte';
	import LineLayer from '$lib/maplibre/LineLayer.svelte';
	import CircleLayer from '$lib/maplibre/CircleLayer.svelte';
	import FillExtrusionLayer from '$lib/maplibre/FillExtrusionLayer.svelte';
	import NavigationControl from '$lib/maplibre/NavigationControl.svelte';
	import FullScreenControl from '$lib/maplibre/FullScreenControl.svelte';
	import ScaleControl from '$lib/maplibre/ScaleControl.svelte';
	import LogoControl from '$lib/maplibre/LogoControl.svelte';
	import GeolocateControl from '$lib/maplibre/GeolocateControl.svelte';
	import AttributionControl from '$lib/maplibre/AttributionControl.svelte';
	import HeatmapLayer from '$lib/maplibre/HeatmapLayer.svelte';

	let map: maplibregl.Map | null = $state.raw(null);
	let showCities = $state(true);
	let extrude = $state(false);
	let heatmap = $state(false);
	let pointColor = $state('#ffff00');
	let lineColor = $state('#ff00dd');
	let lineWidth = $state(1.5);
	let circleRadius = $state(3);
	let center = $state({ lng: 137.3543, lat: 37.062 });
	let zoom = $state(6.0);
	let pitch = $state(0);
	let bearing = $state(0);
	let controlPosition: maplibregl.ControlPosition = $state('bottom-right');
</script>

<div class="flex items-center gap-x-2 p-1 text-sm">
	<label>
		<input class="rounded border p-1 leading-none" type="checkbox" bind:checked={showCities} />
		Borders
	</label>
	<label>
		<input class="rounded border p-1 leading-none" type="checkbox" bind:checked={extrude} />
		Extrude
	</label>
	<label>
		<input class="rounded border p-1 leading-none" type="checkbox" bind:checked={heatmap} />
		Heatmap
	</label>
	<label>
		pC:
		<input
			type="color"
			bind:value={pointColor}
			class="inline-block w-7 rounded border leading-none"
		/>
	</label>
	<label>
		pR:
		<input
			type="number"
			min="0"
			max="10"
			step="0.5"
			bind:value={circleRadius}
			class="w-12 rounded border p-1 leading-none"
		/>
	</label>
	<label>
		lC:
		<input type="color" bind:value={lineColor} class="w-7 rounded border leading-none" />
	</label>
	<label>
		lW:
		<input
			type="number"
			min="0"
			max="10"
			step="0.5"
			bind:value={lineWidth}
			class="w-12 rounded border p-1 leading-none"
		/>
	</label>
	<label>
		zoom:
		<input
			type="number"
			min="0"
			max="24"
			step="0.5"
			bind:value={zoom}
			class="w-12 rounded border p-1 leading-none"
		/>
	</label>
	<select bind:value={controlPosition}>
		<option value="top-left">top-left</option>
		<option value="top-right">top-right</option>
		<option value="bottom-left">botom-left</option>
		<option value="bottom-right">bottom-right</option>
	</select>
	<button
		class="rounded border p-1 leading-none"
		onclick={() => {
			map?.flyTo({ center: [139.767052, 35.681167], zoom: 15 });
		}}>Fly to</button
	>
</div>
<div class="py-1 text-sm">
	{`lat: ${center.lat.toFixed(3)}, lng: ${center.lng.toFixed(3)}, pitch: ${pitch.toFixed(1)}, bearing: ${bearing.toFixed(1)}`}
</div>

<MapLibre
	class="h-[70vh] min-h-[300px] w-full"
	bind:map
	bind:zoom
	bind:center
	bind:pitch
	bind:bearing
	maxBounds={[
		{ lng: 120, lat: 20 },
		{ lng: 150, lat: 50 }
	]}
	attributionControl={false}
>
	<AttributionControl position={controlPosition} compact={true} />
	<LogoControl position={controlPosition} />
	<ScaleControl position={controlPosition} />
	<FullScreenControl position={controlPosition} />
	<GeolocateControl position={controlPosition} />
	<NavigationControl position={controlPosition} visualizePitch={true} />
	<BackgroundLayer id="background" layout={{}} paint={{ 'background-color': pointColor }} />
	<RasterTileSource
		id="gsi-raster"
		tiles={['https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg']}
		minzoom={2}
		maxzoom={18}
		attribution="国土地理院, TSIC, GEO Grid/AIST, USGS, GEBCO, NASA"
	>
		<RasterLayer id="gsi-raster" />
	</RasterTileSource>
	<GeoJSONSource id="amedas" data="https://jma-assets.mierune.dev/codes/amedas_ame.geojson">
		{#if heatmap}
			<HeatmapLayer
				id="amedas-heatmap"
				paint={{
					// Increase the heatmap weight based on frequency and property magnitude
					'heatmap-weight': 1,
					// Increase the heatmap color weight weight by zoom level
					// heatmap-intensity is a multiplier on top of heatmap-weight
					'heatmap-intensity': ['interpolate', ['exponential', 2], ['zoom'], 0, 0.9, 18, 10],
					// Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
					// Begin color ramp at 0-stop with a 0-transparency color
					// to create a blur-like effect.
					'heatmap-color': [
						'interpolate',
						['linear'],
						['heatmap-density'],
						0,
						'rgba(33,102,172,0)',
						0.2,
						'rgb(103,169,207)',
						0.4,
						'rgb(209,229,240)',
						0.6,
						'rgb(253,219,199)',
						0.7,
						'rgb(239,138,98)',
						0.9,
						'rgb(178,24,43)',
						1,
						'rgb(100,0,200)'
					],
					// Adjust the heatmap radius by zoom level
					'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 8, 18, 20],
					// Transition from heatmap to circle layer by zoom level
					'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 2, 1, 18, 0]
				}}
			/>
		{:else}
			<CircleLayer
				id="amedas-point"
				paint={{ 'circle-radius': circleRadius, 'circle-color': pointColor }}
			/>
		{/if}
	</GeoJSONSource>
	<VectorTileSource
		id="jma"
		tiles={['https://jma-assets.mierune.dev/tiles/mete/{z}/{x}/{y}.pbf']}
		minzoom={0}
		maxzoom={13}
		attribution={'<a href="https://www.data.jma.go.jp/developer/gis.html">気象庁</a>'}
	>
		{#if showCities}
			<LineLayer
				id="jma-city-line"
				sourceLayer="city"
				beforeId="amedas-point"
				layout={{ 'line-join': 'round', 'line-cap': 'round' }}
				paint={{ 'line-color': lineColor, 'line-width': lineWidth }}
			/>
			{#if extrude}
				<FillExtrusionLayer
					id="jma-city-fill-extrusion"
					sourceLayer="city"
					beforeId="amedas-point"
					paint={{
						'fill-extrusion-color': '#555533',
						'fill-extrusion-height': ['/', ['to-number', ['get', 'code']], 100],
						'fill-extrusion-opacity': 0.7
					}}
				/>
			{:else}
				<FillLayer
					id="jma-city-fill"
					sourceLayer="city"
					beforeId="amedas-point"
					paint={{ 'fill-color': '#aaaa33', 'fill-opacity': 0.3 }}
				/>
			{/if}
		{/if}
	</VectorTileSource>
</MapLibre>
