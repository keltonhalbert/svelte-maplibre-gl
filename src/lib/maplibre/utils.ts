let idCounter = 0;

export function generateLayerID() {
	return `svml-layer-${idCounter++}`;
}

export function generateSourceID() {
	return `svml-source-${idCounter++}`;
}
