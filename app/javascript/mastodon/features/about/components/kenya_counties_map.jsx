import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import '../../../../vendor/leaflet/leaflet.css';

const DEFAULT_CENTER = [-0.2, 37.9];
const DEFAULT_ZOOM = 6;
const DATA_PATH = '/kenya_adm1_full.geojson';

const normalize = value => (value || '').toString().toLowerCase().trim();

const KenyaCountiesMap = ({ selectedCounty, onCountySelect, loadingLabel }) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const geoJsonLayerRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const selectedCountyRef = useRef(normalize(selectedCounty));
  const onSelectRef = useRef(onCountySelect);
  const dataLoadedRef = useRef(false);

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
      weight: 1.2,
      color: 'rgba(15, 23, 42, 0.55)',
      fillColor: 'rgba(148, 163, 184, 0.35)',
      fillOpacity: 0.65,
    },
    hover: {
      weight: 2,
      color: '#0f766e',
      fillColor: 'rgba(14, 116, 144, 0.45)',
      fillOpacity: 0.78,
    },
    selected: {
      weight: 2.4,
      color: '#16a34a',
      fillColor: 'rgba(22, 163, 74, 0.65)',
      fillOpacity: 0.9,
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
        if (cancelled) {
          return;
        }

        const map = leaflet.map(containerRef.current, {
          center: DEFAULT_CENTER,
          zoom: DEFAULT_ZOOM,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          zoomControl: false,
          attributionControl: false,
          preferCanvas: true,
        });

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

      if (geoJsonLayerRef.current) {
        geoJsonLayerRef.current.remove();
        geoJsonLayerRef.current = null;
      }

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

    };
  }, [isClient]);

  useEffect(() => {
    if (!mapInitialized || dataLoadedRef.current || !geoJsonLayerRef.current) {
      return;
    }

    let cancelled = false;
    setIsLoading(true);

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
          mapRef.current.fitBounds(bounds, { padding: [20, 20] });
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
