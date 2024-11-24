<script lang="ts">
	import { page } from '$app/stores';

	const items = {
		'/components/markdown': 'Markdown test'
	};
</script>

<nav>
	<h2 class="mb-4 text-lg font-bold">Components</h2>
	<ul class="flex flex-col gap-y-2">
		{#each Object.entries(items) as [path, title]}
			<li>
				<a class="data-[active=true]:font-medium" data-active={$page.url.pathname === path} href={path}>{title}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		view-transition-name: toc;
	}
</style>
