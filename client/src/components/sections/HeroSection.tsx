import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
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
      
      tl.fromTo('#hero-title', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo('#hero-facilities', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 
        '-=0.5'
      );
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section relative"
      data-testid="hero-section"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/intro.png"
          alt="Kapaklı Model Sanayi Merkezi Aerial View"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchpriority="high"
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Main Title */}
        <div id="hero-title" className="mb-12 opacity-0 text-center pt-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-tight">
            <span style={{
              background: 'linear-gradient(to right, #ff5300, #ff6b1a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              MODEL SANAYİ MERKEZİ KAPAKLI
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-16">
            Modern Sanayi Tesisi ile İşinize Değer Katın
          </h2>
        </div>
        
        {/* Content Grid */}
        <div id="hero-facilities" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 opacity-0">
          {/* Stratejik Konum */}
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold mb-4" style={{
              background: 'linear-gradient(to right, #ff5300, #ff6b1a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Stratejik Konum</h3>
            <ul className="space-y-2 text-white">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Yüksek Hızlı Tren 250 M</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Çerkezköy OSB 3 KM</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>TEM Otoyolu 9 KM</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Çorlu Havalimanı 30 KM</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Asyaport Limanı 65 KM</span>
              </li>
            </ul>
          </div>

          {/* Genel Bilgiler */}
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold mb-4" style={{
              background: 'linear-gradient(to right, #ff5300, #ff6b1a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Genel Bilgiler</h3>
            <ul className="space-y-2 text-white">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>130.000 m² Arsa Alanı</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>5 Etap</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>312 Bağımsız İşyeri</span>
              </li>
            </ul>
          </div>

          {/* Sanayi Sitesi İmkanları */}
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold mb-4" style={{
              background: 'linear-gradient(to right, #ff5300, #ff6b1a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Sanayi Sitesi İmkanları</h3>
            <ul className="space-y-2 text-white">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Zeminde 5 Ton Taşıma Kapasitesi (m²)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Yüksek Kapasiteli Sanayi Elektriği</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>60 Ton Kantar Kapasitesi</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>7/24 Güvenlik Hizmetleri</span>
              </li>
            </ul>
          </div>

          {/* İşyeri Özellikleri */}
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold mb-4" style={{
              background: 'linear-gradient(to right, #ff5300, #ff6b1a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>İşyeri Özellikleri</h3>
            <ul className="space-y-2 text-white">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>12 Metre Tavan Yüksekliği</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>5 Metre Ticari Araç Giriş Cephesi</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Yangına Dayanıklı Cephe ve Çatı Panelleri</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Uluslararası Standartta Yangın Söndürme Tesisatları</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
