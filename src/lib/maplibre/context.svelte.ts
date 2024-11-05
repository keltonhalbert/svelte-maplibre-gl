import type { Map as MapLibre, Marker } from 'maplibre-gl';
import { setContext, getContext } from 'svelte';

const MAP_CONTEXT_KEY = Symbol('MapLibre map context');
const SOURCE_CONTEXT_KEY = Symbol('MapLibre source context');
const MARKER_CONTEXT_KEY = Symbol('MapLibre marker context');

// https://svelte.dev/docs/svelte/$state#Classes
class MapContext {
	map: MapLibre | null = $state.raw(null);
}

// https://svelte.dev/docs/svelte/$state#Classes
class SourceContext {
	/** sourceId */
	id: string = $state('');
}

class MarkerContext {
	marker: Marker | null = $state.raw(null);
}

export function prepareMapContext(): MapContext {
	const mapCtx = new MapContext();
	setContext(MAP_CONTEXT_KEY, mapCtx);
	return mapCtx;
}

export function getMapContext(): MapContext {
	const mapCtx = getContext<MapContext>(MAP_CONTEXT_KEY);
	if (!mapCtx) {
		throw new Error('Component must be used inside MapLibre component');
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
		throw new Error('Must be used inside map Source context');
	}
	return sourceCtx;
}

export function prepareMarkerContext(): MarkerContext {
	const markerCtx = new MarkerContext();
	setContext(MARKER_CONTEXT_KEY, markerCtx);
	return markerCtx;
}

export function getMarkerContext(): MarkerContext | null {
	const markerCtx = getContext<MarkerContext>(MARKER_CONTEXT_KEY);
	if (!markerCtx) {
		return null;
	}
	return markerCtx;
}
