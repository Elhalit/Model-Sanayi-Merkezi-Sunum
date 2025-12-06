import { useEffect, useRef, useState } from 'react';
import { CheckCircle, Play, Pause } from 'lucide-react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

export default function CompanySection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate company steps
            gsap.fromTo('.company-step',
              { opacity: 0, x: -50 },
              { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
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

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const companies = [
    {
      name: "Som Prefabrik İnşaat AŞ.",
      description: "Betonarme Yapı",
      year: 1990,
    },
    {
      name: "Nadir Metal Rafineri",
      description: "1967",
      year: 1967,
    },
    {
      name: "İNNO Gayrimenkul Yatırım A.Ş.",
      description: "2017",
      year: 2017,
    },
    {
      name: "NET İnşaat Danışmanlık Mühendislik A.Ş.",
      description: "1996",
      year: 1996,
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="section bg-gradient-to-br from-background via-muted to-background"
      data-testid="company-section"
    >
      <div className="max-w-7xl mx-auto px-8 w-full">
        <h2 className="text-5xl md:text-6xl font-black mb-12 text-center bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
          {t('company.title')}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Company Evolution Timeline */}
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-3xl font-bold mb-8 text-primary">{t('company.timeline.title')}</h3>
            
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start gap-4 company-step opacity-0" data-testid="evolution-step-1">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 glow">
                  <span className="text-background font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{t('company.timeline.step1.title')}</h4>
                  <p className="text-muted-foreground">{t('company.timeline.step1.description')}</p>
                </div>
              </div>
              </div>
            </div>
          </div>
          
          {/* Company Video */}
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-3xl font-bold mb-8 text-primary">{t('company.video.title')}</h3>
            <div className="relative rounded-2xl overflow-hidden bg-muted aspect-video">
              <video 
                ref={videoRef}
                className="w-full h-full object-contain sm:object-cover" 
                muted 
                poster="https://images.unsplash.com/photo-1590496793907-4b36d2fd9f0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450"
                data-testid="company-video"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              >
                <source src={`${import.meta.env.VITE_VIDEO_URL || '#'}`} type="video/mp4" />
                {t('common.error')}
              </video>
              {/* Play overlay */}
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-all cursor-pointer" 
                onClick={toggleVideo}
                data-testid="video-play-overlay"
              >
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center glow">
                  {isVideoPlaying ? (
                    <Pause className="w-10 h-10 text-background" />
                  ) : (
                    <Play className="w-10 h-10 text-background ml-1" />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3" data-testid="company-stat-experience">
                <CheckCircle className="w-6 h-6 text-primary" />
                <span className="text-muted-foreground">30+ {t('company.stats.experience')}</span>
              </div>
              <div className="flex items-center gap-3" data-testid="company-stat-projects">
                <CheckCircle className="w-6 h-6 text-primary" />
                <span className="text-muted-foreground">100+ {t('company.stats.projects')}</span>
              </div>
              <div className="flex items-center gap-3" data-testid="company-stat-certification">
                <CheckCircle className="w-6 h-6 text-primary" />
                <span className="text-muted-foreground">ISO 9001 {t('company.stats.certification')}</span>
              </div>
            </div>
          </div>

          {/* Company Logos & Names Slider */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-center text-primary">Ortaklarımız</h3>
            <div className="flex flex-wrap justify-center gap-8">
              {companies.map((company, idx) => {
                let logoSrc = '';
                if (company.name.includes('Nadir Metal')) logoSrc = '/nadirmetal.jpeg';
                if (company.name.includes('İNNO')) logoSrc = '/İnno-GY-Logo.png';
                if (company.name.includes('NET')) logoSrc = '/Net-logo.png';
                if (company.name.includes('Som')) logoSrc = '/som-prefabrik-logo.png';
                return (
                  <div key={company.name} className="flex flex-col items-center w-40">
                    <div className="w-20 h-20 mb-3">
                      <img
                        src={logoSrc}
                        alt={company.name + ' logo'}
                        className="w-20 h-20 object-cover rounded-full border-none bg-white shadow"
                        style={{ background: 'white' }}
                      />
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-base text-gray-900 mb-1">{company.name}</div>
                      <div className="text-sm text-gray-600">{company.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
}
