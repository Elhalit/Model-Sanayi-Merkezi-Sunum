import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ProjectSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.fromTo('.project-feature',
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
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
    <section 
      ref={sectionRef} 
      className="section project-section" 
      data-testid="project-section" 
      style={{ display: 'flex', width: '100%', height: '100%' }}
    >
      {/* Left: Headline + Technical list */}
      <div className="project-content-panel">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black" style={{ 
          background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>PROJEMİZ</h1>
        <h2>BİR SANAYİ SİTESİNDEKİ TÜM BEKLENTİNİZİ KARŞILAMAK İÇİN TASARLANDI</h2>

        <div className="project-features">
          <h3>TEKNİK ÖZELLİKLER</h3>
          <ul>
            {[
              'Zeminde 5 Ton Taşıma Kapasitesi (m²)',
              'Yüksek Kapasiteli Sanayi Elektriği',
              'Nakliye ve Forklift Kiralama Ofisi',
              'Yangına Dayanıklı Cephe Panelleri',
              'Paratoner',
              '7/24 Güvenlik Hizmetleri',
              '12 Metre Tavan Yüksekliği',
              '60 Ton Kantar Kapasitesi',
              'Ticari Araç Girişlerine Uygun',
              'Yangına Dayanıklı Çatı Kaplamaları',
              'Kanalizasyon',
              'Site Yönetimi Hizmetleri'
            ].map((item, idx) => (
              <li key={idx} className="project-feature opacity-0">
                <span className="bullet">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right: Full bleed image */}
      <div className="project-image-panel">
        <img
          src="/sanayi1.png"
          alt="Model Sanayi Merkezi"
          className="project-full-image"
        />
      </div>
    </section>
  );
}
