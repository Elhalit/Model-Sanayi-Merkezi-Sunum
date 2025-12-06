import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function LeaderSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.fromTo('.leader-image',
              { opacity: 0, scale: 1.1 },
              { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
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
      className="section relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      data-testid="leader-section"
    >
      {/* Full Screen Image */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-900">
        <img
          src="/sanayi.png"
          alt="Sanayi Merkezi"
          className="leader-image w-full h-full object-contain"
        />
      </div>
    </section>
  );
}
