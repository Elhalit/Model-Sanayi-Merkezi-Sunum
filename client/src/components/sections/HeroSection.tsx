import { useEffect, useRef } from 'react';
import { Shield, ArrowUpDown, Zap, MapPin } from 'lucide-react';
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
      )
      .fromTo('#hero-cta', 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }, 
        '-=0.3'
      );
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const xPos = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const yPos = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    
    gsap.to('.parallax-bg', {
      x: xPos,
      y: yPos,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="section"
      onMouseMove={handleMouseMove}
      data-testid="hero-section"
    >
      {/* Background Image with Parallax */}
      <div className="parallax-bg">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200"
          alt="Kapaklı Model Sanayi Merkezi Aerial View"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
        {/* Main Headline */}
        <div id="hero-title" className="mb-12 opacity-0">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('hero.title')}
            </span>
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-muted-foreground">
            {t('hero.subtitle')}
          </h2>
        </div>
        
        {/* Facility Icons */}
        <div id="hero-facilities" className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 opacity-0">
          <div className="glass p-6 rounded-2xl pulse-hover glow transition-all duration-300 hover:scale-105" data-testid="facility-security">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">{t('hero.cards.strategic')}</h3>
            <p className="text-muted-foreground text-sm">{t('hero.cards.strategicDesc')}</p>
          </div>
          
          <div className="glass p-6 rounded-2xl pulse-hover glow transition-all duration-300 hover:scale-105" data-testid="facility-parking">
            <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
              <ArrowUpDown className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">{t('hero.cards.modern')}</h3>
            <p className="text-muted-foreground text-sm">{t('hero.cards.modernDesc')}</p>
          </div>
          
          <div className="glass p-6 rounded-2xl pulse-hover glow transition-all duration-300 hover:scale-105" data-testid="facility-infrastructure">
            <div className="w-16 h-16 mx-auto mb-4 bg-success/20 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-bold mb-2">{t('hero.cards.investment')}</h3>
            <p className="text-muted-foreground text-sm">{t('hero.cards.investmentDesc')}</p>
          </div>
          
          <div className="glass p-6 rounded-2xl pulse-hover glow transition-all duration-300 hover:scale-105" data-testid="facility-location">
            <div className="w-16 h-16 mx-auto mb-4 bg-destructive/20 rounded-full flex items-center justify-center">
              <MapPin className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="text-xl font-bold mb-2">{t('hero.cards.quality')}</h3>
            <p className="text-muted-foreground text-sm">{t('hero.cards.qualityDesc')}</p>
          </div>
        </div>
        
        <div id="hero-cta" className="mt-16 opacity-0">
          <button 
            className="glass px-12 py-4 rounded-full text-xl font-bold text-primary 
                       border-2 border-primary hover:bg-primary hover:text-background 
                       transition-all duration-300 glow"
            data-testid="hero-cta-button"
          >
            {t('hero.cta.primary')}
          </button>
        </div>
      </div>
    </section>
  );
}
