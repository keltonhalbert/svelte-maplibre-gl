<script lang="ts">
	import { page } from '$app/stores';

	const toc = [
		{
			title: 'Basic',
			items: {
				'/examples/plain': 'Plain Map',
				'/examples/complex': 'Complex',
				'/examples/basestyle': 'Change Base Style',
				'/examples/hover-styles': 'Hover Styles',
				'/examples/terrain': '3D Terrain',
				'/examples/clusters': 'Clusters',
				'/examples/limit-interaction': 'Limit Map Interactions',
				'/examples/animate-images': 'Animate a Series of Images',
				'/examples/video-on-a-map': 'Video on a Map',
				'/examples/fullscreen': 'Fullscreen',
				'/examples/geolocate': 'Locate the User'
			}
		},
		{
			title: 'Utilities',
			items: {
				'/examples/image-loader': 'Load Images from URLs',
				'/examples/query-features': 'Query Features'
			}
		},
		{
			title: 'Techniques',
			items: {
				'/examples/side-by-side': 'Side by Side'
			}
		},
		{
			title: 'Advanced',
			items: {
				'/examples/custom-control': 'Custom Control',
				'/examples/custom-protocol': 'Custom Protocols',
				'/examples/canvas-source': 'Canvas Source',
				'/examples/custom-layer': 'Custom Layer',
				'/examples/dynamic-image': 'Dynamic Image',
				'/examples/threejs-model': '3D model with three.js'
			}
		},
		{
			title: 'Extensions',
			items: {
				'/examples/pmtiles': 'PMTiles Protocol',
				'/examples/deckgl-overlay': 'deck.gl Overlay',
				'/examples/contour': 'Contour Lines'
			}
		}
	];
</script>

<nav>
	<h2 class="mb-4 text-lg font-bold">Examples</h2>
	{#each toc as subtoc}
		<h3 class="my-3">{subtoc.title}</h3>
		<ul class="flex flex-col text-sm">
			{#each Object.entries(subtoc.items) as [path, title]}
				<li
					class="border-l border-foreground/10 py-1 pl-4 data-[active=true]:border-foreground"
					data-active={$page.url.pathname === path}
				>
					<a class="data-[active=true]:font-medium" data-active={$page.url.pathname === path} href={path}>{title}</a>
				</li>
			{/each}
		</ul>
	{/each}
</nav>

<style>
	nav {
		view-transition-name: toc;
	}
</style>
