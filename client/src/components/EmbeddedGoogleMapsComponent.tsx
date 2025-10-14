import React, { useState } from 'react';

interface Location {
  id: number;
  title: string;
  type: 'port' | 'train' | 'industrial' | 'customs' | 'osb' | 'factory';
  description: string;
  coordinates: { lat: number; lng: number };
  distance: string;
  embedUrl: string;
}

const locations: Location[] = [
  {
    id: 1,
    title: "KAPAKLI MODEL SANAYİ MERKEZİ",
    type: "factory",
    description: "Ana proje lokasyonu - Modern sanayi merkezi",
    coordinates: { lat: 41.269682897335, lng: 27.970630606847152 },
    distance: "0 KM",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11995.201372790423!2d27.970630606847152!3d41.269682897335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b527a6f17d7c8f%3A0x51f0853b3f7ae3da!2sModel%20Sanayi%20Merkezi%20Kapakl%C4%B1!5e0!3m2!1sen!2str!4v1760394716687!5m2!1sen!2str"
  },
  {
    id: 2,
    title: "Asyaport Liman A.Ş.",
    type: "port",
    description: "Uluslararası konteyner limanı",
    coordinates: { lat: 40.93436081897144, lng: 27.508699722172217 },
    distance: "75 KM",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20870.86199674222!2d27.508699722172217!3d40.93436081897144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b466b020a3e2cf%3A0x45b4865c79736395!2sAsyaport%20Liman%20A.%C5%9E.!5e0!3m2!1sen!2str!4v1760394928105!5m2!1sen!2str"
  },
  {
    id: 3,
    title: "Çerkezköy Organize Sanayi Bölge Müdürlüğü",
    type: "industrial",
    description: "Çerkezköy OSB yönetim merkezi",
    coordinates: { lat: 41.31398720054284, lng: 27.976457577293424 },
    distance: "3 KM",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.76446888158!2d27.976457577293424!3d41.31398720054284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b52898afcc6bc9%3A0xd421745158cbd4fa!2zw4dlcmtlemvDtnkgT3JnYW5pemUgU2FuYXlpIELDtmxnZSBNw7xkw7xybMO8xJ_DvA!5e0!3m2!1sen!2str!4v1760394984627!5m2!1sen!2str"
  },
  {
    id: 4,
    title: "KOSB - KAPAKLI ORGANİZE SANAYİ BÖLGESİ",
    type: "osb",
    description: "Kapaklı Organize Sanayi Bölgesi",
    coordinates: { lat: 41.289516396747885, lng: 27.943797150480712 },
    distance: "1 KM",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5995.77834900955!2d27.943797150480712!3d41.289516396747885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b527b1c8762547%3A0x4681d851bb6fff1d!2sMimar%20Sinan%2C%20Baran%20Sk.%20KAPAKLI%20OSB%20NO%3A5%20K%3A3%2C%2059510%20Kapakl%C4%B1%2FTekirda%C4%9F!5e0!3m2!1sen!2str!4v1760395021319!5m2!1sen!2str"
  },
  {
    id: 5,
    title: "Çerkezköy Garı (Yüksek Hızlı Tren)",
    type: "train",
    description: "Yüksek hızlı tren istasyonu",
    coordinates: { lat: 41.28460805227061, lng: 27.958268351465446 },
    distance: "1 KM",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28523.034678769793!2d27.958268351465446!3d41.28460805227061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b527a6f17d7c8f%3A0x51f0853b3f7ae3da!2sModel%20Sanayi%20Merkezi%20Kapakl%C4%B1!5e0!3m2!1sen!2str!4v1760394830766!5m2!1sen!2str"
  }
];

const EmbeddedGoogleMapsComponent: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);
  const [showMap, setShowMap] = useState(true);

  // Calculate relative position based on coordinate bounds
  const getMarkerPosition = (location: Location) => {
    // Define bounds for the region (approximate)
    const bounds = {
      north: 41.35,
      south: 40.9,
      east: 28.1,
      west: 27.4
    };

    const x = ((location.coordinates.lng - bounds.west) / (bounds.east - bounds.west)) * 100;
    const y = ((bounds.north - location.coordinates.lat) / (bounds.north - bounds.south)) * 100;

    return {
      left: `${Math.max(5, Math.min(95, x))}%`,
      top: `${Math.max(5, Math.min(95, y))}%`
    };
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

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'factory': return '🏭';
      case 'port': return '🚢';
      case 'industrial': return '🏢';
      case 'osb': return '🏗️';
      case 'train': return '🚄';
      default: return '📍';
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/90 to-accent/90 p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-lg">KAPAKLI MODEL SANAYİ MERKEZİ</h3>
            <p className="text-white/80 text-sm">İnteraktif işaretçilere tıklayın</p>
          </div>
          <button
            onClick={() => setShowMap(!showMap)}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all text-sm"
          >
            {showMap ? 'Detayları Göster' : 'Haritayı Göster'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Full Width Panel - Location Details or Embedded Map */}
        <div className="w-full bg-white flex flex-col">
          {showMap ? (
            /* Embedded Google Maps */
            <div className="flex-1 relative">
              <iframe
                src={selectedLocation.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={selectedLocation.title}
              />
            </div>
          ) : (
            /* Location Information */
            <div className="flex-1 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl"
                  style={{ backgroundColor: getLocationColor(selectedLocation.type) }}
                >
                  {getLocationIcon(selectedLocation.type)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedLocation.title}</h3>
                  <p className="text-gray-600">{selectedLocation.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Mesafe:</span>
                    <span className="text-2xl font-bold" style={{ color: getLocationColor(selectedLocation.type) }}>
                      {selectedLocation.distance}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">Konum Detayları</h4>
                  <p className="text-gray-600 text-sm">{selectedLocation.description}</p>
                </div>

                <button
                  onClick={() => setShowMap(true)}
                  className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold hover:shadow-lg transition-all"
                >
                  Google Maps'te Görüntüle
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Location List */}
      <div className="bg-gray-100 p-4 rounded-b-lg">
        <div className="flex gap-2 overflow-x-auto">
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedLocation.id === location.id
                  ? 'text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-200'
              }`}
              style={{
                backgroundColor: selectedLocation.id === location.id ? getLocationColor(location.type) : undefined
              }}
            >
              {getLocationIcon(location.type)} {location.title.split(' ')[0]}...
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmbeddedGoogleMapsComponent;