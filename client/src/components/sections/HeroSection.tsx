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
      );
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section"
      data-testid="hero-section"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/intro.png"
          alt="Kapaklı Model Sanayi Merkezi Aerial View"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
        {/* Main Headline */}
        <div id="hero-title" className="mb-12 opacity-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight">
            <span style={{
              background: 'linear-gradient(to right, #ff5300, #ff6b1a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {t('hero.title')}
            </span>
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-muted-foreground">
            {t('hero.subtitle')}
          </h2>
        </div>
        
        {/* Facility Icons */}
        <div id="hero-facilities" className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 opacity-0">
          <div className="glass p-6 rounded-2xl pulse-hover glow transition-all duration-300 hover:scale-105" data-testid="facility-security">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-base md:text-lg font-bold mb-2">{t('hero.cards.strategic')}</h3>
            <p className="text-muted-foreground text-sm md:text-base">{t('hero.cards.strategicDesc')}</p>
          </div>
          
          <div className="glass p-6 rounded-2xl pulse-hover glow transition-all duration-300 hover:scale-105" data-testid="facility-parking">
            <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
              <ArrowUpDown className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-base md:text-lg font-bold mb-2">{t('hero.cards.modern')}</h3>
            <p className="text-muted-foreground text-sm md:text-base">{t('hero.cards.modernDesc')}</p>
          </div>
          
          <div className="glass p-6 rounded-2xl pulse-hover glow transition-all duration-300 hover:scale-105" data-testid="facility-infrastructure">
            <div className="w-16 h-16 mx-auto mb-4 bg-success/20 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-base md:text-lg font-bold mb-2">{t('hero.cards.investment')}</h3>
            <p className="text-muted-foreground text-sm md:text-base">{t('hero.cards.investmentDesc')}</p>
          </div>
          
          <div className="glass p-6 rounded-2xl pulse-hover glow transition-all duration-300 hover:scale-105" data-testid="facility-location">
            <div className="w-16 h-16 mx-auto mb-4 bg-destructive/20 rounded-full flex items-center justify-center">
              <MapPin className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="text-base md:text-lg font-bold mb-2">{t('hero.cards.quality')}</h3>
            <p className="text-muted-foreground text-sm md:text-base">{t('hero.cards.qualityDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
