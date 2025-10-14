import React, { useState, useMemo } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapComponent.css';

// Location data structure interface
interface Location {
  coordinates: [number, number];
  title: string;
  type: 'port' | 'train' | 'industrial' | 'customs' | 'osb' | 'project';
  description: string;
}

// Initial view state interface
interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
}

// Component props interface
interface MapComponentProps {
  locations: Location[];
  mapStyle: string;
  initialViewState?: ViewState;
  width?: string;
  height?: string;
  className?: string;
}

// Custom SVG Icons for different location types
const getLocationIcon = (type: string) => {
  const iconStyle = {
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
  };

  switch (type) {
    case 'port':
      return (
        <div style={iconStyle} className="map-marker port-marker">
          <svg viewBox="0 0 40 40" className="marker-icon">
            <circle cx="20" cy="20" r="18" className="marker-bg port-bg"/>
            <svg x="10" y="10" width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3H13z"/>
            </svg>
          </svg>
        </div>
      );
    
    case 'train':
      return (
        <div style={iconStyle} className="map-marker train-marker">
          <svg viewBox="0 0 40 40" className="marker-icon">
            <circle cx="20" cy="20" r="18" className="marker-bg train-bg"/>
            <svg x="8" y="8" width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2c-4.42 0-8 3.58-8 8v6c0 1.1.9 2 2 2h1c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h1c1.1 0 2-.9 2-2v-6c0-4.42-3.58-8-8-8zM6.5 17c-.83 0-1.5-.67-1.5-1.5S5.67 14 6.5 14s1.5.67 1.5 1.5S7.33 17 6.5 17zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 7c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3z"/>
            </svg>
          </svg>
        </div>
      );
    
    case 'industrial':
    case 'osb':
      return (
        <div style={iconStyle} className="map-marker industrial-marker">
          <svg viewBox="0 0 40 40" className="marker-icon">
            <circle cx="20" cy="20" r="18" className="marker-bg industrial-bg"/>
            <svg x="8" y="8" width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 3L2 12h3v8h14v-8h3L12 3zm2 14h-4v-4h4v4z"/>
            </svg>
          </svg>
        </div>
      );
    
    case 'customs':
      return (
        <div style={iconStyle} className="map-marker customs-marker">
          <svg viewBox="0 0 40 40" className="marker-icon">
            <circle cx="20" cy="20" r="18" className="marker-bg customs-bg"/>
            <svg x="8" y="8" width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
            </svg>
          </svg>
        </div>
      );
    
    case 'project':
      return (
        <div style={iconStyle} className="map-marker project-marker">
          <svg viewBox="0 0 40 40" className="marker-icon">
            <circle cx="20" cy="20" r="18" className="marker-bg project-bg"/>
            <svg x="6" y="6" width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <circle cx="20" cy="20" r="12" className="project-pulse"/>
          </svg>
        </div>
      );
    
    default:
      return (
        <div style={iconStyle} className="map-marker default-marker">
          <svg viewBox="0 0 40 40" className="marker-icon">
            <circle cx="20" cy="20" r="18" className="marker-bg default-bg"/>
            <circle cx="20" cy="20" r="6" fill="white"/>
          </svg>
        </div>
      );
  }
};

const MapComponent: React.FC<MapComponentProps> = ({ 
  locations, 
  mapStyle, 
  initialViewState,
  width = '100%',
  height = '100%',
  className = ''
}) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  
  // Debug logging
  React.useEffect(() => {
    console.log('MapComponent props:', {
      locations: locations.length,
      mapStyle,
      initialViewState,
      token: import.meta.env.VITE_MAPBOX_TOKEN ? 'Present' : 'Missing'
    });
  }, [locations, mapStyle, initialViewState]);

  // Calculate bounds to fit all locations if no initial view state provided
  const calculatedViewState = useMemo(() => {
    if (initialViewState) return initialViewState;
    
    if (locations.length === 0) {
      return { longitude: 0, latitude: 0, zoom: 1 };
    }

    const lngs = locations.map(loc => loc.coordinates[0]);
    const lats = locations.map(loc => loc.coordinates[1]);
    
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    
    const centerLng = (minLng + maxLng) / 2;
    const centerLat = (minLat + maxLat) / 2;
    
    // Simple zoom calculation based on bounds
    const lngDiff = maxLng - minLng;
    const latDiff = maxLat - minLat;
    const maxDiff = Math.max(lngDiff, latDiff);
    
    let zoom = 10;
    if (maxDiff < 0.01) zoom = 14;
    else if (maxDiff < 0.05) zoom = 12;
    else if (maxDiff < 0.1) zoom = 11;
    else if (maxDiff < 0.5) zoom = 9;
    else zoom = 8;
    
    return {
      longitude: centerLng,
      latitude: centerLat,
      zoom
    };
  }, [locations, initialViewState]);

  if (mapError) {
    return (
      <div className={`mapbox-container ${className}`} style={{ width, height }}>
        <div className="flex items-center justify-center h-full text-white">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">Map Error</h3>
            <p className="text-sm text-gray-300">{mapError}</p>
            <p className="text-xs text-gray-400 mt-2">Check console for details</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mapbox-container ${className}`} style={{ width, height }}>
      <Map
        initialViewState={calculatedViewState}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapStyle}
        attributionControl={false}
        interactive={true}
        cooperativeGestures={false}
        onError={(evt) => {
          console.error('Mapbox error:', evt);
          setMapError(`Map failed to load: ${evt.error?.message || 'Unknown error'}`);
        }}
        onLoad={() => {
          console.log('Map loaded successfully');
        }}
      >
        {/* Navigation Controls */}
        <NavigationControl position="top-right" showCompass={false} />
        
        {/* Location Markers */}
        {locations.map((location, index) => (
          <Marker
            key={`marker-${index}`}
            longitude={location.coordinates[0]}
            latitude={location.coordinates[1]}
            anchor="bottom"
            onClick={(e: any) => {
              e.originalEvent.stopPropagation();
              setSelectedLocation(location);
            }}
          >
            {getLocationIcon(location.type)}
          </Marker>
        ))}

        {/* Interactive Popup */}
        {selectedLocation && (
          <Popup
            longitude={selectedLocation.coordinates[0]}
            latitude={selectedLocation.coordinates[1]}
            onClose={() => setSelectedLocation(null)}
            anchor="top"
            closeButton={true}
            className="custom-popup"
            maxWidth="300px"
          >
            <div className="popup-content">
              <h3 className="popup-title">{selectedLocation.title}</h3>
              <p className="popup-description">{selectedLocation.description}</p>
              <div className="popup-type">
                <span className={`type-badge ${selectedLocation.type}`}>
                  {selectedLocation.type.toUpperCase()}
                </span>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapComponent;