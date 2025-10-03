import { useEffect, useRef, useState } from 'react';
import { CheckCircle, Play, Pause } from 'lucide-react';
import { gsap } from 'gsap';

export default function CompanySection() {
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

  return (
    <section 
      ref={sectionRef}
      className="section bg-gradient-to-br from-background via-muted to-background"
      data-testid="company-section"
    >
      <div className="max-w-7xl mx-auto px-8 w-full">
        <h2 className="text-5xl md:text-6xl font-black mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Şirketimiz
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Company Evolution Timeline */}
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-3xl font-bold mb-8 text-primary">Şirket Evrimiziz</h3>
            
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start gap-4 company-step opacity-0" data-testid="evolution-step-1">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 glow">
                  <span className="text-background font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">İnnogy</h4>
                  <p className="text-muted-foreground">Güçlü temeller üzerine kurulu enerji altyapısı</p>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="flex justify-center">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                </svg>
              </div>
              
              {/* Step 2 */}
              <div className="flex items-start gap-4 company-step opacity-0" data-testid="evolution-step-2">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0 glow">
                  <span className="text-background font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Net İnşaat + Nadir Gold</h4>
                  <p className="text-muted-foreground">İnşaat ve finans sektörlerinde stratejik birleşme</p>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="flex justify-center">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                </svg>
              </div>
              
              {/* Step 3 */}
              <div className="flex items-start gap-4 company-step opacity-0" data-testid="evolution-step-3">
                <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center flex-shrink-0 glow">
                  <span className="text-background font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Som Prefabrik</h4>
                  <p className="text-muted-foreground">Modern prefabrik çözümlerle sektöre yön veren lider</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Company Video */}
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-3xl font-bold mb-8 text-primary">Tanıtım Videosu</h3>
            
            <div className="relative rounded-2xl overflow-hidden bg-muted aspect-video">
              <video 
                ref={videoRef}
                className="w-full h-full object-cover" 
                muted 
                poster="https://images.unsplash.com/photo-1590496793907-4b36d2fd9f0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450"
                data-testid="company-video"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              >
                <source src={`${import.meta.env.VITE_VIDEO_URL || '#'}`} type="video/mp4" />
                Tarayıcınız video etiketini desteklemiyor.
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
                <span className="text-muted-foreground">30+ Yıllık Sektör Tecrübesi</span>
              </div>
              <div className="flex items-center gap-3" data-testid="company-stat-projects">
                <CheckCircle className="w-6 h-6 text-primary" />
                <span className="text-muted-foreground">100+ Tamamlanmış Proje</span>
              </div>
              <div className="flex items-center gap-3" data-testid="company-stat-certification">
                <CheckCircle className="w-6 h-6 text-primary" />
                <span className="text-muted-foreground">ISO 9001 Kalite Sertifikası</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
