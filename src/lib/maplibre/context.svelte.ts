import type { Map as MapLibre } from 'maplibre-gl';
import { setContext, getContext } from 'svelte';

const MAP_CONTEXT_KEY = Symbol('MapLibre map context');
const SOURCE_CONTEXT_KEY = Symbol('MapLibre source context');

// https://svelte.dev/docs/svelte/$state#Classes
class MapContext {
	map: MapLibre | null = $state.raw(null);
}

// https://svelte.dev/docs/svelte/$state#Classes
class SourceContext {
	/** sourceId */
	id: string = $state('');
}

export function prepareMapContext(): MapContext {
	const mapCtx = new MapContext();
	setContext(MAP_CONTEXT_KEY, mapCtx);
	return mapCtx;
}

export function getMapContext(): MapContext {
	const mapCtx = getContext<MapContext>(MAP_CONTEXT_KEY);
	if (!mapCtx) {
		throw new Error('Map is not initialized');
	}
	return mapCtx;
}

export function prepareSourceContext(): SourceContext {
	const sourceCtx = new SourceContext();
	setContext(SOURCE_CONTEXT_KEY, sourceCtx);
	return sourceCtx;
}

export function getSourceContext(): SourceContext {
	const sourceCtx = getContext<SourceContext>(SOURCE_CONTEXT_KEY);
	if (!sourceCtx || !sourceCtx.id) {
		throw new Error('Source is not found');
	}
	return sourceCtx;
}
