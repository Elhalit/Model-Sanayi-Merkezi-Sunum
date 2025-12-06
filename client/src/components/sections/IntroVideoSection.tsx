import { useRef, useState, useEffect } from 'react';

export default function IntroVideoSection() {
    return (
        <section className="section bg-black relative overflow-hidden" data-testid="intro-video-section">
            {/* Video Background Wrapper - Forces 16:9 Aspect Ratio to Cover Screen */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] min-w-full min-h-full h-[56.25vw]">
                <video
                    src="/tanitim-filmi.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                />
            </div>

            {/* Title Overlay - Centered at Top like ProjectSection */}
            <div className="absolute top-0 left-0 w-full z-10 pointer-events-none flex justify-center pt-6">
                <h2 className="text-2xl md:text-3xl font-black text-center py-2" style={{
                    background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    TANITIM FİLMİ
                </h2>
            </div>
        </section>
    );
}
