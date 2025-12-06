import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import LeafletMap from '../LeafletMap';
import { Location as MapLocation } from '../../data/mapData';

interface SectionLocation {
  id: number;
  name: string;
  coordinates: { lat: number; lng: number };
  distance: number;
  distanceText: string;
  type: 'port' | 'train' | 'industrial' | 'customs' | 'osb' | 'project';
  description: string;
  polyline?: [number, number][];
}

export default function StrategicLocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedSectionLocation, setSelectedSectionLocation] = useState<SectionLocation | null>(null);
  const [activeLayer, setActiveLayer] = useState<'strategic' | 'brands'>('strategic');

  // Model Sanayi Merkezi coordinates
  const modelSanayiMerkezi: SectionLocation = {
    id: 0,
    name: 'MODEL SANAYİ MERKEZİ',
    coordinates: { lat: 41.2797282, lng: 27.9278201 },
    distance: 0,
    distanceText: '0 KM',
    type: 'project',
    description: 'Ana Proje Lokasyonu'
  };

  const strategicLocations: SectionLocation[] = [
    modelSanayiMerkezi,
    {
      id: 1,
      name: 'KOSB - KAPAKLI OSB',
      coordinates: { lat: 41.274945, lng: 27.984066 },
      distance: 5,
      distanceText: '5 KM',
      type: 'osb',
      description: 'Kapaklı Organize Sanayi Bölgesi'
    },
    {
      id: 2,
      name: 'YÜKSEK HIZLI TREN',
      coordinates: { lat: 41.283472, lng: 27.928667 },
      distance: 1,
      distanceText: '1 KM',
      type: 'train',
      description: 'Hızlı Tren İstasyonu'
    },
    {
      id: 3,
      name: 'GÜMRÜK MÜDÜRLÜĞÜ',
      coordinates: { lat: 41.3139832, lng: 27.9790325 },
      distance: 8,
      distanceText: '8 KM',
      type: 'customs',
      description: 'Çerkezköy Gümrük Müdürlüğü'
    },
    {
      id: 4,
      name: 'ASYAPORT LİMAN',
      coordinates: { lat: 40.9014284, lng: 27.4673351 },
      distance: 75,
      distanceText: '75 KM',
      type: 'port',
      description: 'Asyaport Limanı'
    }
  ];

  const brandLocations: SectionLocation[] = [
    modelSanayiMerkezi,
    {
      id: 101,
      name: 'Samsung',
      coordinates: { lat: 41.3300, lng: 27.9900 },
      distance: 0,
      distanceText: '',
      type: 'industrial',
      description: 'Kapaklı - Mimar Sinan Mahallesi'
    },
    {
      id: 102,
      name: 'Bosch',
      coordinates: { lat: 41.325441, lng: 27.991513 },
      distance: 0,
      distanceText: '',
      type: 'industrial',
      description: 'Kapaklı - Cumhuriyet, Çerkezköy Saray Yolu'
    },
    {
      id: 103,
      name: 'Siemens',
      coordinates: { lat: 41.283564, lng: 28.000534 },
      distance: 0,
      distanceText: '',
      type: 'industrial',
      description: 'Çerkezköy - Gazi Mustafa Kemalpaşa, Atatürk Cd.'
    },
    {
      id: 107,
      name: 'LG',
      coordinates: { lat: 41.334785, lng: 27.974661 },
      distance: 0,
      distanceText: '',
      type: 'industrial',
      description: 'Kapaklı - Atatürk Cd. (KAPAKLI ELEKTRONİK)'
    },
    {
      id: 109,
      name: 'Sony',
      coordinates: { lat: 41.147857, lng: 27.805157 },
      distance: 0,
      distanceText: '',
      type: 'industrial',
      description: 'Çorlu - Rumeli Sitesi, Şinasi Kurşun Cd.'
    },
    {
      id: 110,
      name: 'Panasonic',
      coordinates: { lat: 41.336234, lng: 27.977913 },
      distance: 0,
      distanceText: '',
      type: 'industrial',
      description: 'Kapaklı - Erbay Cd. (Tekin Teknik Servis)'
    }
  ];

  const currentLocations = activeLayer === 'strategic' ? strategicLocations : brandLocations;

  // Transform to MapLocation format for LeafletMap
  const mapLocations: MapLocation[] = useMemo(() => {
    return currentLocations.map(loc => ({
      coordinates: [loc.coordinates.lng, loc.coordinates.lat],
      title: loc.name,
      type: loc.type,
      description: loc.description,
      polyline: loc.polyline
    }));
  }, [currentLocations]);

  // Find the corresponding MapLocation for the selected SectionLocation
  const selectedMapLocation = useMemo(() => {
    if (!selectedSectionLocation) return null;
    return mapLocations.find(l => l.title === selectedSectionLocation.name) || null;
  }, [selectedSectionLocation, mapLocations]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.fromTo('.location-card',
              { opacity: 0, y: 20, scale: 0.9 },
              { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
            );

            gsap.fromTo('.map-container',
              { opacity: 0, scale: 0.95 },
              { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
            );
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLocationClick = (location: SectionLocation) => {
    if (location.id === 0) {
      setSelectedSectionLocation(null);
      return;
    }
    setSelectedSectionLocation(location);
  };

  const handleMapLocationSelect = (location: MapLocation | null) => {
    if (!location) {
      setSelectedSectionLocation(null);
      return;
    }
    const found = currentLocations.find(l => l.name === location.title);
    if (found) {
      setSelectedSectionLocation(found);
    }
  };

  return (
    <section ref={sectionRef} className="section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" data-testid="strategic-location-section">
      <div className="w-full h-full pl-12 pr-32 py-6 overflow-hidden">

        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight py-2" style={{
            background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            STRATEJİK LOKASYON
          </h1>
        </div>

        <div className="w-full h-[80vh] flex gap-4">

          <div className="w-80 flex-shrink-0 flex flex-col gap-3 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {/* Layer Toggles */}
            <div className="flex gap-2 mb-2">
              <button
                className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all ${activeLayer === 'strategic'
                  ? 'bg-[#ff6b1a] text-white shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                onClick={() => setActiveLayer('strategic')}
              >
                Stratejik
              </button>
              <button
                className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all ${activeLayer === 'brands'
                  ? 'bg-[#ff6b1a] text-white shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                onClick={() => setActiveLayer('brands')}
              >
                Markalar
              </button>
            </div>

            {currentLocations.map((location, index) => (
              <motion.div
                key={location.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLocationClick(location)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`location-card cursor-pointer rounded-xl border p-4 transition-all duration-300 ${selectedSectionLocation?.id === location.id
                  ? 'bg-white/10 border-[#ff6b1a] shadow-[0_0_15px_rgba(255,107,26,0.3)]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                style={{
                  backdropFilter: 'blur(4px)',
                  background: selectedSectionLocation?.id === location.id
                    ? 'linear-gradient(145deg, rgba(255,83,0,0.15), rgba(255,107,26,0.08))'
                    : undefined
                }}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <p className={`font-bold mb-1 ${location.id === 0 ? 'text-base' : 'text-sm'}`} style={{ color: '#ffffff' }}>
                    {location.name}
                  </p>
                  {location.type === 'industrial' && (
                    <p className="text-xs text-white/60">{location.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex-1 relative">
            <div className="map-container opacity-0 h-full rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
              <LeafletMap
                locations={mapLocations}
                selectedLocation={selectedMapLocation}
                onLocationSelect={handleMapLocationSelect}
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}