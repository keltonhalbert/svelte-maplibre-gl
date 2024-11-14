# Svelte MapLibre GL

Svelte wrapper for MapLibre GL JS (supports Svlete 5+ only)

⚠️ This project is currently in the early stages of development. Features and APIs are subject to change.

Documentaion and Examples: https://svelte-maplibre-gl.pages.dev/examples/

## TODOs

### Topics

General:

- [x] User sources/layers/styles on the base style
- [ ] Defer updating user styles until the base style is loaded
- [ ] Event handlers
- [ ] Hover on features
- [ ] Filter

Extensions:

- [ ] PMTiles Source
- [ ] deck.gl Layer
- [ ] Drawing
- and more...

### Components

#### Map

| Component  | Status | Docs |
| ---------- | ------ | ---- |
| MapLibre   | Draft  |      |
| Terrain    | Draft  |      |
| Projection | Draft  |      |
| Sky        | Draft  |      |
| Light      | Draft  |      |
| Sprite     |        |      |
| Glyphs     |        |      |

#### Sources

| Component           | Status | Docs |
| ------------------- | ------ | ---- |
| VectorTileSource    | Draft  |      |
| RasterTileSource    | Draft  |      |
| RasterDEMTileSource | Draft  |      |
| GeoJSONSource       | Draft  |      |
| ImageSource         | Draft  |      |
| VideoSource         | Draft  |      |
| CanvasSource        |        |      |

#### Layers

| Component          | Status | Docs |
| ------------------ | ------ | ---- |
| CircleLayer        | Draft  |      |
| LineLayer          | Draft  |      |
| FillLayer          | Draft  |      |
| FillExtrusionLayer | Draft  |      |
| RasterLayer        | Draft  |      |
| BackgroundLayer    | Draft  |      |
| HeatmapLayer       | Draft  |      |
| SymbolLayer        | Draft  |      |
| CustomLayer        |        |      |

#### Markers and Controls

| Component          | Status | Docs |
| ------------------ | ------ | ---- |
| Marker             | Draft  |      |
| Popup              | Draft  |      |
| AttributionControl | Draft  |      |
| FullScreenControl  | Draft  |      |
| GeolocateControl   | Draft  |      |
| GlobeControl       | Draft  |      |
| NavigationControl  | Draft  |      |
| ScaleControl       | Draft  |      |
| TerrainControl     | Draft  |      |
| Hash               | Draft  |      |

#### Resources

| Component | Status | Docs |
| --------- | ------ | ---- |
| Image     | Draft  |      |
| Sprite    |        |      |

## Authors

- Taku Fukada ([@ciscorn](https://github.com/ciscorn/)) &mdash; Main Author
- TODO, TODO, TODO &mdash; Core Contributors

...and other contributors.

## Acknowledgements

This project `svelte-maplibre-gl` is inspired by the efforts and innovations of the following libraries:

- [`dimfeld/svelte-maplibre`](https://github.com/dimfeld/svelte-maplibre) &mdash; A library offering idiomatic Svelte support for the MapLibre GL mapping software
- [`visgl/react-map-gl`](https://github.com/visgl/react-map-gl) &mdash; React friendly API wrapper around Mapbox GL JS
