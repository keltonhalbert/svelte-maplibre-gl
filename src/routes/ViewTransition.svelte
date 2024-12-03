<script lang="ts">
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}
	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}
	:root::view-transition-old(content) {
		animation: 300ms ease-out both fade-out;
	}
	:root::view-transition-new(content) {
		animation: 300ms ease-out both fade-in;
	}
</style>
