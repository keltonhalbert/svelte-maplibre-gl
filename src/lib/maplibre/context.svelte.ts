import type {
	Map as MapLibre,
	Marker,
	AddLayerObject,
	SourceSpecification,
	CanvasSourceSpecification,
	StyleSpecification,
	SkySpecification,
	TerrainSpecification,
	ProjectionSpecification,
	LightSpecification
} from 'maplibre-gl';
import { setContext, getContext } from 'svelte';

const MAP_CONTEXT_KEY = Symbol('MapLibre map context');
const SOURCE_CONTEXT_KEY = Symbol('MapLibre source context');
const MARKER_CONTEXT_KEY = Symbol('MapLibre marker context');

// https://svelte.dev/docs/svelte/$state#Classes
class MapContext {
	map: MapLibre | null = $state.raw(null);
	userLayers: Set<string> = new Set();
	userSources: Set<string> = new Set();
	baseTerrain?: TerrainSpecification | undefined;
	userTerrain?: TerrainSpecification | undefined;
	baseSky?: SkySpecification | undefined;
	userSky?: SkySpecification | undefined;
	baseLight?: LightSpecification | undefined;
	userLight?: LightSpecification | undefined;
	baseProjection?: ProjectionSpecification | undefined;
	userProjection?: ProjectionSpecification | undefined;

	addLayer(addLayerObject: AddLayerObject, beforeId?: string) {
		this.userLayers.add(addLayerObject.id);
		this.map?.addLayer(addLayerObject, beforeId);
	}
	removeLayer(id: string) {
		this.userLayers.delete(id);
		this.map?.removeLayer(id);
	}

	addSource(id: string, source: SourceSpecification | CanvasSourceSpecification) {
		this.map?.addSource(id, source);
		this.userSources.add(id);
	}
	removeSource(id: string) {
		this.userSources.delete(id);
		this.map?.removeSource(id);
	}

	// Preserves user styles when the base style changes
	setStyle(style: string | StyleSpecification | null) {
		const { userSources: addedSources, userLayers: addedLayers } = this;
		if (!style) {
			this.map?.setStyle(null);
			return;
		}

		this.map?.setStyle(style, {
			transformStyle: (previous, next) => {
				this.baseLight = next.light;
				this.baseProjection = next.projection;
				this.baseSky = next.sky;
				this.baseTerrain = next.terrain;

				if (!previous) {
					return next;
				}

				const sources = next.sources;
				for (const [key, value] of Object.entries(previous.sources!)) {
					if (addedSources.has(key)) {
						sources[key] = value;
					}
				}

				const userLayers = previous.layers!.filter((layer) => addedLayers.has(layer.id));
				const layers = [...next.layers!, ...userLayers];

				return {
					...next,
					light: this.userLight || this.baseLight,
					projection: this.userProjection || this.baseProjection,
					sky: this.userSky || this.baseSky,
					terrain: this.userTerrain || this.baseTerrain,
					sources,
					layers
				};
			}
		});
	}
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
	if (!mapCtx) throw new Error('Component must be used inside MapLibre component');
	return mapCtx;
}

export function prepareSourceContext(): SourceContext {
	const sourceCtx = new SourceContext();
	setContext(SOURCE_CONTEXT_KEY, sourceCtx);
	return sourceCtx;
}

export function getSourceContext(): SourceContext {
	const sourceCtx = getContext<SourceContext>(SOURCE_CONTEXT_KEY);
	if (!sourceCtx || !sourceCtx.id) throw new Error('Must be used inside map Source context');
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
