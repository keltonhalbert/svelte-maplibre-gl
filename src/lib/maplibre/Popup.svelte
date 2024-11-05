<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { getMapContext, getMarkerContext } from './context.svelte.js';
	import maplibregl from 'maplibre-gl';
	import type { PopupOptions, Popup, Point, Listener } from 'maplibre-gl';
	import type { LngLat } from './common.js';

	interface Props extends Omit<PopupOptions, 'className'> {
		lnglat?: LngLat;
		class?: string;
		/** HTML content of the popup */
		content?: Snippet;
		children?: Snippet;
		// events
		onopen?: Listener;
		onclose?: Listener;
	}

	let container = $state<HTMLElement | null>(null);

	let {
		lnglat = $bindable(),
		class: className = undefined,
		offset,
		closeButton,
		closeOnClick,
		closeOnMove,
		focusAfterOpen,
		maxWidth,
		subpixelPositioning,
		onopen,
		onclose,
		children,
		...restOptions
	}: Props = $props();

	const mapCtx = getMapContext();

	let popup: Popup | null = $state.raw(null);

	const markerContext = getMarkerContext();

	$effect(() => {
		if (popup) {
			return;
		}
		if (!mapCtx.map) {
			throw new Error('MapLibre is not initialized');
		}

		const options: PopupOptions = {
			className,
			offset,
			subpixelPositioning,
			...restOptions
		};

		maxWidth !== undefined && (options.maxWidth = maxWidth);
		closeButton !== undefined && (options.closeButton = closeButton);
		closeOnClick !== undefined && (options.closeOnClick = closeOnClick);
		closeOnMove !== undefined && (options.closeOnMove = closeOnMove);
		focusAfterOpen !== undefined && (options.focusAfterOpen = focusAfterOpen);

		if (!container) {
			throw new Error('Popup content container is not initialized');
		}

		popup = new maplibregl.Popup(options);
		popup.setDOMContent(container);

		if (lnglat) {
			popup.setLngLat(lnglat);
			popup.addTo(mapCtx.map);
		}
	});

	let previousPopup: Popup | null = null;
	$effect(() => {
		if (markerContext?.marker) {
			previousPopup = markerContext.marker.getPopup() || null;
			markerContext.marker.setPopup(popup);
		}
	});

	let firstRun = true;

	$effect(() => {
		onopen && popup?.on('open', onopen);
		const prevListener = onopen;
		return () => {
			if (prevListener) {
				popup?.off('open', prevListener);
			}
		};
	});
	$effect(() => {
		onclose && popup?.on('close', onclose);
		const prevListener = onclose;
		return () => {
			if (prevListener) {
				popup?.off('close', prevListener);
			}
		};
	});

	$effect(() => {
		if (lnglat && !firstRun) {
			const prevLnglat = popup?.getLngLat();
			if (prevLnglat && (prevLnglat.lat !== lnglat.lat || prevLnglat.lng !== lnglat.lng)) {
				popup?.setLngLat(lnglat);
			}
		}
	});

	$effect(() => {
		maxWidth;
		if (!firstRun) {
			popup?.setMaxWidth(maxWidth || 'none');
		}
	});

	$effect(() => {
		if (offset && !firstRun) {
			popup?.setOffset(offset);
		}
	});

	$effect(() => {
		if (subpixelPositioning !== undefined && !firstRun) {
			popup?.setSubpixelPositioning(subpixelPositioning);
		}
	});

	let prevClassNames = (className || '')?.split(/\s/);
	$effect(() => {
		className;
		const classNames = (className || '')?.split(/\s/);
		if (className) {
			for (const prevClassName of prevClassNames) {
				popup?.removeClassName(prevClassName);
			}
			for (const className of classNames) {
				popup?.addClassName(className);
			}
		}
		prevClassNames = classNames;
	});

	$effect(() => {
		firstRun = false;
	});

	onDestroy(() => {
		popup?.remove();
		markerContext?.marker?.setPopup(previousPopup);
	});
</script>

<div bind:this={container}>
	{@render children?.()}
</div>
