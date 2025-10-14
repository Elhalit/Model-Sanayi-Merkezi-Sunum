import { useEffect, useRef } from 'react';
import { Building2, Zap, Shield, Truck, Users, Camera, Gauge, Settings } from 'lucide-react';
import { gsap } from 'gsap';

export default function ProjectSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate features
            gsap.fromTo('.project-feature',
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
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
    <section ref={sectionRef} className="section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" data-testid="project-section">
      <div className="w-full h-full px-4 py-4 overflow-y-auto">
        
        {/* Hero Section - Full Width with Images */}
        <div className="w-full mb-8">
          <div className="flex items-stretch justify-between gap-2 mb-6">
            {/* Left Image */}
            <div className="flex-shrink-0 w-[35%]">
              <img 
                src="/sanayi1.png" 
                alt="Sanayi Merkezi Görünüm 1" 
                className="w-full h-full rounded-xl shadow-2xl object-cover min-h-[32rem] max-h-[45rem]"
              />
            </div>
            
            {/* Center Text */}
            <div className="flex-1 text-center px-2 flex flex-col justify-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
                BİR SANAYİ<br />
                SİTESİNDEKİ<br />
                TÜM BEKLENTİNİZİ<br />
                KARŞILAMAK İÇİN<br />
                TASARLANDI
              </h1>
            </div>
            
            {/* Right Image */}
            <div className="flex-shrink-0 w-[35%]">
              <img 
                src="/sanayi2.png" 
                alt="Sanayi Merkezi Görünüm 2" 
                className="w-full h-full rounded-xl shadow-2xl object-cover min-h-[32rem] max-h-[45rem]"
              />
            </div>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-sm md:text-base text-muted-foreground max-w-5xl mx-auto leading-relaxed mb-4">
              Sanayinin kalbi, Çerkezköy'e komşu, hızla gelişmekte olan Kapaklı ilçesinde, imalat 
              anlayışını kusursuzca yansıtan, modüler yapısıyla her talebe cevap verebilen, modern 
              çizgisiyle Model Sanayi Merkezi şimdi keşfedilmeye hazır.
            </p>
            
            <div className="text-lg md:text-xl font-bold text-primary mb-4">
              BİRBİRİNDEN ÖNEMLİ VE DEĞERLİ, SİZE ARTI DEĞER KATACAK FIRSATLARI İLE FARK YARATIN.
            </div>
          </div>
        </div>

        {/* Features Grid - Full Width */}
        <div className="w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          <div className="glass p-3 rounded-lg text-center project-feature opacity-0">
            <Gauge className="w-6 h-6 text-primary mx-auto mb-1" />
            <h4 className="text-xs font-bold">Zemin Taşıma Kapasitesi</h4>
          </div>
          
          <div className="glass p-3 rounded-lg text-center project-feature opacity-0">
            <Building2 className="w-6 h-6 text-accent mx-auto mb-1" />
            <h4 className="text-xs font-bold">8-12 metre Kat Yüksekliği</h4>
          </div>
          
          <div className="glass p-3 rounded-lg text-center project-feature opacity-0">
            <Truck className="w-6 h-6 text-success mx-auto mb-1" />
            <h4 className="text-xs font-bold">Her İşletmeye Düz Araç Girişi</h4>
          </div>
          
          <div className="glass p-3 rounded-lg text-center project-feature opacity-0">
            <Zap className="w-6 h-6 text-warning mx-auto mb-1" />
            <h4 className="text-xs font-bold">Sanayi Elektriği</h4>
          </div>
          
          <div className="glass p-3 rounded-lg text-center project-feature opacity-0">
            <Shield className="w-6 h-6 text-destructive mx-auto mb-1" />
            <h4 className="text-xs font-bold">Yangına Dayanıklı Cephe Panelleri</h4>
          </div>
          
          <div className="glass p-3 rounded-lg text-center project-feature opacity-0">
            <Shield className="w-6 h-6 text-primary mx-auto mb-1" />
            <h4 className="text-xs font-bold">Yangına Dayanıklı Çatı Kaplaması</h4>
          </div>
          
          <div className="glass p-3 rounded-lg text-center project-feature opacity-0">
            <Settings className="w-6 h-6 text-accent mx-auto mb-1" />
            <h4 className="text-xs font-bold">Kantar Esnek Kullanım Alanı</h4>
          </div>
          
          <div className="glass p-3 rounded-lg text-center project-feature opacity-0">
            <Truck className="w-6 h-6 text-success mx-auto mb-1" />
            <h4 className="text-xs font-bold">Otopark</h4>
          </div>
          
          <div className="glass p-3 rounded-lg text-center project-feature opacity-0">
            <Building2 className="w-6 h-6 text-warning mx-auto mb-1" />
            <h4 className="text-xs font-bold">Kanalizasyon</h4>
          </div>
          
          <div className="glass p-3 rounded-lg text-center project-feature opacity-0">
            <Camera className="w-6 h-6 text-destructive mx-auto mb-1" />
            <h4 className="text-xs font-bold">Kameralı Güvenlik</h4>
          </div>
          
          <div className="glass p-3 rounded-lg text-center project-feature opacity-0">
            <Zap className="w-6 h-6 text-primary mx-auto mb-1" />
            <h4 className="text-xs font-bold">Paratoner</h4>
          </div>
          
          <div className="glass p-3 rounded-lg text-center project-feature opacity-0">
            <Users className="w-6 h-6 text-accent mx-auto mb-1" />
            <h4 className="text-xs font-bold">Sosyal Alanlar</h4>
          </div>
        </div>

        {/* Employment Section - Full Width */}
        <div className="w-full grid md:grid-cols-2 gap-6 mb-8">
          <div className="glass p-6 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-black text-primary mb-3">
              YÜKSEK İSTİHDAM İMKANI İLE GÜCÜ HİSSEDECEKSİNİZ
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
              Nüfusu 300.000 kişinin üzerinde olan Kapalı ve Çerkezköy ilçelerinde nüfus 
              artışının ortalama yıllık %10 oranında olduğu gözlemlenmektedir.
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Bu nüfusun yaklaşık %50'si 25 - 45 yaş aralığındaki üreten nüfus olduğu belirlenmiştir.
            </p>
          </div>
          
          <div className="glass p-6 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-black text-accent mb-3">
              İŞİNİ BÜYÜTMEK İSTEYENLERE, VAZGEÇEMEYECEKLERİ İMKANLAR
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
              Konumu, konsepti ve mimari yapısıyla Model Sanayi Merkezi, işletmelere 
              100 m²'den 11.000 m²'ye kadar alternatifler sunan, 8 bloktan oluşan bir projedir.
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              İsteğinize bağlı olarak iç tasarımı tamamlanmış veya işinize uygun olarak kendinizin 
              tasarlayabileceği, ister imalat, ister depolama, isterseniz de ofis olarak 
              kullanabileceğiniz alanlar.
            </p>
          </div>
        </div>

        {/* Modular System */}
        <div className="w-full glass p-8 rounded-2xl mb-12">
          <h2 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            BÜYÜTÜLEBİLİR İŞ MODELİNE UYGUN MODÜLER SİSTEM, YÜKSEK TAVAN VE TIR GİREBİLİR ALANI
          </h2>
          <div className="flex justify-center space-x-12">
            <div className="text-center">
              <div className="text-4xl font-black text-primary">9,50 m</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-accent">8,00 m</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-success">12,00 m</div>
            </div>
          </div>
        </div>

        {/* Industry Zones */}
        <div className="w-full mb-12">
          <h2 className="text-3xl font-black text-center mb-8 text-primary">
            DÜNYA TİCARETİNE ULAŞMAK HİÇ BU KADAR KOLAY OLMADI
          </h2>
          <p className="text-center text-lg mb-8 text-muted-foreground">
            SEKTÖRLERİNDE LİDER KURULUŞLARA ULAŞMA VE ÇALIŞTIĞINIZ FİRMALARLA TİCARETİNİZİ GENİŞLETME FIRSATINI YAKALAYIN!
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="glass p-6 rounded-xl text-center">
              <div className="text-3xl font-black text-primary mb-2">176</div>
              <div className="text-sm">FİRMA</div>
              <div className="text-xs text-muted-foreground mt-2">VELİMEŞE ORGANİZE SANAYİ BÖLGESİ</div>
            </div>
            
            <div className="glass p-6 rounded-xl text-center">
              <div className="text-3xl font-black text-accent mb-2">21</div>
              <div className="text-sm">FİRMA</div>
              <div className="text-xs text-muted-foreground mt-2">YALIBOYU ORGANİZE SANAYİ BÖLGESİ</div>
            </div>
            
            <div className="glass p-6 rounded-xl text-center">
              <div className="text-3xl font-black text-success mb-2">190</div>
              <div className="text-sm">FİRMA</div>
              <div className="text-xs text-muted-foreground mt-2">ERGENE ORGANİZE SANAYİ BÖLGESİ</div>
            </div>
            
            <div className="glass p-6 rounded-xl text-center">
              <div className="text-3xl font-black text-warning mb-2">312</div>
              <div className="text-sm">FİRMA</div>
              <div className="text-xs text-muted-foreground mt-2">ÇERKEZKÖY ORGANİZE SANAYİ BÖLGE</div>
            </div>
            
            <div className="glass p-6 rounded-xl text-center">
              <div className="text-3xl font-black text-destructive mb-2">31</div>
              <div className="text-sm">FİRMA</div>
              <div className="text-xs text-muted-foreground mt-2">KAPAKLI ORGANİZE SANAYİ BÖLGESİ</div>
            </div>
            
            <div className="glass p-6 rounded-xl text-center">
              <div className="text-3xl font-black text-primary mb-2">72</div>
              <div className="text-sm">FİRMA</div>
              <div className="text-xs text-muted-foreground mt-2">VELİKÖY ORGANİZE SANAYİ BÖLGESİ</div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
