import { useEffect, useRef } from 'react';
import { Building2, Layers, Users } from 'lucide-react';
import { gsap } from 'gsap';

export default function ProjectSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate statistics with count-up effect
            document.querySelectorAll('.stat-number').forEach((stat) => {
              const target = parseInt(stat.getAttribute('data-count') || '0');
              animateCounter(stat as HTMLElement, 0, target, 2000);
            });
            
            // Animate features
            gsap.fromTo('.project-feature',
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
            );
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounter = (element: HTMLElement, start: number, end: number, duration: number) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString('tr-TR');
    }, 16);
  };

  return (
    <section ref={sectionRef} className="section" data-testid="project-section">
      {/* Background Image with Parallax */}
      <div className="parallax-bg">
        <img
          src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200"
          alt="Kapaklı Model Sanayi Merkezi Facility"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/80" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <h2 className="text-5xl md:text-6xl font-black mb-16 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Kapaklı Model Sanayi Merkezi
        </h2>
        
        {/* Statistics Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="glass p-8 rounded-2xl text-center glow hover:scale-105 transition-all duration-300" data-testid="stat-total-area">
            <div className="text-5xl font-black text-primary mb-3 stat-number" data-count="52000">0</div>
            <div className="text-xl font-bold mb-2">m²</div>
            <div className="text-muted-foreground">Toplam Alan</div>
          </div>
          
          <div className="glass p-8 rounded-2xl text-center glow hover:scale-105 transition-all duration-300" data-testid="stat-blocks">
            <div className="text-5xl font-black text-accent mb-3 stat-number" data-count="11">0</div>
            <div className="text-xl font-bold mb-2">Blok</div>
            <div className="text-muted-foreground">İşyeri Blokları</div>
          </div>
          
          <div className="glass p-8 rounded-2xl text-center glow hover:scale-105 transition-all duration-300" data-testid="stat-units">
            <div className="text-5xl font-black text-success mb-3 stat-number" data-count="86">0</div>
            <div className="text-xl font-bold mb-2">Ünite</div>
            <div className="text-muted-foreground">Bağımsız Bölüm</div>
          </div>
          
          <div className="glass p-8 rounded-2xl text-center glow hover:scale-105 transition-all duration-300" data-testid="stat-infrastructure">
            <div className="text-5xl font-black text-destructive mb-3 stat-number" data-count="100">0</div>
            <div className="text-xl font-bold mb-2">%</div>
            <div className="text-muted-foreground">Tam Altyapı</div>
          </div>
        </div>
        
        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300 project-feature opacity-0" data-testid="feature-prefab">
            <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Modern Prefabrik</h3>
            <p className="text-muted-foreground">Depreme dayanıklı çelik konstrüksiyon</p>
          </div>
          
          <div className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300 project-feature opacity-0" data-testid="feature-flexible">
            <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
              <Layers className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">Esnek Alanlar</h3>
            <p className="text-muted-foreground">İhtiyaca göre düzenlenebilir iç mekanlar</p>
          </div>
          
          <div className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300 project-feature opacity-0" data-testid="feature-social">
            <div className="w-14 h-14 bg-success/20 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-bold mb-2">Sosyal Alanlar</h3>
            <p className="text-muted-foreground">Kafeterya, toplantı odaları ve dinlenme alanları</p>
          </div>
        </div>
      </div>
    </section>
  );
}
