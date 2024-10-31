<script lang="ts">
	let { children } = $props();
</script>

<div class="mx-auto grid grid-cols-[220px_minmax(0,1fr)] gap-10 px-8 2xl:container">
	<aside class="sticky bottom-0 top-16 h-[calc(100vh-4rem)] py-8">
		<nav>
			<h2 class="mb-4 text-lg font-bold">Examples</h2>
			<ul class="flex flex-col gap-y-1">
				<li><a href="/examples/complex">Complex</a></li>
				<li><a href="/examples/empty">Empty page</a></li>
			</ul>
		</nav>
	</aside>
	<main class="grid-cols-[1fr_220px] py-8">
		{@render children()}
	</main>
</div>
