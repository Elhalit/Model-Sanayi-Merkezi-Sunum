import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import EmbeddedGoogleMapsComponent from '../EmbeddedGoogleMapsComponent';

export default function StrategicLocationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate location advantages
            gsap.fromTo('.location-advantage',
              { opacity: 0, x: -30 },
              { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
            );
            
            // Animate map container
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

  const locationItems = [
    { id: 2, name: "ASYAPORT LİMAN", distance: "75 KM", icon: "🚢" },
    { id: 3, name: "GÜMRÜK MÜDÜRLÜĞÜ", distance: "8 KM", icon: "🏢" },
    { id: 5, name: "YÜKSEK HIZLI TREN", distance: "1 KM", icon: "🚄" },
    { id: 4, name: "KOSB - KAPAKLI OSB", distance: "1 KM", icon: "🏗️" },
    { id: 1, name: "MODEL SANAYİ MERKEZİ", distance: "0 KM", icon: "🏭" }
  ];

  return (
    <section ref={sectionRef} className="section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" data-testid="strategic-location-section">
      <div className="w-full h-full px-2 py-6 overflow-hidden">
        
        {/* Compact Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight mb-2" style={{
            background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            STRATEJİK LOKASYON
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-4xl mx-auto">
            Dünya ticaretine ulaşmak hiç bu kadar kolay olmadı. Kapaklı Model Sanayi Merkezi'nin benzersiz konum avantajlarını keşfedin.
          </p>
        </div>

        {/* Main Content - Location Advantages and Map */}
        <div className="w-full h-[75vh] flex gap-4">
          
          {/* Far Left Side - Location Advantages - Smaller */}
          <div className="w-64 flex-shrink-0 flex flex-col">
            <h2 className="text-xl font-black text-center mb-4" style={{
              background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              KONUM AVANTAJLARI
            </h2>
            
            <div className="grid grid-cols-1 gap-3 mb-6">
              {locationItems.map((item) => (
                <div
                  key={item.id}
                  className="glass p-3 rounded-lg flex items-center justify-between location-advantage opacity-0"
                >
                  <div className="flex items-center gap-2">
                    <div className="text-lg flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold">{item.name}</span>
                  </div>
                  <div className="text-lg font-black text-white">{item.distance}</div>
                </div>
              ))}
            </div>

            {/* Industry Partnership Info */}
            <div className="glass p-4 rounded-xl location-advantage opacity-0 mt-auto">
              <h3 className="text-sm font-bold mb-2" style={{
                background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                SEKTÖRDE LİDER KURULUŞLARLA KOMŞULUK
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Çevresindeki organize sanayi bölgelerinde <strong>800+</strong> aktif firma ile 
                iş birliği imkanları, tedarik zinciri avantajları ve sektörel sinerji fırsatları.
              </p>
            </div>
          </div>
          
          {/* Expanded Map Area */}
          <div className="flex-1 relative">
            <div className="map-container opacity-0 h-full">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/20">
                <EmbeddedGoogleMapsComponent showAllLocations={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}