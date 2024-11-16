<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext, getSourceContext } from '../context.svelte.js';
	import type { FeatureIdentifier } from 'maplibre-gl';

	interface Props extends Omit<FeatureIdentifier, 'source'> {
		source?: string;
		state: Record<string, any>;
		children?: Snippet;
	}

	let { id, source: _sourceId, sourceLayer, state: featureState, children }: Props = $props();

	const mapCtx = getMapContext();
	if (!mapCtx.map) throw new Error('Map instance is not initialized.');

	const source = _sourceId || getSourceContext().id;

	let prevKeys: string[] = [];
	let prevIdentifier = $state.snapshot({ source, sourceLayer, id });

	$effect(() => {
		if (!mapCtx.map) {
			return;
		}

		const newKeys = new Set(Object.keys(featureState));

		if (prevIdentifier.id !== undefined) {
			const idChanged =
				prevIdentifier.id !== id || prevIdentifier.source !== source || prevIdentifier.sourceLayer !== sourceLayer;
			for (const key of prevKeys) {
				// Remove previous key-values from the previous feature
				if (idChanged || !newKeys.has(key)) {
					mapCtx.map.removeFeatureState(prevIdentifier, key);
				}
			}
		}

		// Set new key-values
		const identifier = $state.snapshot({ source, sourceLayer, id });
		if (identifier.id !== undefined) {
			mapCtx.map.setFeatureState(identifier, $state.snapshot(featureState));
		}

		prevKeys = Array.from(newKeys);
		prevIdentifier = identifier;
	});

	onDestroy(() => {
		if (mapCtx.map) {
			for (const key of prevKeys) {
				mapCtx.map.removeFeatureState(prevIdentifier, key);
			}
		}
	});
</script>

{@render children?.()}
