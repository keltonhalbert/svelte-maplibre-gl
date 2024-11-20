<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		children,
		onclick,
		oncontextmenu,
		className
	}: { children?: Snippet; className: string; onclick?: () => void; oncontextmenu?: () => void } = $props();
</script>

<button
	class:maplibregl-ctrl-icon={true}
	class:grid={true}
	class:place-items-center={true}
	class={className}
	{onclick}
	{oncontextmenu}
>
	{@render children?.()}
</button>
