import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { Zap, Shield, ArrowUpFromDot, Scale, Home, Antenna, Building2, Forklift, Bus, Gavel } from 'lucide-react';

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
    // 1. Logistics Group
    { key: 'nakliye', text: 'Nakliye ve Forklift Kiralama Ofisi', Icon: Forklift },
    { key: 'arac', text: 'Ticari Araç Girişlerine Uygun', Icon: Bus },

    // 2. Heavy Infrastructure
    { key: 'kantar', text: '60 Ton Kantar Kapasitesi', Icon: Gavel },
    { key: 'zemin', text: 'Zeminde 5 Ton Taşıma Kapasitesi (m²)', Icon: CapacityIcon },

    // 3. Technical Specs & Structure
    { key: 'tavan', text: '12 Metre Tavan Yüksekliği', Icon: ArrowUpFromDot },
    { key: 'elektrik', text: 'Yüksek Kapasiteli Sanayi Elektriği', Icon: Zap },

    // 4. Safety & Protection
    { key: 'guvenlik', text: '7/24 Güvenlik Hizmetleri', Icon: Shield },
    { key: 'paratoner', text: 'Paratoner', Icon: Antenna },

    // 5. Environmental Resistance
    { key: 'cephe', text: 'Yangına Dayanıklı Cephe Panelleri', Icon: FacadePanelIcon },
    { key: 'cati', text: 'Yangına Dayanıklı Çatı Kaplamaları', Icon: Home },

    // 6. Services & Utilities
    { key: 'kanalizasyon', text: 'Gelişmiş Atık Su Altyapısı', Icon: KanalizasyonIcon },
    { key: 'site', text: 'Profesyonel Site Yönetimi', Icon: Building2 }
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
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2 py-2" style={{
          background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>MODEL SANAYİ MERKEZİ</h1>
        <h2 className="text-base md:text-lg font-semibold max-w-4xl mx-auto text-white">
          BİR SANAYİ MERKEZİNDEKİ TÜM BEKLENTİNİZİ KARŞILAMAK İÇİN TASARLANDI
        </h2>
      </div>
      {/* Features Grid - Centered 3 rows x 4 icons */}
      <div className="w-full px-4 flex-1 flex items-center">
        <div className="mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 place-items-center">
          {features.map((feature, idx) => {
            const Icon = feature.Icon;
            return (
              <motion.div
                key={idx}
                className="project-feature-card opacity-0 rounded-xl"
                style={{
                  width: '200px',
                  height: '160px',
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  position: 'relative'
                }}
                whileHover={{
                  rotateY: 180,
                  transition: { duration: 0.6, ease: 'easeInOut' }
                }}
                whileTap={{ scale: 0.96 }}
              >
                {/* Front Face */}
                <div
                  className="flex flex-col items-center justify-center rounded-xl border backdrop-blur-sm"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    borderColor: '#ff6b1a40',
                    background: 'linear-gradient(145deg, rgba(2,6,23,0.6), rgba(15,23,42,0.6))'
                  }}
                >
                  <div
                    className="w-16 h-16 mb-3 flex items-center justify-center rounded-full"
                    style={{
                      background:
                        'radial-gradient(circle at 30% 30%, rgba(255,83,0,0.35), rgba(255,83,0,0.12) 60%, rgba(255,83,0,0.06) 100%)',
                      border: '1px solid rgba(255,107,26,0.35)'
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: '#ffffff' }} />
                  </div>
                  <p className="text-center text-xs text-white/90 leading-tight px-3">
                    {feature.text}
                  </p>
                </div>

                {/* Back Face */}
                <div
                  className="flex flex-col items-center justify-center rounded-xl border backdrop-blur-sm"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    borderColor: '#ff6b1a60',
                    background: 'linear-gradient(145deg, rgba(255,83,0,0.15), rgba(255,107,26,0.08))',
                    boxShadow: '0 8px 32px rgba(255, 107, 26, 0.2)'
                  }}
                >
                  <div
                    className="w-16 h-16 mb-3 flex items-center justify-center rounded-full"
                    style={{
                      background:
                        'radial-gradient(circle at 30% 30%, rgba(255,83,0,0.5), rgba(255,83,0,0.2) 60%, rgba(255,83,0,0.1) 100%)',
                      border: '1px solid rgba(255,107,26,0.6)'
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: '#ffffff' }} />
                  </div>
                  <p className="text-center text-xs font-semibold text-white leading-tight px-3">
                    {feature.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
