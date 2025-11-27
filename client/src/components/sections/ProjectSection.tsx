import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Zap, Shield, ArrowUpFromDot, Scale, Home, Settings, Antenna, Building2, Forklift, Bus } from 'lucide-react';

function CapacityIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
      {/* Ground line */}
      <path d="M3 20h18" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Block representing load on ground */}
      <rect x="6" y="10" width="12" height="8" rx="2" stroke="white" strokeWidth="2" />
      {/* 5T label */}
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif">5T</text>
    </svg>
  );
}

function FacadePanelIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
      {/* Panel */}
      <rect x="5" y="5" width="10" height="14" rx="2" stroke="white" strokeWidth="2" />
      {/* Flame symbol near panel */}
      <path d="M16 14c0-2 2-3 2-5 1 1 2 2 2 4 0 2-1.5 3.5-4 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Shield outline indicating resistance */}
      <path d="M12 3l3 1.2v2.3c0 3.2-2 5.7-3 6.5-1-0.8-3-3.3-3-6.5V4.2L12 3z" opacity="0" />
    </svg>
  );
}

function KanalizasyonIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      {/* Circular manhole */}
      <circle cx="12" cy="8" r="4.5" stroke="white" strokeWidth="2" />
      {/* Grid lines */}
      <path d="M8 8h8M12 4v8" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Pipe down */}
      <path d="M12 12 v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Horizontal pipe */}
      <path d="M6 18 h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Down spout */}
      <path d="M18 18 v2" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function ProjectSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.fromTo('.project-feature-card',
              { opacity: 0, y: 30, scale: 0.9 },
              { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
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

  const features = [
    // Ground carrying capacity – explicit 5T on block over ground
    { key: 'zemin', text: 'Zeminde 5 Ton Taşıma Kapasitesi (m²)', Icon: CapacityIcon },
    // High capacity industrial electricity
    { key: 'elektrik', text: 'Yüksek Kapasiteli Sanayi Elektriği', Icon: Zap },
    // Logistics & forklift office - use Forklift icon
    { key: 'nakliye', text: 'Nakliye ve Forklift Kiralama Ofisi', Icon: Forklift },
    // Fire-resistant facade panels – panel with flame indication
    { key: 'cephe', text: 'Yangına Dayanıklı Cephe Panelleri', Icon: FacadePanelIcon },
    // Lightning rod (Paratoner) – antenna icon is more understandable
    { key: 'paratoner', text: 'Paratoner', Icon: Antenna },
    // 7/24 security services
    { key: 'guvenlik', text: '7/24 Güvenlik Hizmetleri', Icon: Shield },
    // 12m ceiling height
    { key: 'tavan', text: '12 Metre Tavan Yüksekliği', Icon: ArrowUpFromDot },
    // Weighbridge (Kantar) – scale icon
    { key: 'kantar', text: '60 Ton Kantar Kapasitesi', Icon: Scale },
    // Suitable for commercial vehicle entrance - use Bus/transit icon
    { key: 'arac', text: 'Ticari Araç Girişlerine Uygun', Icon: Bus },
    // Fire-resistant roof coverings – use Home combined metaphor; keep Home icon for roof
    { key: 'cati', text: 'Yangına Dayanıklı Çatı Kaplamaları', Icon: Home },
    // Sewer
    { key: 'kanalizasyon', text: 'Kanalizasyon', Icon: KanalizasyonIcon },
    // Site management services – Building2 is more representative than Settings
    { key: 'site', text: 'Site Yönetimi Hizmetleri', Icon: Building2 }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" 
      data-testid="project-section" 
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: '100%', height: '100%', padding: '1.5rem 0', overflow: 'hidden' }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2" style={{ 
          background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>PROJEMİZ</h1>
        <h2 className="text-base md:text-lg font-semibold max-w-4xl mx-auto" style={{ 
          background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          BİR SANAYİ SİTESİNDEKİ TÜM BEKLENTİNİZİ KARŞILAMAK İÇİN TASARLANDI
        </h2>
      </div>

      {/* Top Image - Full Width Edge to Edge */}
      <div className="w-screen mb-3 -mx-0" style={{ height: '64vh',
         marginLeft: 'calc(-68vw + 20%)',
         marginRight: 'calc(-68vw + 20%)',
         width: '100vw' }}>
        <div className="w-full h-full">
          <img
            src="/msm3 copy.png"
            alt="Model Sanayi Merkezi Görseli"
            className="w-full h-full"
            style={{ objectFit: 'contain', objectPosition: 'center' }}
          />
        </div>
      </div>

      {/* Features Grid - Compact Layout */}
      <div className="w-full max-w-7xl px-4 flex-1 flex items-center">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-3 w-full">
          {features.map((feature, idx) => {
            const Icon = feature.Icon;
            return (
              <div
                key={idx}
                className="project-feature-card opacity-0 flex flex-col items-center justify-center p-2 rounded-lg bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <div className="w-10 h-10 mb-2 flex items-center justify-center rounded-full bg-white/10">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-center text-[10px] text-white/90 leading-tight">
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
