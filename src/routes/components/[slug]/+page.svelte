<script lang="ts">
	const { data } = $props();
</script>

<div class="grid grid-cols-[1fr_220px] gap-x-10">
	<div class="min-h-[calc(100vh-4rem)] w-full min-w-0 py-8">
		<h1 class="mb-2 text-3xl font-bold">{data.meta.title}</h1>

		<p class="mb-6 text-muted-foreground">
			{data.meta.description}
		</p>

		<div class="prose max-w-none dark:prose-invert">
			<data.Content />
		</div>
	</div>
	<aside class="sticky top-24 h-[calc(100vh-6rem)]">
		<div class="font-medium">On This Page</div>
	</aside>
</div>

<svelte:head>
	<title>{data.meta.title} - Svelte MapLibre GL</title>
</svelte:head>
