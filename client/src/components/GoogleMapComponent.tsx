import React, { useCallback, useRef } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

interface Location {
  coordinates: [number, number];
  title: string;
  type: 'port' | 'train' | 'industrial' | 'customs' | 'osb' | 'project' | 'factory';
  description: string;
}

interface GoogleMapProps {
  locations: Location[];
  width?: string;
  height?: string;
  className?: string;
}

// Map component that renders the actual Google Map
const Map: React.FC<{
  locations: Location[];
  style: React.CSSProperties;
}> = ({ locations, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const initMap = useCallback(() => {
    if (!ref.current) return;

    // Center map on Turkey/Kapaklı area
    const center = { lat: 41.2867, lng: 28.0719 }; // Kapaklı coordinates

    mapRef.current = new window.google.maps.Map(ref.current, {
      center,
      zoom: 10,
      mapTypeId: 'roadmap',
      styles: [
        // Custom styling to make it look professional
        {
          featureType: 'all',
          elementType: 'geometry',
          stylers: [{ color: '#f5f5f5' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#c9c9c9' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#ffffff' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#dadada' }]
        }
      ]
    });

    // Add markers for each location
    locations.forEach((location) => {
      const marker = new window.google.maps.Marker({
        position: { lat: location.coordinates[1], lng: location.coordinates[0] },
        map: mapRef.current!,
        title: location.title,
        icon: {
          url: getMarkerIcon(location.type),
          scaledSize: new window.google.maps.Size(32, 32)
        }
      });

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 250px;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">${location.title}</h3>
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px; line-height: 1.4;">${location.description}</p>
            <span style="display: inline-block; padding: 4px 8px; background: #e5e7eb; color: #374151; font-size: 12px; border-radius: 4px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">${location.type}</span>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(mapRef.current!, marker);
      });
    });

  }, [locations]);

  React.useEffect(() => {
    initMap();
  }, [initMap]);

  return <div ref={ref} style={style} />;
};

// Helper function to get marker icons based on location type
const getMarkerIcon = (type: string): string => {
  const baseUrl = 'https://maps.google.com/mapfiles/ms/icons/';
  
  switch (type) {
    case 'port':
      return `${baseUrl}blue-dot.png`;
    case 'train':
      return `${baseUrl}green-dot.png`;
    case 'industrial':
      return `${baseUrl}yellow-dot.png`;
    case 'customs':
      return `${baseUrl}red-dot.png`;
    case 'osb':
      return `${baseUrl}purple-dot.png`;
    case 'project':
      return `${baseUrl}orange-dot.png`;
    case 'factory':
      return `${baseUrl}orange-dot.png`;
    default:
      return `${baseUrl}red-dot.png`;
  }
};

// Loading component
const LoadingComponent: React.FC = () => (
  <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
      <p className="text-sm text-gray-600">Harita yükleniyor...</p>
    </div>
  </div>
);

// Error component
const ErrorComponent: React.FC = () => (
  <div className="flex items-center justify-center h-full bg-red-50 rounded-lg border border-red-200">
    <div className="text-center p-4">
      <div className="text-red-500 mb-2">⚠️</div>
      <p className="text-sm text-red-600 mb-2">Google Maps yüklenemedi</p>
      <p className="text-xs text-red-500">API anahtarını kontrol edin</p>
    </div>
  </div>
);

// Render function for different loading states
const render = (status: Status): React.ReactElement => {
  switch (status) {
    case Status.LOADING:
      return <LoadingComponent />;
    case Status.FAILURE:
      return <ErrorComponent />;
    case Status.SUCCESS:
      return <div />; // This won't be used as Map component will render
  }
};

// Main Google Maps component
const GoogleMapComponent: React.FC<GoogleMapProps> = ({ 
  locations, 
  width = '100%', 
  height = '400px',
  className = ''
}) => {
  const mapStyle: React.CSSProperties = {
    width,
    height,
    borderRadius: '12px',
    overflow: 'hidden'
  };

  return (
    <div className={`relative ${className}`}>
      <Wrapper 
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY'}
        render={render}
        libraries={['places']}
      >
        <Map locations={locations} style={mapStyle} />
      </Wrapper>
    </div>
  );
};

export default GoogleMapComponent;