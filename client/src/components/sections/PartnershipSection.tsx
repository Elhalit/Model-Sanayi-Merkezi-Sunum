import { useEffect, useRef, useState } from 'react';
import { Building2, Factory, Hammer, Calendar, Award, Users, Target, Handshake, X } from 'lucide-react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';
import { useAnimations } from '@/hooks/useAnimations';

export default function PartnershipSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);
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
        title: 'İNNO Gayrimenkul',
        since: '2017 yılından itibaren',
        features: [
          'İş Geliştirme',
          'Kalite',
          'Sürdürülebilirlik',
          'Topluma Katkı'
        ],
        projects: [],
        color: 'from-gray-600 to-gray-800',
        icon: Hammer,
        logo: '/innogy.png',
        story: "2017 yılında Abdullah TÜTÜNCÜ (Nadir Metal Rafineri) ve Ali YAMAN (NET İnşaat Danışmanlık Mühendislik A.Ş.) ortaklığı ile kurulan İNNO Gayrimenkul Yatırım A.Ş. birçok projenin altına başarıyla imza atmaktadır.\n\n1967 yılından bu yana Kapalıçarşı'da Kıymetli Metal sektöründe faaliyet gösteren ve \"Türkiye'nin 500 Büyük Sanayi Kuruluşu\" (ISO 500) listesinde sekiz yıldır listenin ilk 100 firması arasında yerini alan Nadir Metal Rafineri, 2019 yılında da 43'üncü sırada yer alarak istikrarlı duruşunu sergilemeye devam etti.\n\nİş Geliştirme: Sürekli gelişim ve yenilik odaklı iş stratejileri ile sektörde güçlü adımlar atıyoruz. Projelerimizi titizlikle yöneterek, kalite, hız ve güvenilirlikten ödün vermeden en iyi çözümleri sunuyoruz.\n\nKalite: Sürekli ve istikrarlı bir yaklaşım başarıyı garanti eder. Projelerimizi sonuna kadar titizlikle takip eder, beklentileri aşmak için proaktif çözümler üretiriz.\n\nSürdürülebilirlik: Sorumluluğumuz, yalnızca çevre dostu yapılarla sınırlı değildir. Ortaklarımız, projelerimiz ve bulunduğumuz bölgeler için kurumsal sosyal sorumluluk anlayışımızı her aşamada hayata geçiririz.\n\nTopluma Katkı: Paylaşım kültürümüz, çalışanlarımızı topluma geri vermeye teşvik eder. Bu sayede değer üretirken, çevremize katkıda bulunmaya devam ederiz.",
        videoUrl: undefined
      },
      'nadir': {
        title: t('partnership.companies.nadir.title'),
        since: t('partnership.companies.nadir.since'),
        features: t('partnership.companies.nadir.features', { returnObjects: true }) as string[],
        projects: [],
        color: 'from-gray-600 to-gray-800',
        icon: Award,
        logo: '/nadirmetal.png',
        story: "1967 yılında, Nadir Tütüncü kuyumcu ramatı işlemek üzere, 150 m² alana sahip atölyesini faaliyete geçirmiştir. 1975 yılından itibaren de piyasa için kıymetli metal rafinasyonuna başlamış ve 1985 yılına dek faaliyeti bunlarla sınırlı olarak büyümüştür.\n\n1985 yılında Nadir Ticaret kurulmuş ve Kapalıçarşı'da kıymetli metal ticaretine başlamıştır. 1993 yılında ise Nadir Metal Rafineri San. Tic. Ltd. Şti. kurulmuştur. Talebin hızla artması firmayı yatırıma yöneltmiş, 1996 yılında ülke toprağı üzerindeki ilk altın rafinerisinin temelleri atılmıştır.\n\n2006 yılında Nadir Metal Rafineri A.Ş. ünvanını almış ve 2008 yılında BIST-Borsa İstanbul'a, 2011 yılında LBMA – Londra Külçe Piyasası Birliği'ne, 2016 yılında Singapur Külçe Birliği'ne, 2020 yılında da SGEI – Şangay Uluslararası Altın Borsası'na üye olmuştur.\n\nBugün, rafinasyon, atık dönüşümü ve laboratuar hizmetlerinin yanı sıra, altın, gümüş, platin, paladyum, rodyumun alım ve satımını yapmaktadır.",
        videoUrl: undefined
      },
      'net': {
        title: t('partnership.companies.net.title'),
        since: t('partnership.companies.net.since'),
        features: t('partnership.companies.net.features', { returnObjects: true }) as string[],
        projects: [
          'Model Kuyum Merkezi',
          'Model Sanayi Merkezi Kapaklı',
          '4R Atık Ara Depolama',
          '4R Çevre ve Enerji',
          'İstanbul Fiat – Iveco Servis',
          'Akdoğan Plastik',
          'Doluca Gıda Tesisi',
          'Çakmaklı Depo Binası',
          'HMA Mimarlık İnşaat A.Ş.',
          'Akçak Otel',
          'Bostancılar Petrol',
          'Kumburgaz Sanayi Sitesi',
          'Şelale Evleri',
          'Ertürk Sitesi',
          'Aks City',
          'Spor Salonu'
        ],
        color: 'from-gray-600 to-gray-800',
        icon: Building2,
        logo: '/netidm.png',
        story: "1996 yılında temelleri atılan NET İnşaat Danışmanlık Mühendislik A.Ş.; yapı projelendirme, danışmanlık ve taahhüt alanlarında faaliyet göstermektedir.\n\nNET İnşaat Danışmanlık Mühendislik; firma stratejisini faaliyet gösterdiği sektörde öncü olmak, ortaya konulan ürünlerin oluşum sürecinde çevreye ve toplum değerlerine saygılı olmak, daha iyi bir geleceğe katkıda bulunmak olarak benimsemiştir.\n\n20 yılı aşan tecrübesi ve birikiminin yanı sıra, müşteri odaklı ve verimliliği hedefleyen bir çalışma anlayışı ile birlikte sahip olduğu bu yaklaşım yalnızca maddi kazanımlarla değil, ortaya çıkan ürünlerin tüm topluma kattıkları ile değer kazanmakta ve gelişmektedir.\n\nEndüstriyel tesisler, fabrika binaları, depolama binaları, araç satış ve servis istasyonları, oteller, okullar, konut ve kentsel dönüşüm projeleri, spor tesisleri gibi birbirinden bağımsız birçok alanda hizmet vermektedir.\n\nKalite Politikası: İnşaat sektöründe deneyimlerimizle güvenilir ve örnek bir şirket olmak, maksimum müşteri memnuniyeti için tüm uzmanlık alanlarındaki bilgi birikimini ürünlere yansıtmak temel prensiptir.",
        videoUrl: undefined
      },
      'som': {
        title: t('partnership.companies.som.title'),
        since: t('partnership.companies.som.since'),
        features: t('partnership.companies.som.features', { returnObjects: true }) as string[],
        projects: [],
        color: 'from-gray-600 to-gray-800',
        icon: Factory,
        logo: '/som.png',
        story: "Prefabrik Betonarme Yapı sektöründe, müşterilerimizin gereksinimleri ile beklentilerinin karşılanması ve aşılmasına yönelik olarak üretim, satış ve satış sonrası hizmetlerde faaliyet göstermektedir.\n\nÖncelikle kalite ve teslim süreleri bakımından hatasız; güvenli; ulusal, uluslararası standartlar ve mevzuatlar ile uyumlu; yüksek teknolojik sistemlerle ürün üreterek kusursuz hizmet vermektedir.\n\nÇalışanların sürekli olarak eğitilmelerini ve kendilerini geliştirmelerini sağlayarak, sürekli gelişmeyi hedefleyerek sektöründe öncü kuruluş olmayı amaçlamaktadır.",
        videoUrl: "https://www.youtube.com/embed/-iVMqxUWlRc?si=XD2D9_vnuZA8L2xy"
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

      <div className="relative z-10 h-full flex">
        {/* Left Side - Header Section */}
        <div className="w-1/3 flex flex-col justify-center px-8 py-16 space-y-12">
          <div id="partnership-title" className="opacity-0">
            <div className="flex items-center mb-6">
              <Handshake className="w-12 h-12 text-primary mr-4 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {t('partnership.title')}
              </h1>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t('partnership.subtitle')} {t('partnership.description')}
            </p>
          </div>
          
          {/* Success Statement - Left Side */}
          <div className="company-info opacity-0">
            <div className="flex items-center mb-6">
              <Award className="w-12 h-12 text-primary mr-4 animate-pulse" />
              <h3 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {t('partnership.success.title')}
              </h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('partnership.success.description')}
            </p>
          </div>
        </div>

        {/* Right Side - Constellation Container */}
        <div className="w-2/3 flex items-center justify-center px-4">
          <div 
            ref={constellationRef}
            className="constellation-container relative w-full h-full"
          >
            {/* Connection Lines using SVG for better responsiveness */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
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
              
              {/* Nadir to INNO - properly centered */}
              <path 
                d="M 12 22 Q 31 36 50 50" 
                stroke="url(#energyGradient)" 
                strokeWidth="0.4" 
                fill="none"
                filter="url(#glow)"
                className="opacity-80"
              />
              {/* NET to INNO - properly centered */}
              <path 
                d="M 88 22 Q 69 36 50 50" 
                stroke="url(#energyGradient)" 
                strokeWidth="0.4" 
                fill="none"
                filter="url(#glow)"
                className="opacity-80"
              />
              {/* SOM to NET - vertical connection between icons */}
              <path 
                d="M 88 85 L 88 22" 
                stroke="url(#energyGradient)" 
                strokeWidth="0.4" 
                fill="none"
                filter="url(#glow)"
                className="opacity-80"
              />
            </svg>

            {/* Central Node - INNO Gayrimenkul */}
            <div 
              id="inno"
              className={`constellation-node absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${selectedCompany ? 'pointer-events-none' : 'cursor-pointer'}`}
              onClick={() => handleNodeClick('inno')}
            >
              <div className="relative">
                <div className="w-36 h-36 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex flex-col items-center justify-center border-2 border-gray-400/50">
                  <div className="w-18 h-18 rounded-full overflow-hidden mb-2 border-2 border-white/20 bg-white">
                    <img 
                      src="/innogy.png" 
                      alt="İNNO Logo" 
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        // Fallback to icon if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <Hammer className="w-8 h-8 text-gray-400 hidden" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-bold text-white">İNNO</h3>
                    <p className="text-xs text-white/80">2017</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner Nodes */}
            {/* Nadir Metal Rafineri */}
            <div 
              id="nadir"
              className={`constellation-node partner-node absolute ${selectedCompany ? 'pointer-events-none' : 'cursor-pointer'}`}
              style={{ top: '15%', left: '8%' }}
              onClick={() => handleNodeClick('nadir')}
            >
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex flex-col items-center justify-center border-2 border-gray-400/50">
                  <div className="w-14 h-14 rounded-full overflow-hidden mb-1 border border-white/20 bg-white">
                    <img 
                      src="/nadirmetal.png" 
                      alt="Nadir Metal Logo" 
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <Award className="w-7 h-7 text-gray-400 hidden" />
                  </div>
                  <span className="text-xs font-bold text-white">Nadir</span>
                  <span className="text-xs text-white/80">1967</span>
                </div>
              </div>
            </div>

            {/* NET İnşaat */}
            <div 
              id="net"
              className={`constellation-node partner-node absolute ${selectedCompany ? 'pointer-events-none' : 'cursor-pointer'}`}
              style={{ top: '15%', right: '8%' }}
              onClick={() => handleNodeClick('net')}
            >
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex flex-col items-center justify-center border-2 border-gray-400/50">
                  <div className="w-14 h-14 rounded-full overflow-hidden mb-1 border border-white/20 bg-white">
                    <img 
                      src="/netidm.png" 
                      alt="NET İnşaat Logo" 
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <Building2 className="w-7 h-7 text-gray-400 hidden" />
                  </div>
                  <span className="text-xs font-bold text-white">NET</span>
                  <span className="text-xs text-white/80">1996</span>
                </div>
              </div>
            </div>

            {/* SOM Prefabrik */}
            <div 
              id="som"
              className={`constellation-node partner-node absolute ${selectedCompany ? 'pointer-events-none' : 'cursor-pointer'}`}
              style={{ bottom: '15%', right: '8%' }}
              onClick={() => handleNodeClick('som')}
            >
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex flex-col items-center justify-center border-2 border-gray-400/50">
                  <div className="w-14 h-14 rounded-full overflow-hidden mb-1 border border-white/20 bg-white">
                    <img 
                      src="/som.png" 
                      alt="SOM Prefabrik Logo" 
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <Factory className="w-7 h-7 text-gray-400 hidden" />
                  </div>
                  <span className="text-xs font-bold text-white">SOM</span>
                  <span className="text-xs text-white/80">Prefabrik</span>
                </div>
              </div>
            </div>

            {/* Founder Nodes */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-6">
              <div className="company-info opacity-0">
                <div className="glass px-4 py-2 rounded-full flex items-center space-x-2">
                  <Users className="w-4 h-4 text-accent" />
                  <div>
                    <p className="text-xs font-bold">Abdullah TÜTÜNCÜ</p>
                    <p className="text-xs text-muted-foreground">Nadir Metal Rafineri</p>
                  </div>
                </div>
              </div>
              <div className="company-info opacity-0">
                <div className="glass px-4 py-2 rounded-full flex items-center space-x-2">
                  <Target className="w-4 h-4 text-success" />
                  <div>
                    <p className="text-xs font-bold">Ali YAMAN</p>
                    <p className="text-xs text-muted-foreground">NET İnşaat & SOM Prefabrik</p>
                  </div>
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
              <h2 className="text-3xl font-bold text-primary">
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
                <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mb-6 p-4">
                {getCompanyData(selectedCompany)?.logo ? (
                  <img 
                    src={getCompanyData(selectedCompany)?.logo} 
                    alt={`${getCompanyData(selectedCompany)?.title} Logo`}
                    className="w-full h-full object-contain"
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
                <h3 className="text-xl font-semibold mb-2">Kuruluş</h3>
                <p className="text-muted-foreground">{getCompanyData(selectedCompany)?.since}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Hikaye</h3>
                <div className="text-muted-foreground leading-relaxed mb-6 max-h-64 overflow-y-auto">
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
                  <h3 className="text-xl font-semibold mb-4">Tanıtım Videosu</h3>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={getCompanyData(selectedCompany)?.videoUrl}
                      title="SOM Prefabrik Tanıtım Videosu"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Özellikler</h3>
                <ul className="space-y-3">
                  {getCompanyData(selectedCompany)?.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Show Projects for NET */}
              {selectedCompany === 'net' && getCompanyData(selectedCompany)?.projects && getCompanyData(selectedCompany)?.projects.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Gerçekleştirilen Projeler</h3>
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