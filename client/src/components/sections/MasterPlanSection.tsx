import { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import { gsap } from 'gsap';

export default function MasterPlanSection() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`;
    }
  }, [zoomLevel, panOffset]);

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    if (direction === 'in') {
      setZoomLevel(Math.min(zoomLevel * 1.3, 4));
    } else if (direction === 'out') {
      setZoomLevel(Math.max(zoomLevel / 1.3, 0.5));
    } else {
      setZoomLevel(1);
      setPanOffset({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsPanning(true);
      setPanStart({
        x: e.clientX - panOffset.x,
        y: e.clientY - panOffset.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && zoomLevel > 1) {
      setPanOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      // Enter fullscreen mode
      gsap.to(containerRef.current, {
        duration: 0.5,
        ease: 'power2.out'
      });
    } else {
      // Exit fullscreen mode
      setZoomLevel(1);
      setPanOffset({ x: 0, y: 0 });
    }
  };

  return (
    <section className="section bg-gradient-to-br from-background via-card to-background" data-testid="masterplan-section">
      <div className="max-w-7xl mx-auto px-8 w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
            Vaziyet Planı
          </h2>
          
          {/* Info Badge */}
          <div className="glass px-4 py-2 rounded-lg">
            <span className="text-sm font-medium text-muted-foreground">
              Master Plan Layout
            </span>
          </div>
        </div>
        
        {/* Master Plan Image Container */}
        <div className={`flex-1 glass rounded-3xl overflow-hidden relative ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
          <div 
            className={`w-full h-full relative ${zoomLevel > 1 ? 'cursor-grab' : 'cursor-zoom-in'} ${isPanning ? 'cursor-grabbing' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={(e) => {
              if (zoomLevel === 1 && !isPanning) {
                handleZoom('in');
              }
            }}
            data-testid="masterplan-container"
          >
            <div 
              ref={containerRef} 
              className="w-full h-full transition-transform duration-300 origin-center flex items-center justify-center"
            >
              <img 
                ref={imageRef}
                src="/masterplan.png" 
                alt="Horizon Estate Master Plan" 
                className="max-w-full max-h-full object-contain select-none"
                draggable={false}
                onLoad={() => {
                  // Animate image fade-in
                  gsap.fromTo(imageRef.current, 
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
                  );
                }}
              />
            </div>
          </div>
          
          {/* Control Panel */}
          <div className="absolute bottom-8 left-8 flex gap-2 z-10">
            <button 
              className="glass w-12 h-12 rounded-lg flex items-center justify-center 
                         text-primary hover:bg-primary/20 transition-all shadow-lg backdrop-blur-md"
              onClick={() => handleZoom('in')}
              disabled={zoomLevel >= 4}
              data-testid="zoom-in"
              title="Yakınlaştır"
            >
              <ZoomIn className="w-6 h-6" />
            </button>
            <button 
              className="glass w-12 h-12 rounded-lg flex items-center justify-center 
                         text-primary hover:bg-primary/20 transition-all shadow-lg backdrop-blur-md"
              onClick={() => handleZoom('out')}
              disabled={zoomLevel <= 0.5}
              data-testid="zoom-out"
              title="Uzaklaştır"
            >
              <ZoomOut className="w-6 h-6" />
            </button>
            <button 
              className="glass w-12 h-12 rounded-lg flex items-center justify-center 
                         text-primary hover:bg-primary/20 transition-all shadow-lg backdrop-blur-md"
              onClick={() => handleZoom('reset')}
              data-testid="zoom-reset"
              title="Sıfırla"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
            <button 
              className="glass w-12 h-12 rounded-lg flex items-center justify-center 
                         text-primary hover:bg-primary/20 transition-all shadow-lg backdrop-blur-md"
              onClick={toggleFullscreen}
              data-testid="fullscreen-toggle"
              title={isFullscreen ? 'Tam Ekrandan Çık' : 'Tam Ekran'}
            >
              {isFullscreen ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
            </button>
          </div>

          {/* Zoom Level Indicator */}
          {zoomLevel !== 1 && (
            <div className="absolute top-8 left-8 glass px-3 py-2 rounded-lg z-10">
              <span className="text-sm font-medium text-muted-foreground">
                {Math.round(zoomLevel * 100)}%
              </span>
            </div>
          )}

          {/* Instructions */}
          <div className="absolute top-8 right-8 glass px-4 py-2 rounded-lg z-10 max-w-xs">
            <p className="text-xs text-muted-foreground text-center">
              {zoomLevel === 1 
                ? "Yakınlaştırmak için resme tıklayın" 
                : "Sürükleyerek hareket ettirin"
              }
            </p>
          </div>

          {/* Fullscreen Exit Hint */}
          {isFullscreen && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                           glass px-6 py-3 rounded-lg z-20 pointer-events-none">
              <p className="text-sm text-muted-foreground">
                ESC tuşu ile tam ekrandan çıkabilirsiniz
              </p>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass p-4 rounded-xl text-center">
            <h3 className="font-semibold text-primary mb-2">Toplam Alan</h3>
            <p className="text-2xl font-bold">125,000 m²</p>
          </div>
          <div className="glass p-4 rounded-xl text-center">
            <h3 className="font-semibold text-primary mb-2">Yeşil Alan</h3>
            <p className="text-2xl font-bold">65%</p>
          </div>
          <div className="glass p-4 rounded-xl text-center">
            <h3 className="font-semibold text-primary mb-2">Blok Sayısı</h3>
            <p className="text-2xl font-bold">12 Blok</p>
          </div>
        </div>
      </div>

      {/* Keyboard Event Handler */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-40"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              toggleFullscreen();
            }
          }}
          tabIndex={-1}
        />
      )}
    </section>
  );
}
