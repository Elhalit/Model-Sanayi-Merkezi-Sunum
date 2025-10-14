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

  return (
    <section ref={sectionRef} className="section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" data-testid="strategic-location-section">
      <div className="w-full h-full px-2 py-6 overflow-y-auto">
        
        {/* Compact Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">
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
            <h2 className="text-xl font-black text-center mb-4 text-primary">
              KONUM AVANTAJLARI
            </h2>
            
            <div className="grid grid-cols-1 gap-3 mb-6">
              <div className="glass p-3 rounded-lg flex items-center justify-between hover:scale-105 transition-all location-advantage opacity-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
                  <span className="text-xs font-bold">ASYAPORT LİMAN</span>
                </div>
                <div className="text-lg font-black text-primary">75 KM</div>
              </div>
              
              <div className="glass p-3 rounded-lg flex items-center justify-between hover:scale-105 transition-all location-advantage opacity-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse flex-shrink-0"></div>
                  <span className="text-xs font-bold">GÜMRÜK MÜDÜRLÜĞÜ</span>
                </div>
                <div className="text-lg font-black text-accent">8 KM</div>
              </div>
              
              <div className="glass p-3 rounded-lg flex items-center justify-between hover:scale-105 transition-all location-advantage opacity-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                  <span className="text-xs font-bold">YÜKSEK HIZLI TREN</span>
                </div>
                <div className="text-lg font-black text-success">1 KM</div>
              </div>
              
              <div className="glass p-3 rounded-lg flex items-center justify-between hover:scale-105 transition-all location-advantage opacity-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse flex-shrink-0"></div>
                  <span className="text-xs font-bold">BALO YÜK TRENİ</span>
                </div>
                <div className="text-lg font-black text-warning">1 KM</div>
              </div>
              
              <div className="glass p-3 rounded-lg flex items-center justify-between hover:scale-105 transition-all location-advantage opacity-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse flex-shrink-0"></div>
                  <span className="text-xs font-bold">ÇOSB - ÇERKEZKÖY OSB</span>
                </div>
                <div className="text-lg font-black text-destructive">3 KM</div>
              </div>
              
              <div className="glass p-3 rounded-lg flex items-center justify-between hover:scale-105 transition-all location-advantage opacity-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse flex-shrink-0"></div>
                  <span className="text-xs font-bold">KOSB - KAPAKLI OSB</span>
                </div>
                <div className="text-lg font-black text-primary">1 KM</div>
              </div>
            </div>

            {/* Industry Partnership Info */}
            <div className="glass p-4 rounded-xl location-advantage opacity-0 mt-auto">
              <h3 className="text-sm font-bold text-primary mb-2">
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
            <h2 className="text-2xl md:text-3xl font-black text-center mb-4 text-primary">
              İNTERAKTİF HARİTA
            </h2>
            
            <div className="map-container opacity-0 h-full">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-primary/20">
                <EmbeddedGoogleMapsComponent />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}