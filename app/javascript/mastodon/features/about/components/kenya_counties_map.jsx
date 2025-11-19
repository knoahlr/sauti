import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import '../../../../vendor/leaflet/leaflet.css';

const DEFAULT_CENTER = [-0.2, 37.9];
const DEFAULT_ZOOM = 6;
const DATA_PATH = '/kenya_adm1_full.geojson';

const normalize = value =>
  (value || '')
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim();

const COUNTY_ABBREVIATIONS = {
  baringo: 'BG',
  bomet: 'BM',
  bungoma: 'BN',
  busia: 'BS',
  'elgeyo marakwet': 'EM',
  embu: 'EB',
  garissa: 'GS',
  'homa bay': 'HB',
  isiolo: 'IS',
  kajiado: 'KJ',
  kakamega: 'KK',
  kericho: 'KC',
  kiambu: 'KB',
  kilifi: 'KF',
  kirinyaga: 'KG',
  kisii: 'KS',
  kisumu: 'KM',
  kitui: 'KT',
  kwale: 'KW',
  laikipia: 'LP',
  lamu: 'LM',
  machakos: 'MC',
  makueni: 'MK',
  mandera: 'MD',
  marsabit: 'MS',
  meru: 'MR',
  migori: 'MG',
  mombasa: 'MB',
  muranga: 'MN',
  'nairobi city': 'NB',
  nakuru: 'NK',
  nandi: 'ND',
  narok: 'NR',
  nyamira: 'NY',
  nyandarua: 'NA',
  nyeri: 'NE',
  samburu: 'SB',
  siaya: 'SY',
  'taita taveta': 'TT',
  'tana river': 'TR',
  'tharaka nithi': 'TN',
  'trans nzoia': 'TZ',
  turkana: 'TU',
  'uasin gishu': 'UG',
  vihiga: 'VI',
  wajir: 'WJ',
  'west pokot': 'WP',
};

const getCountyAbbreviation = countyName => {
  const key = normalize(countyName);
  if (!key) {
    return '';
  }

  return COUNTY_ABBREVIATIONS[key] || countyName.slice(0, 2).toUpperCase();
};

const KenyaCountiesMap = ({ selectedCounty, onCountySelect, loadingLabel }) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const geoJsonLayerRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const selectedCountyRef = useRef(normalize(selectedCounty));
  const onSelectRef = useRef(onCountySelect);
  const dataLoadedRef = useRef(false);
  const labelLayerRef = useRef(null);
  const leafletRef = useRef(null);

  const [isClient, setIsClient] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    selectedCountyRef.current = normalize(selectedCounty);
    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.setStyle(feature => computeStyle(feature));
    }
  }, [selectedCounty]);

  useEffect(() => {
    onSelectRef.current = onCountySelect;
  }, [onCountySelect]);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  const styles = useMemo(() => ({
    default: {
      weight: 1,
      color: 'rgba(67, 74, 105, 0.8)',
      fillColor: 'rgba(64, 70, 96, 0.85)',
      fillOpacity: 0.85,
    },
    hover: {
      weight: 1.8,
      color: 'rgba(180, 142, 255, 0.9)',
      fillColor: 'rgba(155, 120, 233, 0.95)',
      fillOpacity: 0.95,
    },
    selected: {
      weight: 2.2,
      color: 'rgba(255, 255, 255, 0.95)',
      fillColor: 'rgba(216, 180, 254, 0.95)',
      fillOpacity: 1,
    },
  }), []);

  const computeStyle = feature => {
    const countyName = normalize(feature?.properties?.name);
    const active = selectedCountyRef.current;
    if (countyName && active && countyName === active) {
      return styles.selected;
    }

    return styles.default;
  };

  const attachFeatureHandlers = (feature, layer) => {
    const countyName = feature?.properties?.name;
    if (!countyName) {
      return;
    }

    layer.on({
      mouseover: () => layer.setStyle(styles.hover),
      mouseout: () => layer.setStyle(computeStyle(feature)),
      click: () => onSelectRef.current?.(countyName),
    });

    layer.bindTooltip(countyName, {
      sticky: true,
      direction: 'top',
      offset: [0, -10],
      opacity: 0.9,
      className: 'about-sauti__map-tooltip',
    });
  };

  useEffect(() => {
    if (!isClient || mapRef.current || !containerRef.current) {
      return;
    }

    let cancelled = false;
    let resizeHandler;

    (async () => {
      try {
        const leaflet = await import('../../../../vendor/leaflet/leaflet-src.esm.js');
        leafletRef.current = leaflet;
        if (cancelled) {
          return;
        }

        const map = leaflet.map(containerRef.current, {
          center: DEFAULT_CENTER,
          zoom: DEFAULT_ZOOM,
          scrollWheelZoom: true,
          doubleClickZoom: false,
          zoomControl: true,
          attributionControl: false,
          preferCanvas: true,
          dragging: false,
          touchZoom: false,
          boxZoom: false,
          keyboard: false,
        });

        map.dragging.disable();
        map.touchZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();

        const layer = leaflet.geoJSON(null, {
          style: feature => computeStyle(feature),
          onEachFeature: attachFeatureHandlers,
        });

        layer.addTo(map);

        mapRef.current = map;
        geoJsonLayerRef.current = layer;

        resizeHandler = () => map.invalidateSize();
        window.addEventListener('resize', resizeHandler);

        if (typeof ResizeObserver !== 'undefined') {
          const observer = new ResizeObserver(resizeHandler);
          observer.observe(containerRef.current);
          resizeObserverRef.current = observer;
        }

        setMapInitialized(true);
      } catch (error) {
        console.warn('Unable to initialize Kenya counties map', error);
        setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      dataLoadedRef.current = false;

      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
      }

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }

      if (labelLayerRef.current) {
        labelLayerRef.current.remove();
        labelLayerRef.current = null;
      }

      if (geoJsonLayerRef.current) {
        geoJsonLayerRef.current.remove();
        geoJsonLayerRef.current = null;
      }

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      leafletRef.current = null;
    };
  }, [isClient]);

  useEffect(() => {
    if (!mapInitialized || dataLoadedRef.current || !geoJsonLayerRef.current || !leafletRef.current) {
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    const leaflet = leafletRef.current;
    fetch(DATA_PATH)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load ${DATA_PATH}`);
        }

        return response.json();
      })
      .then(data => {
        if (cancelled) {
          return;
        }

        dataLoadedRef.current = true;

        const layer = geoJsonLayerRef.current;
        layer.clearLayers();
        layer.addData(data);
        layer.setStyle(feature => computeStyle(feature));

        const bounds = layer.getBounds?.();
        if (bounds?.isValid() && mapRef.current) {
          const padded = bounds.pad(0.05);
          mapRef.current.fitBounds(padded, { padding: [20, 20] });
          mapRef.current.setMinZoom(mapRef.current.getZoom());
          mapRef.current.setMaxBounds(padded);
        }

        if (leaflet) {
          if (!labelLayerRef.current) {
            labelLayerRef.current = leaflet.layerGroup().addTo(mapRef.current);
          } else {
            labelLayerRef.current.clearLayers();
          }

          data.features?.forEach(feature => {
            const countyName = feature?.properties?.name;
            const abbreviation = getCountyAbbreviation(countyName);
            if (!countyName || !abbreviation) {
              return;
            }

            const tempLayer = leaflet.geoJSON(feature);
            const featureBounds = tempLayer.getBounds();
            tempLayer.remove();

            if (!featureBounds?.isValid()) {
              return;
            }

            const center = featureBounds.getCenter();
            leaflet
              .marker(center, {
                interactive: false,
                icon: leaflet.divIcon({
                  className: 'about-sauti__map-label',
                  html: `<span>${abbreviation}</span>`,
                }),
              })
              .addTo(labelLayerRef.current);
          });
        }

        setIsLoading(false);
      })
      .catch(error => {
        if (!cancelled) {
          console.warn('Unable to load Kenya counties data', error);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [mapInitialized]);

  if (!isClient) {
    return (
      <div className='about-sauti__map about-sauti__map--placeholder'>
        <span>{loadingLabel || 'Loading county map…'}</span>
      </div>
    );
  }

  return (
    <div className='about-sauti__map'>
      <div ref={containerRef} className='about-sauti__leaflet' role='presentation' aria-hidden />
      {isLoading && (
        <div className='about-sauti__map-overlay'>
          <span>{loadingLabel || 'Loading county map…'}</span>
        </div>
      )}
    </div>
  );
};

KenyaCountiesMap.propTypes = {
  selectedCounty: PropTypes.string,
  onCountySelect: PropTypes.func,
  loadingLabel: PropTypes.string,
};

export default KenyaCountiesMap;
