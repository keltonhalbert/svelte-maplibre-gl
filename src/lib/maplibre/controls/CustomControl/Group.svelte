<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children?: Snippet } = $props();
</script>

<div class="maplibregl-ctrl-group">
	{@render children?.()}
</div>
