import type { Evented, Listener } from 'maplibre-gl';

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
 * It is intended to be used within the $effect rune.
 */
export function resetEventListener(evented: Evented | null | undefined, listener: Listener | undefined, type: string) {
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
