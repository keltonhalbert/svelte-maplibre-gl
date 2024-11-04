let idCounter = 0;

export function generateLayerID() {
	return `layer-${idCounter++}`;
}

export function generateSourceID() {
	return `source-${idCounter++}`;
}
