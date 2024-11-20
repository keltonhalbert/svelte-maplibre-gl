<script lang="ts">
	let el: HTMLDivElement | undefined = $state(undefined);
	let { children }: { children?: Snippet } = $props();
</script>

<div bind:this={el} class="maplibregl-ctrl-icon">
	{@render children?.()}
</div>
