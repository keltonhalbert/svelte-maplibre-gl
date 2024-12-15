<script lang="ts">
	import Index from '$lib/components/Index.svelte';

	import { toc } from '$content/examples/toc.js';
</script>

<div id="toc" class="p-8">
	<Index name="Examples" {toc} />
</div>

<style>
	#toc {
		view-transition-name: toc;
	}
</style>
