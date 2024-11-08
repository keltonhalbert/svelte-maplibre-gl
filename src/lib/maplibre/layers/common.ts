import type { MapLayerEventType } from 'maplibre-gl';

export type MapLayerEventProps = {
	[K in keyof MapLayerEventType as `on${K}`]?: (ev: MapLayerEventType[K]) => void;
};
