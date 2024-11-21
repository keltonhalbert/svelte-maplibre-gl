<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';
	let {
		children,
		onclick,
		oncontextmenu,
		className
	}: {
		children?: Snippet;
		className: string;
		onclick?: MouseEventHandler<HTMLButtonElement>;
		oncontextmenu?: MouseEventHandler<HTMLButtonElement>;
	} = $props();
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
