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
  polygon?: [number, number][];
  trainPath?: [number, number][];
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
      name: 'ÇERKEZKÖY OSB',
      coordinates: { lat: 41.274945, lng: 27.984066 },
      distance: 5,
      distanceText: '5 KM',
      type: 'osb',
      description: 'Çerkezköy Organize Sanayi Bölgesi',
      polygon: [
        [41.273290, 27.963923],
        [41.275199, 27.962232],
        [41.276455, 27.960153],
        [41.277778, 27.959119],
        [41.280290, 27.961225],
        [41.283262, 27.963547],
        [41.283832, 27.943265],
        [41.287933, 27.943989],
        [41.285999, 27.951457],
        [41.287788, 27.952540],
        [41.287703, 27.954289],
        [41.287985, 27.954632],
        [41.290414, 27.955973],
        [41.294578, 27.958661],
        [41.296459, 27.959724],
        [41.299571, 27.952137],
        [41.302013, 27.952623],
        [41.302956, 27.953664],
        [41.303271, 27.953149],
        [41.303915, 27.953975],
        [41.304278, 27.954318],
        [41.305076, 27.954779],
        [41.305718, 27.955215],
        [41.306043, 27.955273],
        [41.306427, 27.955095],
        [41.306962, 27.954704],
        [41.307076, 27.954677],
        [41.307205, 27.954722],
        [41.307293, 27.954799],
        [41.307412, 27.954949],
        [41.307632, 27.955253],
        [41.307721, 27.955349],
        [41.307912, 27.955438],
        [41.308177, 27.955565],
        [41.308283, 27.955659],
        [41.308341, 27.955848],
        [41.309125, 27.954531],
        [41.309475, 27.954767],
        [41.310753, 27.955368],
        [41.311957, 27.956114],
        [41.312924, 27.957230],
        [41.313992, 27.958362],
        [41.315958, 27.960542],
        [41.314516, 27.968732],
        [41.313573, 27.972294],
        [41.313712, 27.972781],
        [41.313856, 27.973286],
        [41.313847, 27.973873],
        [41.313749, 27.974670],
        [41.313788, 27.974863],
        [41.315786, 27.975088],
        [41.316399, 27.977974],
        [41.317454, 27.979347],
        [41.317172, 27.980925],
        [41.317140, 27.981257],
        [41.318067, 27.981858],
        [41.320299, 27.984476],
        [41.317318, 27.987576],
        [41.317628, 27.988112],
        [41.313279, 27.995531],
        [41.309971, 27.994056],
        [41.308472, 27.997146],
        [41.305901, 27.994598],
        [41.301706, 27.994415],
        [41.296304, 27.997292],
        [41.294765, 27.995380],
        [41.293322, 27.994371],
        [41.291283, 27.993170],
        [41.293774, 27.988117],
        [41.288861, 27.984063],
        [41.285015, 27.980544],
        [41.281193, 27.976907],
        [41.278694, 27.987128],
        [41.275209, 27.986210],
        [41.273306, 27.977292],
        [41.273242, 27.968108],
        [41.272040, 27.964031],
        [41.271927, 27.964041],
        [41.273290, 27.963923]
      ]
    },
    {
      id: 5,
      name: 'KOSB - KAPAKLI OSB',
      coordinates: { lat: 41.269000, lng: 27.935000 },
      distance: 2,
      distanceText: '2 KM',
      type: 'osb',
      description: 'Kapaklı Organize Sanayi Bölgesi',
      polygon: [
        [41.259512, 27.926717],
        [41.261222, 27.931180],
        [41.263125, 27.934785],
        [41.264416, 27.937703],
        [41.264674, 27.939506],
        [41.265126, 27.940836],
        [41.264835, 27.942123],
        [41.264964, 27.944269],
        [41.265222, 27.946844],
        [41.265319, 27.948861],
        [41.269287, 27.947874],
        [41.271061, 27.948089],
        [41.277350, 27.952509],
        [41.277802, 27.953796],
        [41.281769, 27.956371],
        [41.283537, 27.957493],
        [41.283480, 27.953352],
        [41.283406, 27.949954],
        [41.283488, 27.948611],
        [41.282276, 27.946801],
        [41.281110, 27.945015],
        [41.280100, 27.943545],
        [41.279876, 27.943310],
        [41.279496, 27.943012],
        [41.278147, 27.942110],
        [41.277686, 27.941749],
        [41.277001, 27.941082],
        [41.276228, 27.940324],
        [41.275363, 27.939365],
        [41.275848, 27.939874],
        [41.274933, 27.938839],
        [41.274126, 27.937573],
        [41.273198, 27.935644],
        [41.271134, 27.931567],
        [41.263733, 27.920568],
        [41.261775, 27.916565],
        [41.256209, 27.914971],
        [41.256870, 27.916989],
        [41.258524, 27.921420],
        [41.255194, 27.921890],
        [41.257064, 27.924985],
        [41.258020, 27.926932],
        [41.259512, 27.926717]
      ]
    },
    {
      id: 2,
      name: 'YÜKSEK HIZLI TREN',
      coordinates: { lat: 41.283472, lng: 27.928667 },
      distance: 1,
      distanceText: '1 KM',
      type: 'train',
      description: 'Hızlı Tren İstasyonu',
      trainPath: [
        [41.283013, 27.895774],
        [41.282900, 27.899036],
        [41.283005, 27.905559],
        [41.283150, 27.910870],
        [41.283333, 27.914170],
        [41.283475, 27.917660],
        [41.283417, 27.920478],
        [41.283417, 27.921915],
        [41.283425, 27.924780],
        [41.283433, 27.928213],
        [41.283514, 27.931936],
        [41.283514, 27.934618],
        [41.283473, 27.939006],
        [41.283554, 27.942311],
        [41.283578, 27.945637],
        [41.283546, 27.949510],
        [41.283570, 27.952450],
        [41.283667, 27.955668],
        [41.283699, 27.957900],
        [41.283602, 27.960818],
        [41.283385, 27.962942],
        [41.283110, 27.964648],
        [41.282835, 27.965948]
      ]
    },
    {
      id: 3,
      name: 'GÜMRÜK MÜDÜRLÜĞÜ',
      coordinates: { lat: 41.278546, lng: 27.998562 },
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
      polyline: loc.polyline,
      polygon: loc.polygon,
      trainPath: loc.trainPath
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
      <div className="w-full h-full px-12 py-6 overflow-hidden">

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