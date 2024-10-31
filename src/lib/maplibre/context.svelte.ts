import type { Map as MapLibre } from 'maplibre-gl';
import { setContext, getContext } from 'svelte';

const MAP_CONTEXT_KEY = Symbol('MapLibre map context');
const SOURCE_CONTEXT_KEY = Symbol('MapLibre source context');

interface MapContext {
	get map(): MapLibre | null;
	set map(value: MapLibre | null);
}

interface SourceContext {
	get sourceId(): string | null;
	set sourceId(value: string | null);
}

export function prepareMapContext(): MapContext {
	// reactive state
	let mapState = $state.raw(null);
	const mapContext = {
		get map() {
			return mapState;
		},
		set map(value) {
			mapState = value;
		}
	};
	setContext(MAP_CONTEXT_KEY, mapContext);
	return mapContext;
}

export function getMapContext(): MapContext {
	const mapContext = getContext(MAP_CONTEXT_KEY);
	if (!mapContext) {
		throw new Error('Map is not initialized');
	}
	return mapContext as MapContext;
}

export function prepareSourceContext(): SourceContext {
	// reactive state
	const sourceState = $state({
		sourceId: null
	});
	const sourceContext = {
		get sourceId() {
			return sourceState.sourceId;
		},
		set sourceId(value) {
			sourceState.sourceId = value;
		}
	};
	setContext(SOURCE_CONTEXT_KEY, sourceState);
	return sourceContext;
}

export function getSourceContext(): SourceContext {
	const sourceContext = getContext(SOURCE_CONTEXT_KEY);
	if (!sourceContext) {
		throw new Error('Source is not found');
	}
	return sourceContext as SourceContext;
}
