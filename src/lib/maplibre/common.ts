export type LngLat = {
	lng: number;
	lat: number;
};

export type Listener<T> = (event: T) => void;

export type Event<T, N = string> = {
	type: N;
	target: T;
};
