# Svelte MapLibre GL

Svelte wrapper for MapLibre GL JS (supports Svlete 5+ only)

⚠️ This project is currently in the early stages of development. Features and APIs are subject to change.

Documentaion and Examples: https://svelte-maplibre-gl.pages.dev/examples/

License: MIT or Apache 2.0

## TODOs

### Topics

General:

- [ ] Defer updating user styles until the base style is fully loaded
- [ ] GeoJSONSource.updateData

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
| Image      | Draft  |      |

#### Sources

| Component           | Status | Docs |
| ------------------- | ------ | ---- |
| VectorTileSource    | Draft  |      |
| RasterTileSource    | Draft  |      |
| RasterDEMTileSource | Draft  |      |
| GeoJSONSource       | Draft  |      |
| ImageSource         | Draft  |      |
| VideoSource         | Draft  |      |
| CanvasSource        | Draft  |      |

Utilities:

- [x] FeatureState
 
Extensions:

- [ ] PMTiles Source

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

Extensions:

- [ ] deck.gl Layer

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

Extensions:

- [ ] Drawing

## License

Licensed under the [MIT License](./LICENSE-MIT.txt) or the [Apache License 2.0](./LICENSE-APACHE.txt), at your option.

## Contributing

Everyone is welcomed to contribute to this project! There are many ways to support the project, such as:

- TODO

### Authors

- Taku Fukada ([@ciscorn](https://github.com/ciscorn/)) - Original Author
- TODO: Add core contributors
- And [all contributors](https://github.com/MIERUNE/svelte-maplibre-gl/graphs/contributors)

## Acknowledgements

This project `svelte-maplibre-gl` is inspired by the efforts and innovations of the following libraries:

- [`dimfeld/svelte-maplibre`](https://github.com/dimfeld/svelte-maplibre) &mdash; A library offering idiomatic Svelte support for the MapLibre GL mapping software
- [`visgl/react-map-gl`](https://github.com/visgl/react-map-gl) &mdash; React friendly API wrapper around Mapbox GL JS
