<script lang="ts">
	import maplibregl from 'maplibre-gl';
	import Map from '$lib/maplibre/Map.svelte';
	import RasterTileSource from '$lib/maplibre/RasterTileSource.svelte';
	import VectorTileSource from '$lib/maplibre/VectorTileSource.svelte';
	import GeoJSONSource from '$lib/maplibre/GeoJSONSource.svelte';
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

	let container: HTMLElement | undefined = $state();
	let map: maplibregl.Map | null = $state.raw(null);
	let showCities = $state(true);
	let extrude = $state(false);
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

<div class="grid grid-cols-[1fr_220px] gap-x-10">
	<div class="w-full min-w-0">
		<h1 class="mb-2 text-3xl font-bold">Complex</h1>

		<p class="mb-4 text-zinc-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</p>

		<div class="flex items-center gap-x-2 p-1 text-sm">
			<button
				class="rounded border p-1 leading-none"
				onclick={() => {
					if (map) {
						map.flyTo({ center: [139.767052, 35.681167], zoom: 15 });
					}
				}}>Fly to</button
			>

			<label>
				Borders:
				<input class="rounded border p-1 leading-none" type="checkbox" bind:checked={showCities} />
			</label>

			<label>
				Extrude:
				<input class="rounded border p-1 leading-none" type="checkbox" bind:checked={extrude} />
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
		</div>
		<div class="py-1 text-sm">
			{`lat: ${center.lat.toFixed(3)}, lng: ${center.lng.toFixed(3)}, pitch: ${pitch.toFixed(1)}, bearing: ${bearing.toFixed(1)}`}
		</div>
		<div class="h-[70vh] min-h-[300px] w-full" bind:this={container}></div>

		<h2 class="mb-2 mt-8 scroll-m-20 text-3xl font-bold" id="section">Section</h2>

		<p class="mb-4 text-zinc-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</p>
		<p class="mb-4 text-zinc-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</p>
		<p class="mb-4 text-zinc-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</p>
		<p class="mb-4 text-zinc-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</p>
		<p class="mb-4 text-zinc-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</p>
		<p class="mb-4 text-zinc-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</p>
		<p class="mb-4 text-zinc-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</p>
		<p class="mb-4 text-zinc-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</p>
		<p class="mb-4 text-zinc-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</p>
		<p class="mb-4 text-zinc-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</p>
		<p class="mb-4 text-zinc-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</p>
		<p class="mb-4 text-zinc-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</p>
		<p class="mb-4 text-zinc-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</p>
		<p class="mb-4 text-zinc-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</p>
		<p class="mb-4 text-zinc-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat.
		</p>
	</div>
	<aside class="sticky top-16 h-[calc(100vh-4rem)]">
		<div class="font-bold">On This Page</div>
	</aside>
</div>

<Map
	{container}
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
	<NavigationControl position={controlPosition} visualizePitch={true} />
	<GeolocateControl position={controlPosition} />
	<FullScreenControl position={controlPosition} />
	<ScaleControl position={controlPosition} />
	<LogoControl position={controlPosition} />
	<AttributionControl position={controlPosition} compact={true} />
	<RasterTileSource
		id="gsi-raster"
		tiles={['https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg']}
		minzoom={5}
		maxzoom={18}
		attribution="国土地理院"
	>
		<RasterLayer id="gsi-raster" />
	</RasterTileSource>
	<GeoJSONSource id="amedas" data="https://jma-assets.mierune.dev/codes/amedas_ame.geojson">
		<CircleLayer
			id="amedas-point"
			paint={{ 'circle-radius': circleRadius, 'circle-color': pointColor }}
		/>
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
</Map>
