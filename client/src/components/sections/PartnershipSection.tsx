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
      x: '20%',
      duration: 0.8,
      ease: 'power3.out'
    });

    // Show detail panel
    gsap.fromTo('#detail-panel',
      { x: '-100%' },
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
      x: '-100%',
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
        logo: '/final_inno_logo.png',
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
        logo: '/som.png',
        story: "Kırklareli OSB’deki modern üretim tesisimiz; teknolojik altyapısı, deneyimli mühendislik kadrosu ve yüksek üretim kapasitesiyle endüstriyel tesisler, fabrikalar, lojistik depolar ve sanayi yapıları için hızlı, güvenilir ve ekonomik çözümler sunmaktadır.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder video URL - replace with actual SOM video
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
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black py-2" style={{
          background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          HAKKIMIZDA
        </h2>
      </div>

      <div className="relative z-10 h-full w-full flex items-center justify-center">
        {/* Main INNO Section - Full Width */}
        <div className="w-full px-8 max-w-7xl mx-auto flex items-center justify-center">
          <div
            className="flex flex-row items-center gap-8 px-8 py-16 w-full"
          >
            {/* INNO Logo */}
            <div className="shrink-0 w-80 h-64 flex items-center justify-center">
              <img
                src="/final_inno_logo.png"
                alt="İNNO Gayrimenkul Yatırım Logo"
                className="w-full h-full object-contain"
                style={{ background: 'transparent', border: 'none' }}
                onError={(e) => {
                  console.error('Failed to load İnno logo');
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <Hammer className="w-10 h-10 text-white hidden" />
            </div>

            {/* INNO Description */}
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">İNNO Gayrimenkul Yatırım A.Ş.</h2>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                İnno ülke sanayisine katkı sunmak ve gayrimenkul sektörünü ileri taşımak için stratejik lokasyonlarda endüstriyel tesis, imalathane, depolama ve lojistik alanlarından oluşan sanayi merkezleri inşa eden bu alanda öncü firmalardan biridir.
                <br />
                <span
                  className="font-bold cursor-pointer hover:scale-105 inline-block transition-transform mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNodeClick('som');
                  }}
                  style={{
                    background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textDecoration: 'underline',
                    textDecorationColor: '#ff5300'
                  }}
                >
                  Üretimdeki gücümüz
                </span>
                {' '}ile sektörde fark yaratmaya devam ediyoruz.
              </p>
            </div>
          </div>
        </div>
        {/* Constellation removed - replaced with simple two-column layout */}
        <div style={{ display: 'none' }}>
          <svg style={{ display: 'none' }}>
            <defs>
              <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
              </linearGradient>

              <filter id="glow">
                <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
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
                  src="/final_inno_logo.png"
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
                  src="/som.png"
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

      {/* Detail Panel - Full Screen */}
      {selectedCompany && (
        <div
          id="detail-panel"
          className="fixed inset-0 bg-slate-900 z-50 overflow-hidden"
          style={{
            transform: 'translateX(-100%)',
            zIndex: 60
          }}
        >
          {/* Added prominent, absolute positioned close button for the panel */}
          <button
            onClick={closeDetailPanel}
            className="absolute top-6 left-6 z-50 p-3 bg-white/10 text-white rounded-full shadow-lg hover:bg-white/20 hover:scale-110 transition-all duration-300"
            title="Kapat"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="h-full flex flex-col px-12 py-8">
            <div className="flex items-center justify-between pb-4 border-b border-border/20 pl-20 shrink-0">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                {getCompanyData(selectedCompany)?.title}
              </h2>
            </div>

            <div id="partnership-popup-content" className="flex-1 flex flex-col overflow-hidden pt-4 pb-8 space-y-4">
              <div className="flex gap-8 items-start shrink-0">
                <div className={`${selectedCompany === 'som' ? 'w-48 h-24' : 'w-32 h-32 rounded-full bg-white p-4'} flex items-center justify-center shrink-0`}>
                  {getCompanyData(selectedCompany)?.logo ? (
                    <img
                      src={getCompanyData(selectedCompany)?.logo}
                      alt={`${getCompanyData(selectedCompany)?.title} Logo`}
                      className={`w-full h-full object-contain ${selectedCompany === 'som' ? '' : 'rounded-full'}`}
                      style={{ background: 'transparent', border: 'none' }}
                    />
                  ) : (
                    (() => {
                      const companyData = getCompanyData(selectedCompany);
                      const IconComponent = companyData?.icon;
                      return IconComponent ? <IconComponent className="w-16 h-16 text-gray-600" /> : null;
                    })()
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Hakkımızda</h3>
                  <div className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {getCompanyData(selectedCompany)?.story.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-2 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Show video for SOM */}
              {selectedCompany === 'som' && (
                <div className="flex-1 min-h-0 flex flex-col">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 shrink-0">Tanıtım Videosu</h3>
                  <div className="flex-1 min-h-0 rounded-lg overflow-hidden bg-black relative group w-full max-w-4xl mx-auto">
                    <video
                      controls
                      className="w-full h-full relative z-10"
                      src="/SOM PREFABRİK TANITIM(720P_HD).mp4"
                      playsInline
                      muted={false}
                      ref={videoRef}
                      style={{ pointerEvents: 'auto' }}
                      onLoadedMetadata={(e) => {
                        e.currentTarget.currentTime = 41;
                      }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}