import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function ThankYouSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        gsap.fromTo('.thank-you-content',
                            { opacity: 0, scale: 0.9 },
                            { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
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
            className="section relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            data-testid="thank-you-section"
        >
            <div className="thank-you-content flex flex-col items-center justify-center p-8 text-center opacity-0">
                {/* Logo Container */}
                <div className="w-64 h-64 md:w-80 md:h-80 mb-8 flex items-center justify-center">
                    <img
                        src="/innogy.png"
                        alt="İNNO Gayrimenkul Yatırım Logo"
                        className="w-full h-full object-contain"
                        style={{ filter: 'drop-shadow(0 0 20px rgba(255, 107, 26, 0.2))' }}
                    />
                </div>

                {/* Thank You Text */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 py-4 leading-relaxed" style={{
                    background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    TEŞEKKÜRLER
                </h1>

                <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide">
                    MODEL SANAYİ MERKEZİ
                </p>
            </div>
        </section>
    );
}
