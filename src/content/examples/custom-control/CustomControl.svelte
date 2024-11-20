<script lang="ts">
	import { HillshadeLayer, MapLibre, RasterDEMTileSource, Terrain, CustomControl } from 'svelte-maplibre-gl';
	import IconMoon from './IconMoon.svelte';
	import IconSun from './IconSun.svelte';
	import { MyControl } from './MyControl.js';

	let isHillshadeVisible = $state(true);
	let isTerrainVisible = $state(true);
	let isDarkMode = $state(false);
	const mapStyle = $derived(
		isDarkMode
			? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
			: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'
	);

	const myControl = new MyControl({
		toggleHillshade: () => {
			isHillshadeVisible = !isHillshadeVisible;
			return isHillshadeVisible;
		},
		toggleTerrain: () => {
			isTerrainVisible = !isTerrainVisible;
			return isTerrainVisible;
		}
	});
</script>

<MapLibre
	class="h-[60vh] min-h-[300px]"
	style={mapStyle}
	zoom={12}
	pitch={40}
	maxPitch={85}
	center={{ lng: 11.09085, lat: 47.3 }}
>
	<!-- inject IControl (useful for plugin) -->
	<CustomControl.Control position="top-left" control={myControl} />

	<!-- Control / Group / Icon -->
	<CustomControl.Control position="bottom-left">
		<CustomControl.Group>
			<CustomControl.Icon onclick={() => (isDarkMode = !isDarkMode)} className="text-gray-900">
				{#if isDarkMode}
					<IconMoon />
				{:else}
					<IconSun />
				{/if}
			</CustomControl.Icon>
		</CustomControl.Group>
	</CustomControl.Control>

	<!-- Control / Group / any svelte elements -->
	<CustomControl.Control position="top-right">
		<CustomControl.Group>
			<div class="p-2 text-yellow-600">
				<div>define your own custom control</div>
			</div>
		</CustomControl.Group>
	</CustomControl.Control>

	<RasterDEMTileSource
		id="terrain"
		tiles={['https://demotiles.maplibre.org/terrain-tiles/{z}/{x}/{y}.png']}
		minzoom={0}
		maxzoom={12}
		attribution="<a href='https://earth.jaxa.jp/en/data/policy/'>AW3D30 (JAXA)</a>"
	>
		{#if isTerrainVisible}
			<Terrain />
		{/if}
		{#if isHillshadeVisible}
			<HillshadeLayer />
		{/if}
	</RasterDEMTileSource>
</MapLibre>
