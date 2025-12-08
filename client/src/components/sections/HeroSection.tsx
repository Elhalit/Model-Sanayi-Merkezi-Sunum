import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAnimations } from '@/hooks/useAnimations';

export default function HeroSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { animateOnScroll } = useAnimations();

  useEffect(() => {
    if (sectionRef.current) {
      // Initial animations
      const tl = gsap.timeline();

      // Combined animation for the header block since they are now grouped vertically
      tl.fromTo('#hero-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
        .fromTo('.hero-card',
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.2, ease: 'power3.out' },
          '-=0.5'
        );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative flex flex-col items-center justify-start h-screen min-h-screen pt-6 pb-0"
      data-testid="hero-section"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      {/* Header - Matching ProjectSection Standard */}
      <div id="hero-header" className="relative z-10 text-center mb-2 opacity-0 w-full shrink-0">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2 py-2" style={{
          background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          MODEL SANAYİ MERKEZİ KAPAKLI
        </h1>
        <h2 className="text-base md:text-lg font-semibold max-w-4xl mx-auto text-white">
          Modern Sanayi Tesisi ile İşinize Değer Katın
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pl-8 pr-32 w-full flex-1 flex items-center justify-center min-h-0">

        {/* Content Grid */}
        <div id="hero-facilities" className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Stratejik Konum */}
          <motion.div
            className="hero-card opacity-0 rounded-2xl border backdrop-blur-md p-6 h-full flex flex-col items-center justify-start pt-8"
            style={{
              borderColor: '#ff6b1a40',
              background: 'linear-gradient(145deg, rgba(2,6,23,0.8), rgba(15,23,42,0.8))',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <h3 className="text-xl font-black mb-4 uppercase text-center tracking-wide" style={{
              background: 'linear-gradient(to right, #ff5300, #ff6b1a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>STRATEJİK KONUM</h3>
            <ul className="space-y-1 text-white text-left w-full">
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>Avrupa Serbest Bölge</li>
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>Kuzey Marmara Otoyolu</li>
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>TEM Otoyolu</li>
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>Yüksek Hızlı Tren</li>
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>BALO Yük Treni</li>
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>Çorlu Havalimanı</li>
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>Asyaport Limanı</li>
            </ul>
          </motion.div>

          {/* Gümrükleme */}
          <motion.div
            className="hero-card opacity-0 rounded-2xl border backdrop-blur-md p-6 h-full flex flex-col items-center justify-start pt-8"
            style={{
              borderColor: '#ff6b1a40',
              background: 'linear-gradient(145deg, rgba(2,6,23,0.8), rgba(15,23,42,0.8))',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <h3 className="text-xl font-black mb-4 uppercase text-center tracking-wide" style={{
              background: 'linear-gradient(to right, #ff5300, #ff6b1a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>GÜMRÜKLEME</h3>
            <ul className="space-y-1 text-white text-left w-full">
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>Çerkezköy Gümrük Müdürlüğü</li>
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>Tekirdağ Gümrük Müdürlüğü</li>
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>Dereköy Gümrük Kapısı</li>
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>Pazarkule Gümrük Kapısı</li>
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>Kapıkule Gümrük Kapısı</li>
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>Hamzabeyli Gümrük Kapısı</li>
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>İpsala Gümrük Kapısı</li>
            </ul>
          </motion.div>

          {/* Yakındaki OSB'ler */}
          <motion.div
            className="hero-card opacity-0 rounded-2xl border backdrop-blur-md p-6 h-full flex flex-col items-center justify-start pt-8"
            style={{
              borderColor: '#ff6b1a40',
              background: 'linear-gradient(145deg, rgba(2,6,23,0.8), rgba(15,23,42,0.8))',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <h3 className="text-xl font-black mb-4 uppercase text-center tracking-wide" style={{
              background: 'linear-gradient(to right, #ff5300, #ff6b1a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>YAKINDAKİ OSB'LER</h3>
            <ul className="space-y-1 text-white text-left w-full">
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>Çerkezköy OSB</li>
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>Velimeşe OSB</li>
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>Veliköy OSB</li>
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>Ergene OSB</li>
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>Çorlu OSB</li>
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>Kapaklı OSB</li>
              <li className="text-base font-medium"><span className="text-[#ff6b1a] mr-2">•</span>Yalıboyu OSB</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
