import React, { useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';

interface Location {
  id: number;
  title: string;
  type: 'port' | 'train' | 'industrial' | 'customs' | 'osb' | 'factory';
  description: string;
  coordinates: { lat: number; lng: number };
  distance: string;
  icon?: string;
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
  
  /* Hide development purposes only watermark */
  .gm-style div[style*="font-family: Roboto"],
  .gm-style div[style*="font-size: 11px"],
  .gm-style div[style*="font-size: 10px"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
  
  /* Hide watermark container */
  .gm-style > div:nth-child(1) > div:last-child {
    display: none !important;
  }
  
  /* Hide Google branding at bottom */
  .gm-logo-link {
    display: none !important;
  }
  
  /* Target specific watermark divs */
  .gm-style div[draggable="false"][style*="position: absolute"][style*="z-index"] {
    font-size: 0 !important;
  }
  
  .gm-style div[draggable="false"] > div > div {
    display: none !important;
  }
  
  /* Hide control elements that may contain text */
  .gm-style > div > div:not([class]) {
    font-size: 0 !important;
  }
  
  /* Additional watermark hiding */
  .gm-style-moc {
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
    distance: "0 KM",
    icon: "🏭"
  },
  {
    id: 2,
    title: "ASYAPORT LİMAN",
    type: "port",
    description: "Uluslararası konteyner limanı",
    coordinates: { lat: 40.9014284, lng: 27.4673351 },
    distance: "75 KM",
    icon: "🚢"
  },
  {
    id: 3,
    title: "GÜMRÜK MÜDÜRLÜĞÜ",
    type: "industrial",
    description: "Çerkezköy OSB yönetim merkezi",
    coordinates: { lat: 41.3139832, lng: 27.9790325 },
    distance: "8 KM",
    icon: "🏢"
  },
  {
    id: 4,
    title: "KOSB - KAPAKLI OSB",
    type: "osb",
    description: "Kapaklı Organize Sanayi Bölgesi",
    coordinates: { lat: 41.289509, lng: 27.948947 },
    distance: "1 KM",
    icon: "🏗️"
  },
  {
    id: 5,
    title: "YÜKSEK HIZLI TREN",
    type: "train",
    description: "Yüksek hızlı tren istasyonu",
    coordinates: { lat: 41.279138, lng: 28.009901 },
    distance: "1 KM",
    icon: "🚄"
  }
];

const EmbeddedGoogleMapsComponent: React.FC<EmbeddedGoogleMapsComponentProps> = ({ showAllLocations = true }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [openInfoWindows, setOpenInfoWindows] = useState<Set<number>>(new Set(locations.map(l => l.id)));
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
    <div className="w-full h-full flex flex-row relative">
      {/* Map Container */}
      <div className="w-full relative">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={mapOptions.zoom}
            options={mapOptions}
            onLoad={map => {
              setGoogleMaps(window.google.maps);
              
              // Add overlay to cover watermark areas
              setTimeout(() => {
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  height: 80px;
                  background: linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.9));
                  pointer-events: none;
                  z-index: 9999;
                `;
                const mapContainer = document.querySelector('[role="region"]')?.parentElement;
                if (mapContainer) {
                  mapContainer.appendChild(overlay);
                }
                
                // Hide all potential watermark elements
                const watermarkElements = document.querySelectorAll('.gm-style div[style*="font-size"]');
                watermarkElements.forEach(el => {
                  (el as HTMLElement).style.display = 'none';
                });
              }, 500);
            }}
          >
            {/* Render all location markers */}
            {locations.map((location) => (
              <MarkerF
                key={location.id}
                position={location.coordinates}
                icon={googleMaps ? createCustomIcon(location.type) : undefined}
                onClick={() => {
                  setOpenInfoWindows(prev => new Set(prev).add(location.id));
                }}
              />
            ))}

            {/* Show location info cards that are open */}
            {locations.map((location) => (
              openInfoWindows.has(location.id) && !selectedLocation && location.id !== 1 && (
                <InfoWindowF
                  key={`info-${location.id}`}
                  position={location.coordinates}
                  options={{ 
                    disableAutoPan: true,
                    pixelOffset: googleMaps ? new window.google.maps.Size(0, 0) : undefined
                  }}
                  onCloseClick={() => {
                    setOpenInfoWindows(prev => {
                      const newSet = new Set(prev);
                      newSet.delete(location.id);
                      return newSet;
                    });
                  }}
                >
                  <div 
                    className="p-4 max-w-xs bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl hover:scale-105 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLocation(location);
                    }}
                    style={{ minWidth: '240px' }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{location.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm">{location.title}</h4>
                        <p className="text-orange-600 font-semibold text-xs">{location.distance}</p>
                      </div>
                    </div>
                  </div>
                </InfoWindowF>
              )
            ))}

            {/* Expanded detail card when location is selected */}
            {selectedLocation && (
              <InfoWindowF
                position={selectedLocation.coordinates}
                onCloseClick={() => setSelectedLocation(null)}
                options={{ 
                  disableAutoPan: true,
                  pixelOffset: googleMaps ? new window.google.maps.Size(0, 0) : undefined
                }}
              >
                <div className="p-6 bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-xl shadow-2xl border-2 border-orange-500 w-96">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-5xl">{selectedLocation.icon}</span>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{selectedLocation.title}</h3>
                        <p className="text-orange-600 font-semibold text-sm">{selectedLocation.distance}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedLocation(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{selectedLocation.description}</p>
                    
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg space-y-2">
                      <div>
                        <p className="text-xs text-gray-600">
                          <span className="font-semibold text-gray-900">Lokasyon:</span>
                        </p>
                        <p className="text-sm text-gray-800">{selectedLocation.title}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">
                          <span className="font-semibold text-gray-900">Mesafe:</span>
                        </p>
                        <p className="text-sm text-orange-600 font-semibold">{selectedLocation.distance}</p>
                      </div>
                    </div>
                  </div>
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