import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

export default function StatisticsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.fromTo('.stat-card',
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

  return (
    <section
      ref={sectionRef}
      className="section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center"
      data-testid="statistics-section"
    >
      <div className="w-full h-full flex flex-col justify-center gap-8 max-w-7xl mx-auto px-8 py-12">

        {/* Top Row: Demographics and Model Sanayi */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Çerkezköy/Kapaklı Stats */}
          <motion.div
            className="stat-card opacity-0 p-6 rounded-2xl border backdrop-blur-sm"
            style={{
              borderColor: '#ff6b1a40',
              background: 'linear-gradient(145deg, rgba(2,6,23,0.6), rgba(15,23,42,0.6))'
            }}
          >
            <h2 className="text-2xl font-bold text-[#ff6b1a] mb-6">
              ÇERKEZKÖY/KAPAKLI
            </h2>
            <div className="flex flex-col gap-4 text-xl text-white/90 font-bold">
              <div>Nüfus: 375.000</div>
              <div>Nüfusun %50'si: 25-45 Yaş Arası</div>
            </div>
          </motion.div>

          {/* Model Sanayi Merkezi Stats */}
          {/* Model Sanayi Merkezi Stats */}
          <motion.div
            className="stat-card opacity-0 p-6 rounded-2xl border backdrop-blur-sm"
            style={{
              borderColor: '#ff6b1a40',
              background: 'linear-gradient(145deg, rgba(2,6,23,0.6), rgba(15,23,42,0.6))'
            }}
          >
            <h2 className="text-2xl font-bold text-[#ff6b1a] mb-6">
              MODEL SANAYİ MERKEZİ
            </h2>
            <div className="flex flex-col gap-4 text-xl text-white font-bold">
              <div>76 AKTİF FİRMA</div>
              <div>1.050 ÇALIŞAN</div>
            </div>
          </motion.div>
        </div>

        {/* World Trade Access */}
        {/* World Trade Access */}
        <motion.div
          className="stat-card opacity-0 p-6 rounded-2xl border backdrop-blur-sm text-center"
          style={{
            borderColor: '#ff6b1a40',
            background: 'linear-gradient(145deg, rgba(2,6,23,0.6), rgba(15,23,42,0.6))'
          }}
        >
          <h2 className="text-2xl font-bold text-[#ff6b1a]">
            Gücünüze Güç Katacak Lokasyon
          </h2>
        </motion.div>

        {/* OSB Companies - 2 rows, 3 columns */}
        <div className="grid grid-cols-3 gap-6">
          <motion.div
            className="stat-card opacity-0 p-6 rounded-2xl border backdrop-blur-sm text-center"
            style={{
              borderColor: '#ff6b1a40',
              background: 'linear-gradient(145deg, rgba(2,6,23,0.6), rgba(15,23,42,0.6))'
            }}
          >
            <div className="text-xl font-bold text-white mb-2">Çerkezköy</div>
            <div className="text-2xl font-bold text-[#ff6b1a]">312 Firma</div>
          </motion.div>

          <motion.div
            className="stat-card opacity-0 p-6 rounded-2xl border backdrop-blur-sm text-center"
            style={{
              borderColor: '#ff6b1a40',
              background: 'linear-gradient(145deg, rgba(2,6,23,0.6), rgba(15,23,42,0.6))'
            }}
          >
            <div className="text-xl font-bold text-white mb-2">Velimeşe</div>
            <div className="text-2xl font-bold text-[#ff6b1a]">176 Firma</div>
          </motion.div>

          <motion.div
            className="stat-card opacity-0 p-6 rounded-2xl border backdrop-blur-sm text-center"
            style={{
              borderColor: '#ff6b1a40',
              background: 'linear-gradient(145deg, rgba(2,6,23,0.6), rgba(15,23,42,0.6))'
            }}
          >
            <div className="text-xl font-bold text-white mb-2">Ergene</div>
            <div className="text-2xl font-bold text-[#ff6b1a]">190 Firma</div>
          </motion.div>

          <motion.div
            className="stat-card opacity-0 p-6 rounded-2xl border backdrop-blur-sm text-center"
            style={{
              borderColor: '#ff6b1a40',
              background: 'linear-gradient(145deg, rgba(2,6,23,0.6), rgba(15,23,42,0.6))'
            }}
          >
            <div className="text-xl font-bold text-white mb-2">Kapaklı</div>
            <div className="text-2xl font-bold text-[#ff6b1a]">31 Firma</div>
          </motion.div>

          <motion.div
            className="stat-card opacity-0 p-6 rounded-2xl border backdrop-blur-sm text-center"
            style={{
              borderColor: '#ff6b1a40',
              background: 'linear-gradient(145deg, rgba(2,6,23,0.6), rgba(15,23,42,0.6))'
            }}
          >
            <div className="text-xl font-bold text-white mb-2">Veliköy</div>
            <div className="text-2xl font-bold text-[#ff6b1a]">72 Firma</div>
          </motion.div>

          <motion.div
            className="stat-card opacity-0 p-6 rounded-2xl border backdrop-blur-sm text-center"
            style={{
              borderColor: '#ff6b1a40',
              background: 'linear-gradient(145deg, rgba(2,6,23,0.6), rgba(15,23,42,0.6))'
            }}
          >
            <div className="text-xl font-bold text-white mb-2">Yalıboyu</div>
            <div className="text-2xl font-bold text-[#ff6b1a]">34 Firma</div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}