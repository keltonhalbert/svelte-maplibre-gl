<script lang="ts">
	let el: HTMLDivElement | undefined = $state(undefined);
	let { children }: { children?: Snippet } = $props();
</script>

<div bind:this={el} class="maplibregl-ctrl-group">
	{@render children?.()}
</div>
