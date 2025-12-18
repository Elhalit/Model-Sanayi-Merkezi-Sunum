import { useRef, useState, useEffect } from 'react';

export default function IntroVideoSection() {
    return (
        <section className="section bg-black relative overflow-hidden" data-testid="intro-video-section">
            {/* Video Container - Fits full screen */}
            <div className="absolute inset-0 w-full h-full bg-black">
                <video
                    src="/Model Sanayi Merkezi_nde 4. Etap Başlıyor_(720P_HD).mp4"
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    controls
                    muted={false}
                    style={{ pointerEvents: 'auto', zIndex: 0 }}
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
