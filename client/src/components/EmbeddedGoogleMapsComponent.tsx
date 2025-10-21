import React, { useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';

interface Location {
  id: number;
  title: string;
  type: 'port' | 'train' | 'industrial' | 'customs' | 'osb' | 'factory';
  description: string;
  coordinates: { lat: number; lng: number };
  distance: string;
}

interface EmbeddedGoogleMapsComponentProps {
  showAllLocations?: boolean;
}

// Add CSS to hide watermark
const mapStyles = `
  /* Hide all Google Maps attribution and development text */
  .gm-style > div:last-child > div {
    display: none !important;
  }
  
  .gm-style-cc {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
  }
  
  .gm-style .gm-style-cc {
    display: none !important;
  }
  
  /* Hide all span elements that might contain watermark text */
  .gm-style span {
    font-size: 0 !important;
  }
  
  /* Specifically target development text divs */
  div[style*="font-size: 11px"] {
    display: none !important;
  }
  
  /* Hide Google branding at bottom */
  .gm-logo-link {
    display: none !important;
  }
  
  /* Hide all text that might be watermark */
  .gm-style div span[style*="Arial"] {
    display: none !important;
  }
  
  /* Alternative approach - hide all overlays */
  .gm-style > div:nth-child(1) > div:nth-child(5) {
    display: none !important;
  }
`;

// Inject CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = mapStyles;
  document.head.appendChild(style);
}

const locations: Location[] = [
  {
    id: 1,
    title: "KAPAKLI MODEL SANAYİ MERKEZİ",
    type: "factory",
    description: "Ana proje lokasyonu - Modern sanayi merkezi",
    coordinates: { lat: 41.2797282, lng: 27.9278201 },
    distance: "0 KM"
  },
  {
    id: 2,
    title: "Asyaport Liman A.Ş.",
    type: "port",
    description: "Uluslararası konteyner limanı",
    coordinates: { lat: 40.9014284, lng: 27.4673351 },
    distance: "75 KM"
  },
  {
    id: 3,
    title: "Çerkezköy Organize Sanayi Bölge Müdürlüğü",
    type: "industrial",
    description: "Çerkezköy OSB yönetim merkezi",
    coordinates: { lat: 41.3139832, lng: 27.9790325 },
    distance: "3 KM"
  },
  {
    id: 4,
    title: "KOSB - KAPAKLI ORGANİZE SANAYİ BÖLGESİ",
    type: "osb",
    description: "Kapaklı Organize Sanayi Bölgesi",
    coordinates: { lat: 41.289509, lng: 27.948947 },
    distance: "1 KM"
  },
  {
    id: 5,
    title: "Çerkezköy Garı (Yüksek Hızlı Tren)",
    type: "train",
    description: "Yüksek hızlı tren istasyonu",
    coordinates: { lat: 41.279138, lng: 28.009901 },
    distance: "1 KM"
  }
];

const EmbeddedGoogleMapsComponent: React.FC<EmbeddedGoogleMapsComponentProps> = ({ showAllLocations = true }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [googleMaps, setGoogleMaps] = useState<any>(null);

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  };

  const center = {
    lat: 41.15,
    lng: 27.8
  };

  const mapOptions = {
    zoom: 9,
    mapTypeId: 'satellite',
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    zoomControl: false,
    gestureHandling: 'greedy',
    disableDefaultUI: false,
    scrollwheel: true,
    styles: [
      {
        featureType: 'administrative',
        elementType: 'labels.text',
        stylers: [
          { visibility: 'on' },
          { color: '#ffffff' },
          { weight: '1' }
        ]
      },
      {
        featureType: 'locality',
        elementType: 'labels.text',
        stylers: [
          { visibility: 'on' },
          { color: '#ffffff' }
        ]
      },
      {
        featureType: 'water',
        elementType: 'labels',
        stylers: [
          { visibility: 'on' }
        ]
      }
    ]
  };

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'factory': return '#f97316';
      case 'port': return '#dc2626';
      case 'industrial': return '#f59e0b';
      case 'osb': return '#7c3aed';
      case 'train': return '#22c55e';
      default: return '#3b82f6';
    }
  };

  const createCustomIcon = (type: string) => {
    const color = getLocationColor(type);
    if (!googleMaps) return undefined;
    
    // Create pin-style markers instead of circles
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg width="50" height="60" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
          <!-- Pin shape -->
          <path d="M 25 5 C 14 5, 5 14, 5 25 C 5 40, 25 58, 25 58 C 25 58, 45 40, 45 25 C 45 14, 36 5, 25 5 Z" fill="${color}" stroke="white" stroke-width="2"/>
          <!-- Inner circle -->
          <circle cx="25" cy="25" r="10" fill="white" opacity="0.9"/>
          <!-- Icon -->
          <circle cx="25" cy="25" r="6" fill="${color}"/>
        </svg>
      `)}`,
      scaledSize: new googleMaps.Size(50, 60),
      anchor: new googleMaps.Point(25, 60),
      labelOrigin: new googleMaps.Point(25, 20)
    };
  };

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="flex-1 relative">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={mapOptions.zoom}
            options={mapOptions}
            onLoad={map => {
              setGoogleMaps(window.google.maps);
              
              // Add overlay to cover watermark areas
              const overlay = document.createElement('div');
              overlay.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 60px;
                background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.3));
                pointer-events: none;
                z-index: 999;
              `;
              const mapContainer = document.querySelector('[role="region"]')?.parentElement;
              if (mapContainer) {
                mapContainer.appendChild(overlay);
              }
            }}
          >
            {/* Render all location markers */}
            {locations.map((location) => (
              <MarkerF
                key={location.id}
                position={location.coordinates}
                icon={googleMaps ? createCustomIcon(location.type) : undefined}
                onClick={() => setSelectedLocation(location)}
              />
            ))}

            {/* Info Window for selected location */}
            {selectedLocation && (
              <InfoWindowF
                position={selectedLocation.coordinates}
                onCloseClick={() => setSelectedLocation(null)}
              >
                <div className="p-3 max-w-xs bg-white rounded-xl shadow-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-lg"
                      style={{ backgroundColor: getLocationColor(selectedLocation.type) }}
                    >
                      {selectedLocation.type === 'train' && '🚄'}
                      {selectedLocation.type === 'port' && '🚢'}
                      {selectedLocation.type === 'factory' && '🏭'}
                      {selectedLocation.type === 'osb' && '🏗️'}
                      {selectedLocation.type === 'industrial' && '🏢'}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{selectedLocation.title}</h4>
                      <p className="text-gray-600 text-xs">{selectedLocation.distance}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{selectedLocation.description}</p>
                </div>
              </InfoWindowF>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default EmbeddedGoogleMapsComponent;