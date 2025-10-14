// SimpleMapComponent.tsx - A clean Google Maps-like component
import React, { useState } from 'react';
import './SimpleMapComponent.css';

interface Location {
  coordinates: [number, number];
  title: string;
  type: 'port' | 'train' | 'industrial' | 'customs' | 'osb' | 'project';
  description: string;
}

interface SimpleMapProps {
  locations: Location[];
  width?: string;
  height?: string;
  className?: string;
}

const SimpleMapComponent: React.FC<SimpleMapProps> = ({ 
  locations, 
  width = '100%',
  height = '100%',
  className = ''
}) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Calculate marker positions relative to the map container
  const getMarkerPosition = (coordinates: [number, number]) => {
    // Map coordinates to percentage positions on the container
    // Centered around Kapaklı area (27.97, 41.27)
    const [lng, lat] = coordinates;
    const centerLng = 27.8;
    const centerLat = 41.2;
    const scale = 15; // Zoom level simulation
    
    const x = 50 + (lng - centerLng) * scale;
    const y = 50 - (lat - centerLat) * scale;
    
    return { 
      left: `${Math.max(5, Math.min(95, x))}%`, 
      top: `${Math.max(5, Math.min(95, y))}%` 
    };
  };

  const getLocationIcon = (type: string) => {
    const iconConfig = {
      port: { icon: '🚢', color: '#0ea5e9', bg: '#0ea5e9' },
      train: { icon: '🚄', color: '#3b82f6', bg: '#3b82f6' },
      industrial: { icon: '🏭', color: '#10b981', bg: '#10b981' },
      customs: { icon: '🏛️', color: '#ef4444', bg: '#ef4444' },
      osb: { icon: '🏢', color: '#22c55e', bg: '#22c55e' },
      project: { icon: '⭐', color: '#8b5cf6', bg: '#8b5cf6' }
    };

    const config = iconConfig[type as keyof typeof iconConfig] || iconConfig.industrial;

    return (
      <div className="map-pin" style={{ '--pin-color': config.bg } as React.CSSProperties}>
        <div className="pin-icon">
          {config.icon}
        </div>
        <div className="pin-point"></div>
        {type === 'project' && <div className="pin-pulse"></div>}
      </div>
    );
  };

  return (
    <div className={`simple-map-container ${className}`} style={{ width, height }}>
      {/* Map Background */}
      <div className="map-background">
        {/* Streets and roads */}
        <div className="road horizontal road-1"></div>
        <div className="road horizontal road-2"></div>
        <div className="road vertical road-3"></div>
        <div className="road vertical road-4"></div>
        <div className="road diagonal road-5"></div>
        
        {/* Areas */}
        <div className="area industrial-area"></div>
        <div className="area water-area"></div>
        <div className="area green-area"></div>
        
        {/* Railways */}
        <div className="railway railway-1"></div>
        <div className="railway railway-2"></div>
      </div>
      
      {/* Location Markers */}
      {locations.map((location, index) => (
        <div
          key={`pin-${index}`}
          className="map-marker"
          style={getMarkerPosition(location.coordinates)}
          onClick={() => setSelectedLocation(location)}
        >
          {getLocationIcon(location.type)}
        </div>
      ))}

      {/* Info Popup */}
      {selectedLocation && (
        <div className="map-popup">
          <div className="popup-header">
            <h3>{selectedLocation.title}</h3>
            <button 
              className="popup-close"
              onClick={() => setSelectedLocation(null)}
            >
              ×
            </button>
          </div>
          <p className="popup-description">{selectedLocation.description}</p>
          <div className="popup-type">
            <span className={`type-badge ${selectedLocation.type}`}>
              {selectedLocation.type.toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {/* Map Controls */}
      <div className="map-controls">
        <button className="zoom-btn">+</button>
        <button className="zoom-btn">−</button>
      </div>

      {/* Map Legend */}
      <div className="map-legend">
        <div className="legend-title">Stratejik Lokasyonlar</div>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-icon">⭐</span>
            <span>Ana Proje</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🚄</span>
            <span>Tren İstasyonu</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🚢</span>
            <span>Liman</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🏭</span>
            <span>Sanayi</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleMapComponent;