import { useEffect, useRef, useState } from 'react';
import { Building2, Factory, Hammer, Calendar, Award, Users, Target, Handshake, X } from 'lucide-react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';
import { useAnimations } from '@/hooks/useAnimations';

export default function PartnershipSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { animateOnScroll } = useAnimations();
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  useEffect(() => {
    if (sectionRef.current && constellationRef.current) {
      // Set initial states - everything visible (no animations)
      gsap.set('.constellation-node', { opacity: 1, scale: 1 });
      gsap.set('.company-info', { opacity: 1, y: 0 });

      // Initial title animation
      gsap.fromTo('#partnership-title', 
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, []);

  // Handle video play - trigger fullscreen
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      // Use setTimeout to ensure the play event is fully processed
      setTimeout(() => {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if ((video as any).webkitEnterFullscreen) {
          (video as any).webkitEnterFullscreen();
        } else if ((video as any).mozRequestFullScreen) {
          (video as any).mozRequestFullScreen();
        } else if ((video as any).msRequestFullscreen) {
          (video as any).msRequestFullscreen();
        }
      }, 100);
    };

    video.addEventListener('play', handlePlay);
    return () => video.removeEventListener('play', handlePlay);
  }, []);

  // Removed complex animations - everything is visible by default

  // Removed hover effects - no animations on hover

  const handleNodeClick = (companyId: string) => {
    setSelectedCompany(companyId);
    
    // Zoom out constellation
    gsap.to('.constellation-container', {
      scale: 0.7,
      x: '-20%',
      duration: 0.8,
      ease: 'power3.out'
    });
    
    // Show detail panel
    gsap.fromTo('#detail-panel', 
      { x: '100%' },
      { x: '0%', duration: 0.8, ease: 'power3.out' }
    );
  };

  const closeDetailPanel = () => {
    setSelectedCompany(null);
    
    // Reset constellation position
    gsap.to('.constellation-container', {
      scale: 1,
      x: '0%',
      duration: 0.8,
      ease: 'power3.out'
    });
    
    // Hide detail panel
    gsap.to('#detail-panel', {
      x: '100%',
      duration: 0.8,
      ease: 'power3.out'
    });
  };

  const getCompanyData = (companyId: string) => {
    const companies = {
      'inno': {
        title: 'İNNO Gayrimenkul Yatırım A.Ş.',
        since: '2017',
        features: [
          'İş Geliştirme',
          'Kalite',
          'Sürdürülebilirlik',
          'Topluma Katkı'
        ],
        projects: [],
        color: 'from-gray-600 to-gray-800',
        icon: Hammer,
        logo: '/İnno-GY-Logo.png',
        story: "2017 yılında Abdullah TÜTÜNCÜ (Nadir Metal Rafineri) ve Ali YAMAN (NET İnşaat Danışmanlık Mühendislik A.Ş.) ortaklığı ile kurulan İNNO Gayrimenkul Yatırım A.Ş. birçok projenin altına başarıyla imza atmaktadır.",
        videoUrl: undefined
      },
      'nadir': {
        title: 'Nadir Metal Rafineri',
        since: '1967',
        features: [''],
        projects: [],
        color: 'from-gray-600 to-gray-800',
        icon: Award,
        logo: '/nadirmetal.jpeg',
        story: "1967 yılında, Nadir Tütüncü kuyumcu ramatı işlemek üzere, 150 m² alana sahip atölyesini faaliyete geçirmiştir.",
        videoUrl: undefined
      },
      'net': {
        title: 'NET İnşaat Danışmanlık Mühendislik A.Ş.',
        since: '1996',
        features: [''],
        projects: [],
        color: 'from-gray-600 to-gray-800',
        icon: Building2,
        logo: '/Net-logo.png',
        story: "1996 yılında temelleri atılan NET İnşaat Danışmanlık Mühendislik A.Ş.; yapı projelendirme, danışmanlık ve taahhüt alanlarında faaliyet göstermektedir.",
        videoUrl: undefined
      },
      'som': {
        title: 'Som Prefabrik İnşaat AŞ.',
        since: 'Betonarme Yapı',
        features: [''],
        projects: [],
        color: 'from-gray-600 to-gray-800',
        icon: Factory,
        logo: '/Som-Prefabrik-Logo.png',
        story: "Prefabrik Betonarme Yapı sektöründe, müşterilerimizin gereksinimleri ile beklentilerinin karşılanması ve aşılmasına yönelik olarak üretim, satış ve satış sonrası hizmetlerde faaliyet göstermektedir.",
        videoUrl: "/som-video.mp4"
      }
    };
    return companies[companyId as keyof typeof companies];
  };

  return (
    <section 
      ref={sectionRef}
      className="section relative overflow-hidden"
      data-testid="partnership-section"
    >
      {/* Static Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

      {/* Hakkımızda Title - Absolute Left */}
      <div className="absolute top-8 left-8 z-30">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black" style={{ 
          background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Hakkımızda
        </h2>
      </div>

      <div className="relative z-10 h-full flex">
        {/* Left Side - Header Section */}
        <div className="w-1/3 flex flex-col justify-center px-8 py-16 space-y-12">
          <div id="partnership-title" className="opacity-0">
            <div className="flex items-center mb-6">
              <Handshake className="w-12 h-12 mr-4 animate-pulse" style={{ color: '#ff5300' }} />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black" style={{ 
                background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Stratejik Ortaklık
              </h1>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              2017 yılında kurulan güçlü ortaklığımız Sektörde liderlik eden üç şirketin birikimini bir araya getirerek müşterilerimize mükemmel hizmet sunmayı hedeflemektedir
            </p>
          </div>
          
          {/* Success Statement - Left Side */}
          <div className="company-info opacity-0">
            <div className="flex items-center mb-6">
              <Award className="w-12 h-12 mr-4 animate-pulse" style={{ color: '#ff5300' }} />
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black" style={{ 
                background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Başarının Formülü
              </h3>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Müşteri memnuniyetinin en üst düzeyde gerçekleşmesi önceliği ile üzerinde çalışılan projeler; mükemmellik, hız, yenilik ve güvenlikten ödün vermeden optimum çözümler üretilerek hayata geçirilmektedir.
            </p>
          </div>
        </div>

        {/* Right Side - Constellation Container */}
        <div className="w-2/3 flex items-center justify-center px-4 relative">
          <div 
            ref={constellationRef}
            className="constellation-container relative w-full h-full"
          >
            {/* Connection Lines using SVG for better responsiveness */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                </linearGradient>
                
                <filter id="glow">
                  <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Nadir to INNO - NEW: starts from bottom-right of Nadir, ends at top-left of INNO */}
              <path 
                d="M 20 30 Q 35 40 50 50" 
                stroke="url(#energyGradient)" 
                strokeWidth="0.4" 
                fill="none"
                filter="url(#glow)"
                className="opacity-80"
                strokeDasharray="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              
              {/* NET to INNO - NEW: starts from bottom-left of NET, ends at top-right of INNO */}
              <path 
                d="M 80 30 Q 65 40 50 50" 
                stroke="url(#energyGradient)" 
                strokeWidth="0.4" 
                fill="none"
                filter="url(#glow)"
                className="opacity-80"
                strokeDasharray="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              
              {/* SOM to NET - NEW: vertical line from SOM to NET */}
              <path 
                d="M 80 70 L 80 30" 
                stroke="url(#energyGradient)" 
                strokeWidth="0.4" 
                fill="none"
                filter="url(#glow)"
                className="opacity-80"
                strokeDasharray="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Central Node - INNO Gayrimenkul */}
            <div 
              id="inno"
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ${selectedCompany ? 'pointer-events-none' : 'cursor-pointer'}`}
              onClick={() => handleNodeClick('inno')}
            >
              <div className="relative flex flex-col items-center">
                <div className="w-36 h-36 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center p-2">
                  <img 
                    src="/İnno-GY-Logo.png" 
                    alt="İNNO Gayrimenkul Yatırım Logo" 
                    className="w-full h-full object-contain"
                    style={{ background: 'transparent', border: 'none' }}
                    onError={(e) => {
                      // Fallback to icon if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <Hammer className="w-10 h-10 text-gray-400 hidden" />
                </div>
                <div className="text-center mt-3">
                  <h3 className="text-sm md:text-base font-bold text-white leading-tight">İNNO Gayrimenkul Yatırım A.Ş.</h3>
                  <p className="text-xs md:text-sm text-white/80 mt-1">2017</p>
                </div>
              </div>
            </div>

            {/* Partner Nodes */}
            {/* Nadir Metal Rafineri */}
            <div 
              id="nadir"
              className={`constellation-node partner-node absolute z-10 ${selectedCompany ? 'pointer-events-none' : 'cursor-pointer'}`}
              style={{ top: '15%', left: '8%' }}
              onClick={() => handleNodeClick('nadir')}
            >
              <div className="relative flex flex-col items-center">
                <div className="w-28 h-28 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center p-2">
                  <img 
                    src="/nadirmetal.jpeg" 
                    alt="Nadir Metal Rafineri Logo" 
                    className="w-full h-full object-contain rounded-full"
                    style={{ background: 'transparent', border: 'none' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <Award className="w-10 h-10 text-gray-400 hidden" />
                </div>
                <div className="text-center mt-2">
                  <span className="text-xs md:text-sm font-bold text-white leading-tight block">Nadir Metal Rafineri</span>
                  <span className="text-xs text-white/80 block mt-1">1967</span>
                </div>
              </div>
            </div>
  
            {/* NET İnşaat */}
            <div 
              id="net"
              className={`constellation-node partner-node absolute z-10 ${selectedCompany ? 'pointer-events-none' : 'cursor-pointer'}`}
              style={{ top: '15%', right: '8%' }}
              onClick={() => handleNodeClick('net')}
            >
              <div className="relative flex flex-col items-center">
                <div className="w-28 h-28 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center p-2">
                  <img 
                    src="/Net-logo.png" 
                    alt="NET İnşaat Danışmanlık Mühendislik Logo" 
                    className="w-full h-full object-contain rounded-full"
                    style={{ background: 'transparent', border: 'none' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <Building2 className="w-10 h-10 text-gray-400 hidden" />
                </div>
                <div className="text-center mt-2">
                  <span className="text-xs md:text-sm font-bold text-white leading-tight block">NET İnşaat Danışmanlık Mühendislik A.Ş.</span>
                  <span className="text-xs text-white/80 block mt-1">1996</span>
                </div>
              </div>
            </div>
  
            {/* SOM Prefabrik */}
            <div 
              id="som"
              className={`constellation-node partner-node absolute z-10 ${selectedCompany ? 'pointer-events-none' : 'cursor-pointer'}`}
              style={{ bottom: '15%', right: '8%' }}
              onClick={() => handleNodeClick('som')}
            >
              <div className="relative flex flex-col items-center">
                <div className="w-28 h-28 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center p-2">
                  <img 
                    src="/Som-Prefabrik-Logo.png" 
                    alt="SOM Prefabrik Betonarme Logo" 
                    className="w-full h-full object-contain rounded-full"
                    style={{ background: 'transparent', border: 'none' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <Factory className="w-10 h-10 text-gray-400 hidden" />
                </div>
                <div className="text-center mt-2">
                  <span className="text-xs md:text-sm font-bold text-white leading-tight block">Som Prefabrik İnşaat A.Ş.</span>
                  <span className="text-xs text-white/80 block mt-1">Betonarme Yapı</span>
                </div>
              </div>
            </div>
           </div>
        </div>
      </div>

            {/* Detail Panel */}
      {selectedCompany && (
        <div 
          id="detail-panel"
          className="fixed top-0 right-0 bottom-0 bg-background/95 backdrop-blur-xl border-l border-border z-50"
          style={{ 
            transform: 'translateX(100%)',
            width: '50vw',
            maxWidth: '50vw'
          }}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-8 pb-4 border-b border-border/20">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                {getCompanyData(selectedCompany)?.title}
              </h2>
              <button
                onClick={closeDetailPanel}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8">
              <div className="space-y-6">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 p-4">
                  {getCompanyData(selectedCompany)?.logo ? (
                    <img 
                      src={getCompanyData(selectedCompany)?.logo} 
                      alt={`${getCompanyData(selectedCompany)?.title} Logo`}
                      className="w-full h-full object-contain rounded-full"
                    />
                  ) : (
                    (() => {
                      const companyData = getCompanyData(selectedCompany);
                      const IconComponent = companyData?.icon;
                      return IconComponent ? <IconComponent className="w-16 h-16 text-gray-600" /> : null;
                    })()
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Kuruluş</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{getCompanyData(selectedCompany)?.since}</p>
                </div>
                
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-4">Hikaye</h3>
                  <div className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 max-h-64 overflow-y-auto">
                    {getCompanyData(selectedCompany)?.story.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Show video for SOM */}
                {selectedCompany === 'som' && getCompanyData(selectedCompany)?.videoUrl && (
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-4">Tanıtım Videosu</h3>
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <video
                        ref={videoRef}
                        width="100%"
                        height="100%"
                        src={getCompanyData(selectedCompany)?.videoUrl}
                        controls
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                )}
                
                {/* Show Projects for NET */}
                {selectedCompany === 'net' && getCompanyData(selectedCompany)?.projects && getCompanyData(selectedCompany)?.projects.length > 0 && (
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-4">Gerçekleştirilen Projeler</h3>
                    <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                      {getCompanyData(selectedCompany)?.projects.map((project, index) => (
                        <div key={index} className="glass p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground">{project}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}


    </section>
  );
}