import React, { useState } from 'react';
import { Map, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const locations = [
  {
    id: 1,
    name: "Asyaport Liman A.Ş.",
    type: "port",
    address: "Barbaros, 59020 Süleymanpaşa/Tekirdağ",
    phone: "+90 282 283 46 00",
    website: "http://www.asyaport.com/",
    coordinates: { longitude: 27.5303, latitude: 40.9419 }
  },
  {
    id: 2,
    name: "Çerkezköy Organize Sanayi Bölge Müdürlüğü",
    type: "industrial",
    address: "İsmet Paşa OSB, Fatih Bulvarı No:6, 59510 Kapaklı/Tekirdağ",
    phone: "+90 282 758 11 56",
    website: "http://www.cosb.org.tr/",
    coordinates: { longitude: 28.0115, latitude: 41.2844 }
  },
  {
    id: 3,
    name: "KOSB - KAPAKLI ORGANİZE SANAYİ BÖLGESİ",
    type: "industrial",
    address: "Mimar Sinan, Baran Sk. No:5, 59500 Kapaklı/Tekirdağ",
    phone: "+90 282 758 38 13",
    website: "http://www.kapakliosb.org.tr/",
    coordinates: { longitude: 27.9691, latitude: 41.2995 }
  },
  {
    id: 4,
    name: "Çerkezköy Garı (Train Station)",
    type: "train",
    address: "İstasyon Cd., 59500 Çerkezköy/Tekirdağ",
    phone: "+90 444 82 33",
    website: null,
    coordinates: { longitude: 28.0041, latitude: 41.2785 }
  },
  {
    id: 5,
    name: "Çerkezköy Gümrük Müdürlüğü (Customs)",
    type: "customs",
    address: "Otogar Yanı, İnönü Caddesi No:5, 59500 Çerkezköy/Tekirdağ",
    phone: null,
    website: null,
    coordinates: { longitude: 28.0090, latitude: 41.2798 }
  },
  {
    id: 6,
    name: "KAPAKLI MODEL SANAYİ MERKEZİ",
    type: "factory",
    address: "Fatih, 105. Cadde, 59510 Kapaklı/Tekirdağ",
    phone: "+90 444 74 13",
    website: "https://modelsanayimerkezi.com/",
    coordinates: { longitude: 27.9634, latitude: 41.3142 }
  }
];

const ProjectLocationsMap: React.FC = () => {
  const [popupInfo, setPopupInfo] = useState<typeof locations[0] | null>(null);
  const [mapError, setMapError] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleMapError = () => {
    setMapError(true);
  };

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  // Fallback map background when Mapbox fails to load
  if (mapError || !import.meta.env.VITE_MAPBOX_TOKEN || import.meta.env.VITE_MAPBOX_TOKEN === "YOUR_MAPBOX_ACCESS_TOKEN") {
    return (
      <div className="w-full h-full relative bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 rounded-lg overflow-hidden">
        {/* Fallback map background with geographic styling */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-green-300 rounded-full opacity-20"></div>
          <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-blue-300 rounded-lg opacity-25"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2/5 h-1/5 bg-yellow-300 rounded opacity-15"></div>
        </div>
        
        {/* Grid pattern for map-like appearance */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* Location markers with absolute positioning */}
        {locations.map((location) => {
          // Convert coordinates to relative positions (simplified)
          const x = ((location.coordinates.longitude - 27.4) / 0.8) * 100;
          const y = (1 - (location.coordinates.latitude - 40.9) / 0.5) * 100;
          
          return (
            <div
              key={location.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ 
                left: `${Math.max(10, Math.min(90, x))}%`, 
                top: `${Math.max(10, Math.min(90, y))}%` 
              }}
              onClick={() => setPopupInfo(location)}
            >
              <img
                src={`/icons/${location.type}.svg`}
                alt={location.name}
                className="custom-marker-icon"
              />
            </div>
          );
        })}

        {/* Popup for fallback map */}
        {popupInfo && (
          <div className="absolute top-4 left-4 right-4 z-20 bg-white rounded-lg shadow-lg p-4 max-w-sm">
            <button
              onClick={() => setPopupInfo(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
            <div className="popup-content">
              <h3 className="popup-title">{popupInfo.name}</h3>
              <div className="popup-details">
                <p className="popup-address">{popupInfo.address}</p>
                {popupInfo.phone && (
                  <p className="popup-phone">
                    <strong>Tel:</strong> {popupInfo.phone}
                  </p>
                )}
                {popupInfo.website && (
                  <p className="popup-website">
                    <a href={popupInfo.website} target="_blank" rel="noopener noreferrer">
                      Website
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Map unavailable notice */}
        <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-2 rounded">
          Harita yüklenemedi - Konumlar yaklaşık olarak gösterilmektedir
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {/* Loading overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center z-10 rounded-lg">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm">Harita yükleniyor...</p>
          </div>
        </div>
      )}
      
      <Map
        initialViewState={{
          longitude: 27.9,
          latitude: 41.15,
          zoom: 9
        }}
        style={{ 
          width: '100%', 
          height: '100%',
          backgroundColor: '#1e293b' // Fallback background color
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        attributionControl={false}
        onError={handleMapError}
        onLoad={handleMapLoad}
        reuseMaps
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            longitude={location.coordinates.longitude}
            latitude={location.coordinates.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(location);
            }}
          >
            <img
              src={`/icons/${location.type}.svg`}
              alt={location.name}
              className="custom-marker-icon"
              style={{ cursor: 'pointer' }}
            />
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.coordinates.longitude}
            latitude={popupInfo.coordinates.latitude}
            onClose={() => setPopupInfo(null)}
            closeButton={true}
            closeOnClick={false}
          >
            <div className="popup-content">
              <h3 className="popup-title">{popupInfo.name}</h3>
              <div className="popup-details">
                <p className="popup-address">{popupInfo.address}</p>
                {popupInfo.phone && (
                  <p className="popup-phone">
                    <strong>Tel:</strong> {popupInfo.phone}
                  </p>
                )}
                {popupInfo.website && (
                  <p className="popup-website">
                    <a href={popupInfo.website} target="_blank" rel="noopener noreferrer">
                      Website
                    </a>
                  </p>
                )}
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default ProjectLocationsMap;

/*
CSS Styling for the component:

.custom-marker-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}

.custom-marker-icon:hover {
  transform: scale(1.1);
}

.popup-content {
  padding: 16px;
  min-width: 250px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.popup-title {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.3;
}

.popup-details p {
  margin: 8px 0;
  font-size: 14px;
  color: #4b5563;
  line-height: 1.4;
}

.popup-address {
  color: #6b7280;
}

.popup-phone {
  color: #374151;
}

.popup-website a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.popup-website a:hover {
  text-decoration: underline;
}
*/