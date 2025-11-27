import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function StatisticsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate stats
            gsap.fromTo('.stat-card',
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
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
    <section ref={sectionRef} className="section" data-testid="statistics-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: '#111827' }}>
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
        
        {/* Top Row: Demographics and Model Sanayi */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Çerkezköy/Kapaklı Stats */}
          <div className="stat-card opacity-0" style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '0.75rem', textAlign: 'center', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6b1a', marginBottom: '1.5rem' }}>
              ÇERKEZKÖY/KAPAKLI
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.125rem', color: 'rgba(255,255,255,0.9)' }}>
              <div><span style={{ fontWeight: 'bold' }}>Nüfus:</span> 375.000</div>
              <div><span style={{ fontWeight: 'bold' }}>Ortalama Yıllık Artış:</span> %7</div>
              <div><span style={{ fontWeight: 'bold' }}>Nüfusun %50'si:</span> 25-45 Yaş Arası</div>
            </div>
          </div>

          {/* Model Sanayi Merkezi Stats */}
          <div className="stat-card opacity-0" style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '0.75rem', textAlign: 'center', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6b1a', marginBottom: '1.5rem' }}>
              MODEL SANAYİ MERKEZİ
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>76 FİRMA</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>1.050 ÇALIŞAN</div>
            </div>
          </div>
        </div>

        {/* World Trade Access */}
        <div className="stat-card opacity-0" style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#ff6b1a' }}>
            DÜNYA TİCARETİNE KOLAY ULAŞIM
          </h2>
        </div>

        {/* OSB Companies - 2 rows, 3 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          <div className="stat-card opacity-0" style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>Çerkezköy</div>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ff6b1a' }}>312 Firma</div>
          </div>
          
          <div className="stat-card opacity-0" style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>Velimeşe</div>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ff6b1a' }}>176 Firma</div>
          </div>
          
          <div className="stat-card opacity-0" style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>Ergene</div>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ff6b1a' }}>190 Firma</div>
          </div>
          
          <div className="stat-card opacity-0" style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>Kapaklı</div>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ff6b1a' }}>31 Firma</div>
          </div>
          
          <div className="stat-card opacity-0" style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>Veliköy</div>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ff6b1a' }}>72 Firma</div>
          </div>
          
          <div className="stat-card opacity-0" style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>Yalıboyu</div>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ff6b1a' }}>34 Firma</div>
          </div>
        </div>

      </div>
    </section>
  );
}
