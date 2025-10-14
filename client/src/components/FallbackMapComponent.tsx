// FallbackMapComponent.tsx - A simple fallback map when Mapbox fails
import React, { useState } from 'react';
import './MapComponent.css';

interface Location {
  coordinates: [number, number];
  title: string;
  type: 'port' | 'train' | 'industrial' | 'customs' | 'osb' | 'project';
  description: string;
}

interface FallbackMapProps {
  locations: Location[];
  width?: string;
  height?: string;
  className?: string;
}

const FallbackMapComponent: React.FC<FallbackMapProps> = ({ 
  locations, 
  width = '100%',
  height = '100%',
  className = ''
}) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Calculate bounds for positioning markers
  const bounds = locations.reduce((acc, loc) => {
    const [lng, lat] = loc.coordinates;
    return {
      minLng: Math.min(acc.minLng, lng),
      maxLng: Math.max(acc.maxLng, lng),
      minLat: Math.min(acc.minLat, lat),
      maxLat: Math.max(acc.maxLat, lat),
    };
  }, {
    minLng: Infinity,
    maxLng: -Infinity,
    minLat: Infinity,
    maxLat: -Infinity,
  });

  const getMarkerPosition = (coordinates: [number, number]) => {
    const [lng, lat] = coordinates;
    const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 80 + 10; // 10% margin
    const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 80 + 10; // 10% margin, flipped Y
    return { left: `${x}%`, top: `${y}%` };
  };

  const getLocationIcon = (type: string) => {
    const iconData = {
      port: { color: '#06b6d4', icon: '⚓', ring: '#0891b2' },
      train: { color: '#3b82f6', icon: '🚄', ring: '#2563eb' },
      industrial: { color: '#10b981', icon: '🏭', ring: '#059669' },
      customs: { color: '#ef4444', icon: '🛂', ring: '#dc2626' },
      osb: { color: '#22c55e', icon: '🏢', ring: '#16a34a' },
      project: { color: '#8b5cf6', icon: '⭐', ring: '#7c3aed' }
    };

    const data = iconData[type as keyof typeof iconData] || iconData.industrial;

    return (
      <div className="relative">
        {/* Pulsing ring for project */}
        {type === 'project' && (
          <div 
            className="absolute inset-0 rounded-full animate-ping opacity-60"
            style={{ 
              backgroundColor: data.color,
              transform: 'scale(1.5)'
            }}
          />
        )}
        
        {/* Main marker */}
        <div 
          className="relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 shadow-xl border-3 border-white hover:scale-110 transition-all duration-300"
          style={{ 
            backgroundColor: data.color,
            boxShadow: `0 4px 20px ${data.color}40, inset 0 1px 0 rgba(255,255,255,0.2)`
          }}
        >
          <div className="text-white text-lg drop-shadow-sm">
            {data.icon}
          </div>
        </div>
        
        {/* Connecting line to ground */}
        <div 
          className="absolute top-full left-1/2 w-0.5 h-3 transform -translate-x-1/2 opacity-60"
          style={{ backgroundColor: data.ring }}
        />
      </div>
    );
  };

  return (
    <div className={`mapbox-container ${className}`} style={{ width, height }}>
      {/* Fallback background */}
      <div 
        className="w-full h-full relative overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%),
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 40%),
            linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.03) 49%, rgba(255,255,255,0.03) 51%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, rgba(255,255,255,0.03) 49%, rgba(255,255,255,0.03) 51%, transparent 52%)
          `,
          backgroundSize: '400% 400%, 600px 600px, 800px 800px, 100px 100px, 100px 100px',
          animation: 'mapBackground 25s ease infinite'
        }}
      >
        {/* Geographical features */}
        <div className="absolute inset-0">
          {/* Sea/Water areas */}
          <div 
            className="absolute opacity-30"
            style={{
              left: '5%',
              bottom: '10%',
              width: '40%',
              height: '30%',
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              borderRadius: '20px 50px 30px 60px',
              filter: 'blur(1px)'
            }}
          />
          
          {/* Highways/Roads */}
          <div 
            className="absolute opacity-20"
            style={{
              left: '20%',
              top: '15%',
              width: '60%',
              height: '3px',
              background: 'linear-gradient(90deg, transparent 0%, #fbbf24 20%, #fbbf24 80%, transparent 100%)',
              transform: 'rotate(-10deg)'
            }}
          />
          <div 
            className="absolute opacity-20"
            style={{
              left: '10%',
              top: '50%',
              width: '70%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, #f59e0b 30%, #f59e0b 70%, transparent 100%)',
              transform: 'rotate(5deg)'
            }}
          />
          
          {/* Railway lines */}
          <div 
            className="absolute opacity-25"
            style={{
              left: '30%',
              top: '25%',
              width: '50%',
              height: '2px',
              background: 'repeating-linear-gradient(90deg, #6b7280 0px, #6b7280 10px, transparent 10px, transparent 15px)',
              transform: 'rotate(-5deg)'
            }}
          />
        </div>
        
        {/* Grid overlay for map-like appearance */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Location markers */}
        {locations.map((location, index) => (
          <div
            key={`marker-${index}`}
            className="absolute z-10"
            style={getMarkerPosition(location.coordinates)}
            onClick={() => setSelectedLocation(location)}
          >
            {getLocationIcon(location.type)}
            
            {/* Pulsing effect for project marker */}
            {location.type === 'project' && (
              <div 
                className="absolute inset-0 rounded-full animate-ping"
                style={{ backgroundColor: '#8b5cf6', opacity: 0.3 }}
              />
            )}
          </div>
        ))}

        {/* Popup */}
        {selectedLocation && (
          <div className="absolute top-4 left-4 right-4 z-20">
            <div className="bg-gray-900/95 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 text-white shadow-xl">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{selectedLocation.title}</h3>
                <button 
                  onClick={() => setSelectedLocation(null)}
                  className="text-gray-400 hover:text-white text-xl leading-none"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-300 text-sm mb-3">{selectedLocation.description}</p>
              <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase type-badge ${selectedLocation.type}`}>
                {selectedLocation.type}
              </span>
            </div>
          </div>
        )}

        {/* Map info and legend */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 text-white border border-gray-700/50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-semibold">Kapaklı Model Sanayi Merkezi</div>
                <div className="text-xs text-gray-400">Stratejik Konum Haritası</div>
              </div>
              <div className="text-xs text-gray-500">
                {locations.length} Lokasyon
              </div>
            </div>
            
            {/* Quick legend */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                <span>Liman</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Tren</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span>Proje</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-400 mt-2 text-center">
              📍 İşaretçilere tıklayarak detayları görün
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default FallbackMapComponent;