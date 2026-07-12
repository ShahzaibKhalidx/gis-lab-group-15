import { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Image as ImageLayer } from 'ol/layer';
import { OSM, ImageWMS, XYZ } from 'ol/source';
import { transformExtent } from 'ol/proj';
import { ScaleLine, FullScreen, MousePosition } from 'ol/control';
import { createStringXY } from 'ol/coordinate';
import { ChevronLeft, ChevronRight, Layers, Sliders, MapPin, Eye, EyeOff, Check, RotateCcw } from 'lucide-react';
import bivariateLegend from '../assets/images/legend_bivariate_5x5.png';

const WMS_URL = 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_15/wms';
// https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_15/wms?service=WMS&version=1.1.0&request=GetMap&layers=gisgeoserver_15%3ATurkey_LCC_2021_2023&bbox=25.66322%2C35.82216%2C44.80706%2C42.09886&width=768&height=330&srs=EPSG%3A4326&styles=&format=application/openlayers

const LAYER_NAMES = {
  no2: {
    concentration: 'gisgeoserver_15:Turkey_no2_concentration_map_2023',
    amac: 'gisgeoserver_15:Turkey_no2_2021_2023_AMAC_map',
    landCover: 'gisgeoserver_15:Turkey_LCC_2021_2023',
    bivariate: 'gisgeoserver_15:Turkey_no2_pol_2023_bivariate',
    population: 'gisgeoserver_15:turkey_no2_2023_chart',
    zonalStatistics: 'gisgeoserver_15:Turkey_no2_zonal_statistics',
    average2023: 'gisgeoserver_15:Turkey_average_no2_2023',
    cams2023: 'gisgeoserver_15:Turkey_CAMS_no2_2023_12',
  },
  pm25: {
    concentration: 'gisgeoserver_15:Turkey_pm2p5_concentration_map_2023',
    amac: 'gisgeoserver_15:Turkey_pm2p5_2021_2023_AMAC_map',
    landCover: 'gisgeoserver_15:Turkey_LCC_2021_2023',
    bivariate: 'gisgeoserver_15:Turkey_pm2p5_2023_bivariate.gpkg',
    population: 'gisgeoserver_15:Turkey_pm2p5_2023_chart.gpkg',
    zonalStatistics: 'gisgeoserver_15:Turkey_pm2p5_zonal_statistics_2021_2023',
    average2023: 'gisgeoserver_15:Turkey_average_pm2p5_2023',
    cams2023: 'gisgeoserver_15:Turkey_CAMS_pm2p5_2023_12',
  },
  pm10: {
    concentration: 'gisgeoserver_15:TURKEY_pm10_concentration_map_2023',
    amac: 'gisgeoserver_15:TURKEY_pm10_2021_2023_AMAC_map',
    landCover: 'gisgeoserver_15:Turkey_LCC_2021_2023',
    bivariate: 'gisgeoserver_15:Turkey_pm10_2023_bivariate',
    population: 'gisgeoserver_15:Turkey_pm10_2023_chart',
    zonalStatistics: 'gisgeoserver_15:Turkey_pm10_zonal_statistics',
    average2023: 'gisgeoserver_15:Turkey_average_pm10_2023',
    cams2023: 'gisgeoserver_15:TURKEY_CAMS_pm10_2023_12',
  },
};

const OVERLAY_META = [
  { key: 'concentration', label: 'Concentration Map 2023' },
  { key: 'amac', label: 'AMAC Change 2021–2023' },
  { key: 'landCover', label: 'Land Cover Change (LCC)' },
  { key: 'bivariate', label: 'Bivariate (Population × Pollution)' },
  { key: 'population', label: 'Population Quantiles' },
  { key: 'zonalStatistics', label: 'Zonal Statistics Summary' },
  { key: 'average2023', label: 'Average 2023 Base Grid' },
  { key: 'cams2023', label: 'CAMS Dec 2023' },
];

const TURKEY_EXTENT_4326 = [25.6, 35.8, 44.9, 42.1];
const TURKEY_EXTENT = transformExtent(TURKEY_EXTENT_4326, 'EPSG:4326', 'EPSG:3857');

const POLLUTANT_INFO = {
  pm10: { label: 'PM10', title: 'Particulate Matter 10 (Trees)' },
  no2: { label: 'NO₂', title: 'Nitrogen Dioxide (Built)' },
  pm25: { label: 'PM₂.₅', title: 'Particulate Matter 2.5 (Crops)' },
};

export default function WebGISView() {
  const mapElement = useRef(null);
  const mapRef = useRef(null);

  // References so we can manipulate layers directly in React render cycles
  const overlaysRef = useRef({});
  const basemapsRef = useRef({});

  // Collapsible panel state
  const [panelOpen, setPanelOpen] = useState(true);

  // Map settings state
  const [activePollutant, setActivePollutant] = useState('pm10');
  const [basemapKey, setBasemapKey] = useState('osm');
  const [opacity, setOpacity] = useState(0.85);

  // Layers visibility state
  const [visibilities, setVisibilities] = useState({
    concentration: true,
    amac: false,
    landCover: false,
    bivariate: false,
    population: false,
    zonalStatistics: false,
    average2023: false,
    cams2023: false,
  });

  const [mouseCoordText, setMouseCoordText] = useState('—');

  // Initialize the Map once
  useEffect(() => {
    if (!mapElement.current) return;

    // Create Basemaps
    const basemaps = {
      osm: new TileLayer({
        source: new OSM(),
        visible: true,
      }),
      esriTopo: new TileLayer({
        source: new XYZ({
          attributions: 'Tiles © ArcGIS',
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        }),
        visible: false,
      }),
      esriImagery: new TileLayer({
        source: new XYZ({
          attributions: 'Tiles © ArcGIS',
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        }),
        visible: false,
      }),
      cartoDark: new TileLayer({
        source: new XYZ({
          attributions: 'Tiles © CartoDB',
          url: 'https://basemaps.cartocdn.com/dark_all/{z}/{y}/{x}{r}.png',
        }),
        visible: false,
      }),
    };

    // Create WMS overlay layers dynamically
    const overlays = {};
    OVERLAY_META.forEach(({ key }) => {
      overlays[key] = new ImageLayer({
        source: new ImageWMS({
          url: WMS_URL,
          params: {
            LAYERS: LAYER_NAMES[activePollutant][key],
            TILED: true,
          },
          ratio: 1.0,
          serverType: 'geoserver',
        }),
        opacity,
        visible: visibilities[key],
      });
    });

    basemapsRef.current = basemaps;
    overlaysRef.current = overlays;

    // Instantiate map
    const map = new Map({
      target: mapElement.current,
      layers: [
        basemaps.osm,
        basemaps.esriTopo,
        basemaps.esriImagery,
        basemaps.cartoDark,
        ...Object.values(overlays),
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2,
      }),
      controls: [
        new ScaleLine({ bar: true, text: true }),
        new FullScreen(),
        new MousePosition({
          coordinateFormat: createStringXY(4),
          projection: 'EPSG:4326',
          className: 'custom-mouse-position',
          placeholder: '—',
          target: 'mouse-coord-target',
        }),
      ],
    });

    mapRef.current = map;

    // Zoom and center on Turkey boundaries with padding
    map.getView().fit(TURKEY_EXTENT, { padding: [40, 40, 40, 40] });

    // Track mouse move for coordinates in state optionally for custom clean indicator
    map.on('pointermove', (evt) => {
      const coords = evt.coordinate;
      if (coords) {
        const trans = transformExtent([coords[0], coords[1], coords[0], coords[1]], 'EPSG:3857', 'EPSG:4326');
        setMouseCoordText(`${trans[0].toFixed(4)}°E, ${trans[1].toFixed(4)}°N`);
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(undefined);
        mapRef.current = null;
      }
    };
  }, []);

  // Sync Pollutant triggers
  useEffect(() => {
    OVERLAY_META.forEach(({ key }) => {
      const layer = overlaysRef.current[key];
      if (layer) {
        layer.getSource()?.updateParams({
          LAYERS: LAYER_NAMES[activePollutant][key],
        });
      }
    });
  }, [activePollutant]);

  // Sync Visibilities triggers
  useEffect(() => {
    OVERLAY_META.forEach(({ key }) => {
      const layer = overlaysRef.current[key];
      if (layer) {
        layer.setVisible(visibilities[key]);
      }
    });
  }, [visibilities]);

  // Sync Basemaps triggers
  useEffect(() => {
    Object.keys(basemapsRef.current).forEach((key) => {
      const bLayer = basemapsRef.current[key];
      if (bLayer) {
        bLayer.setVisible(key === basemapKey);
      }
    });
  }, [basemapKey]);

  // Sync Opacity triggers
  useEffect(() => {
    Object.values(overlaysRef.current).forEach((layer) => {
      if (layer) {
        layer.setOpacity(opacity);
      }
    });
  }, [opacity]);

  // Handler for toggle triggers
  const toggleLayer = (layerKey) => {
    setVisibilities((prev) => ({
      ...prev,
      [layerKey]: !prev[layerKey],
    }));
  };

  // Helper to re-center mapping on Turkey
  const resetExtent = () => {
    if (mapRef.current) {
      mapRef.current.getView().fit(TURKEY_EXTENT, {
        padding: [60, 60, 60, 60],
        duration: 800,
      });
    }
  };

  return (
    <div className="relative flex h-[calc(100vh-64px)] overflow-hidden w-full select-none bg-slate-50 text-slate-800 font-sans">

      {/* ─── CONTROLS/LAYERS SIDEBAR PANEL (LEFT) ─── */}
      <div
        id="layer-panel"
        className={`bg-white border-r border-slate-205 border-slate-200 transition-all duration-300 z-10 flex flex-col shadow-lg h-full select-none ${panelOpen ? 'w-80' : 'w-0 overflow-hidden border-r-0'
          }`}
      >
        {panelOpen && (
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-850 tracking-tight text-xs uppercase font-mono">GIS WebGIS Panel</h3>
              </div>
              <button
                onClick={() => setPanelOpen(false)}
                className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                title="Collapse Sidebar"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            {/* Pollutant Tabs switcher */}
            <div className="p-5 border-b border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 uppercase font-mono font-black tracking-widest block mb-3">
                Select Active Pollutant
              </span>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-50 rounded-lg border border-slate-150">
                {Object.keys(POLLUTANT_INFO).map((key) => {
                  const info = POLLUTANT_INFO[key];
                  const active = activePollutant === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActivePollutant(key)}
                      className={`py-2 rounded font-mono text-xs font-bold transition-all cursor-pointer select-none ${active
                          ? 'bg-emerald-600 text-white shadow-xs font-black'
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                    >
                      {info.label}
                    </button>
                  );
                })}
              </div>
              <span className="text-[10px] text-slate-500 font-mono italic block mt-2.5 text-center truncate">
                {POLLUTANT_INFO[activePollutant].title}
              </span>
            </div>

            {/* Map Layers Toggles */}
            <div className="p-5 border-b border-slate-100 flex-grow bg-slate-50/20">
              <span className="text-[10px] text-slate-400 uppercase font-mono font-black tracking-widest block mb-3">
                Analytical Overlays (WMS)
              </span>

              <div className="space-y-2">
                {OVERLAY_META.map(({ key, label }) => {
                  const visible = visibilities[key];
                  return (
                    <div
                      key={key}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none ${visible
                          ? 'bg-emerald-50/50 border-emerald-500/20 text-emerald-950 font-bold shadow-2xs'
                          : 'bg-white border-slate-150 text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                        }`}
                      onClick={() => toggleLayer(key)}
                    >
                      <span className="text-xs font-bold leading-tight pr-2">{label}</span>
                      <button
                        className={`p-1.5 rounded-lg transition-colors ${visible ? 'text-emerald-700 bg-emerald-500/10' : 'text-slate-400 hover:text-slate-600'
                          }`}
                      >
                        {visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Opacity Controls */}
            <div className="p-5 border-b border-slate-100 bg-white">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] text-slate-400 uppercase font-mono font-black tracking-widest flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-indigo-600" /> Layer Opacity
                </span>
                <span className="font-mono text-emerald-700 text-xs font-bold bg-slate-50 px-2.5 py-0.5 rounded-md border border-slate-150">
                  {Math.round(opacity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Basemap Switcher selector */}
            <div className="p-5 bg-slate-50/10">
              <span className="text-[10px] text-slate-400 uppercase font-mono font-black tracking-widest block mb-3">
                Basemap Matrix
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                {[
                  { key: 'osm', label: 'OpenStreetMap' },
                  { key: 'esriTopo', label: 'Esri Topo' },
                  { key: 'esriImagery', label: 'Esri Imagery' },
                  { key: 'cartoDark', label: 'CartoDB Dark' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setBasemapKey(item.key)}
                    className={`p-2.5 rounded-lg text-left truncate border flex items-center justify-between transition-all cursor-pointer ${basemapKey === item.key
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-2xs'
                        : 'bg-white border-slate-150 text-slate-500 hover:text-slate-800 hover:border-slate-300'
                      }`}
                  >
                    <span className="text-[10px] uppercase tracking-wide">{item.label.split(' ')[0]}</span>
                    {basemapKey === item.key && <Check className="w-3 h-3 text-indigo-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── SIDEBAR TOGGLE BUTTON (FLOATING WRAPPER) ─── */}
      {!panelOpen && (
        <button
          onClick={() => setPanelOpen(true)}
          className="absolute left-4 top-4 z-25 bg-white/95 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 p-2.5 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-all flex items-center gap-1.5"
          title="Expand Sidebar Controls"
        >
          <Layers className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-black uppercase tracking-widest font-mono pr-1">Layers Panel</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* ─── MAP CANVAS WRAPPER (CENTER) ─── */}
      <div className="relative flex-grow h-full bg-slate-100">
        <div ref={mapElement} id="map" className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* ─── RESET GEOSPATIAL BOUNDARIES BUTTON (FLOATING BOTTOM RIGHT) ─── */}
        <button
          onClick={resetExtent}
          className="absolute bottom-5 right-5 z-20 bg-white/95 hover:bg-slate-50 text-slate-700 hover:text-slate-900 p-3.5 rounded-full border border-slate-200 shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all"
          title="Recenter Turkey Boundaries"
        >
          <RotateCcw className="w-4 h-4 text-emerald-600" />
        </button>

        {/* ─── LIVE RUNTIME COORDINATES BAR (FLOATING STRIP) ─── */}
        <div className="absolute right-5 top-5 z-20 bg-white/95 border border-slate-200 rounded-xl px-4 py-3 shadow-md text-[10px] font-mono text-slate-755 text-slate-700 flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span className="text-slate-400 font-extrabold uppercase tracking-widest">Turkey WGS84:</span>
          <span className="text-slate-850 font-black select-all">{mouseCoordText}</span>
        </div>

        {/* ─── DYNAMIC GEOSERVER WMS LEGEND DISPLAY (FLOATING BOTTOM LEFT) ─── */}
        <div className="absolute left-5 bottom-5 z-20 max-w-[280px] bg-white/95 border border-slate-200 rounded-2xl p-4 shadow-xl select-none max-h-80 overflow-y-auto">
          <div className="flex items-center gap-1.5 border-b border-slate-150 pb-2.5 mb-3 select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <h4 className="text-[10px] font-black uppercase font-mono tracking-widest text-slate-800">
              Active Map Legend
            </h4>
          </div>

          <div className="space-y-4 select-none">
            <p className="text-[10px] text-emerald-600 font-mono font-bold leading-none select-none uppercase tracking-wider">
              Pollutant focus: <span className="font-sans font-black text-slate-800">{activePollutant === 'pm10' ? 'PM10 (Forest)' : activePollutant === 'no2' ? 'NO₂ (Built)' : 'PM₂.₅ (Cropland)'}</span>
            </p>

            {/* Gather active overlays list with dark text font rendering */}
            {OVERLAY_META.filter((m) => visibilities[m.key]).map(({ key, label }) => {
              const legendUrl = `${WMS_URL}?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=${LAYER_NAMES[activePollutant][key]}&legend_options=forceRuleSize:true;fontColor:0x1E293B;fontSize:10;fontAntiAliasing:true`;

              return (
                <div key={key} className="border-t border-slate-150 pt-2.5 first:border-0 first:pt-0 select-none">
                  <span className="text-[10px] font-black text-indigo-650 text-indigo-600 block select-none leading-tight mb-1 flex items-center gap-1 uppercase tracking-wide">
                    <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
                    {label}
                  </span>
                  <div className="bg-slate-50 p-2 rounded border border-slate-150 mt-1 flex justify-center select-none min-h-[30px] shadow-2xs">
                    {key === 'bivariate' ? (
                      <img
                        src={bivariateLegend}
                        alt="Bivariate legend showing population count and pollutant concentration"
                        className="w-[220px] max-w-full h-auto select-none"
                      />
                    ) : (
                      <img
                        src={legendUrl}
                        alt={`${label} GeoServer rule map index`}
                        onError={(e) => {
                          e.target.src =
                            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="20"><text y="15" fill="grey" font-family="monospace" font-size="10">GeoServer Legend</text></svg>';
                        }}
                        className="max-w-full select-none"
                      />
                    )}
                  </div>
                </div>
              );
            })}

            {/* Empty fallback */}
            {OVERLAY_META.filter((m) => visibilities[m.key]).length === 0 && (
              <p className="text-slate-400 font-medium italic text-[10px] py-2 select-none font-mono">
                No active overlays. Toggle layers in sidebar controls.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
