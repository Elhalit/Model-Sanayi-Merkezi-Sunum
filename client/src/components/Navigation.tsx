import { useState } from 'react';
import { ArrowLeft, ArrowRight, Maximize2, Minimize2 } from 'lucide-react';

interface NavigationProps {
  currentSection: number;
  onNavigate: (section: number) => void;
  totalSections: number;
}

const sectionNames = [
  'Giriş',
  'Ortaklık',
  'Projemiz',
  'Stratejik Lokasyon',
  'Vaziyet Planı',
  'Kat Planları - 1. Etap',
  'Kat Planları - 2. Etap',
  'Kat Planları - 3. Etap',
  'Kat Planları - 4. Etap',
  'Kat Planları - 5. Etap'
];

export default function Navigation({ currentSection, onNavigate, totalSections }: NavigationProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <>
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4">
        {Array.from({ length: totalSections }).map((_, index) => (
          <div
            key={index}
            className={`relative group cursor-pointer transition-all duration-300 ${
              currentSection === index 
                ? 'w-4 h-4 bg-primary' 
                : 'w-3 h-3 bg-white/30 hover:bg-primary/60 hover:scale-110'
            } rounded-full`}
            onClick={() => onNavigate(index)}
            data-testid={`nav-dot-${index}`}
          >
            {/* Tooltip */}
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 
                            bg-card/90 backdrop-blur-sm border border-border/30
                            px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            pointer-events-none">
              {sectionNames[index]}
            </div>
          </div>
        ))}
      </div>

      {/* Arrow Navigation - Moved to Bottom */}
      {currentSection > 0 && (
        <button
          className="fixed left-8 bottom-8 z-50
                     glass w-15 h-15 rounded-full flex items-center justify-center
                     text-primary hover:bg-primary/20 hover:scale-110
                     transition-all duration-300 glow"
          onClick={() => onNavigate(currentSection - 1)}
          data-testid="nav-prev"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>
      )}

      {currentSection < totalSections - 1 && (
        <button
          className="fixed right-8 bottom-8 z-50
                     glass w-15 h-15 rounded-full flex items-center justify-center
                     text-primary hover:bg-primary/20 hover:scale-110
                     transition-all duration-300 glow"
          onClick={() => onNavigate(currentSection + 1)}
          data-testid="nav-next"
        >
          <ArrowRight className="w-8 h-8" />
        </button>
      )}

      {/* Fullscreen Toggle */}
      <button
        className="fixed top-8 right-8 z-50
                   glass px-4 py-3 rounded-lg flex items-center justify-center
                   text-primary hover:bg-primary/20 transition-all duration-300"
        onClick={toggleFullscreen}
        data-testid="fullscreen-toggle"
      >
        {isFullscreen ? (
          <Minimize2 className="w-6 h-6" />
        ) : (
          <Maximize2 className="w-6 h-6" />
        )}
      </button>
    </>
  );
}
