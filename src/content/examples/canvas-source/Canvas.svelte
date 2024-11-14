<script lang="ts">
	import { browser } from '$app/environment';
	import { MapLibre, CanvasSource, GlobeControl, RasterLayer } from 'svelte-maplibre-gl';
	import { Circle } from './Circle.js';

	const SIZE = 400;
	const RADIUS = 20;

	if (browser) {
		const canvas = document.getElementById('canvasId') as HTMLCanvasElement;
		const ctx = canvas.getContext('2d')!;
		const circles: Circle[] = [];

		for (let i = 0; i < 10; i++) {
			const color = `#${(0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7)}`;
			const x = Math.random() * (SIZE - RADIUS * 2) + RADIUS;
			const y = Math.random() * (SIZE - RADIUS * 2) + RADIUS;
			const dx = (Math.random() - 0.5) * 2;
			const dy = (Math.random() - 0.5) * 2;
			circles.push(new Circle(x, y, dx, dy, RADIUS, color));
		}

		function animate() {
			ctx.clearRect(0, 0, SIZE, SIZE);
			for (const circle of circles) {
				circle.update(ctx);
			}
			requestAnimationFrame(animate);
		}
		animate();
	}
</script>

<canvas id="canvasId" class="hidden" width={SIZE} height={SIZE}>Canvas not supported</canvas>

<MapLibre
	class="h-[60vh] min-h-[300px]"
	style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
	zoom={5}
	center={{ lng: 95.899147, lat: 18.088694 }}
>
	<GlobeControl />
	<CanvasSource
		canvas="canvasId"
		coordinates={[
			[91.4461, 21.5006],
			[100.3541, 21.5006],
			[100.3541, 13.9706],
			[91.4461, 13.9706]
		]}
	>
		<RasterLayer paint={{ 'raster-fade-duration': 0 }} />
	</CanvasSource>
</MapLibre>
