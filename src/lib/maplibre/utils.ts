import type { Evented, Listener, Map, MapLayerEventType } from 'maplibre-gl';

let idCounter = 0;

export function generateLayerID() {
	return `svml-layer-${idCounter++}`;
}

export function generateSourceID() {
	return `svml-source-${idCounter++}`;
}

/**
 * Set an event listener on an Evented object, and return a function that will remove the listener.
 *
 * Intended to be used within the $effect rune.
 */
export function resetEventListener(evented: Evented | null | undefined, type: string, listener: Listener | undefined) {
	if (listener) {
		evented?.on(type, listener);
	}
	const prevListener = listener;
	return () => {
		if (prevListener) {
			evented?.off(type, prevListener);
		}
	};
}

/**
 * Set a Layer event listener on the Map object, and return a function that will remove the listener.
 *
 * Intended to be used within the $effect rune.
 */
export function resetLayerEventListener(
	map: Map | null,
	type: keyof MapLayerEventType,
	layer: string,
	listener: Listener | undefined
) {
	if (listener) {
		map?.on(type, layer, listener);
	}
	const prevListener = listener;
	return () => {
		if (prevListener) {
			map?.off(type, layer, prevListener);
		}
	};
}
