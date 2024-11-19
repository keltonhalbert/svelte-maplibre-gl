<script lang="ts">
	import { getMapContext } from '../contexts.svelte.js';

	interface Props {
		id: string;
		url: string;
	}
	let { id, url }: Props = $props();

	const mapCtx = getMapContext();

	$effect(() => {
		if (!mapCtx.map) {
			return;
		}
		mapCtx.map.addSprite(id, url);

		return () => {
			mapCtx.map?.removeSprite(id);
		};
	});
</script>
