import { useState, useRef } from 'react';
import { Download, ZoomIn } from 'lucide-react';

const floorPlanData = {
  F: {
    name: 'F Blok',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&h=900',
    totalArea: '320 m²',
    ceilingHeight: '6.5 m',
    loadingDoor: '4 × 4.5 m'
  },
  M: {
    name: 'M Blok',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&h=900',
    totalArea: '290 m²',
    ceilingHeight: '6.0 m',
    loadingDoor: '3.5 × 4.0 m'
  },
  L: {
    name: 'L Blok',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&h=900',
    totalArea: '255 m²',
    ceilingHeight: '6.0 m',
    loadingDoor: '3.5 × 4.0 m'
  },
  E: {
    name: 'E Blok',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&h=900',
    totalArea: '275 m²',
    ceilingHeight: '6.5 m',
    loadingDoor: '4 × 4.0 m'
  },
  C: {
    name: 'C Blok',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&h=900',
    totalArea: '290 m²',
    ceilingHeight: '6.5 m',
    loadingDoor: '4 × 4.0 m'
  }
};

type FloorPlanKey = keyof typeof floorPlanData;

export default function FloorPlansSection() {
  const [activeFloor, setActiveFloor] = useState<FloorPlanKey>('F');
  const imageRef = useRef<HTMLImageElement>(null);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = floorPlanData[activeFloor].image;
    link.download = `${floorPlanData[activeFloor].name}-kat-plani.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoom = () => {
    if (imageRef.current) {
      imageRef.current.requestFullscreen();
    }
  };

  return (
    <section className="section bg-gradient-to-br from-background via-muted to-background" data-testid="floorplans-section">
      <div className="max-w-7xl mx-auto px-8 w-full h-full flex flex-col">
        <h2 className="text-5xl md:text-6xl font-black mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Kat Planları
        </h2>
        
        {/* Floor Plan Tabs */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {Object.entries(floorPlanData).map(([key, data]) => (
            <button
              key={key}
              className={`glass px-6 py-3 rounded-lg font-semibold whitespace-nowrap 
                         transition-all ${
                           activeFloor === key 
                             ? 'bg-primary/20 text-primary border-primary' 
                             : 'hover:bg-primary/20'
                         }`}
              onClick={() => setActiveFloor(key as FloorPlanKey)}
              data-testid={`floor-tab-${key}`}
            >
              {data.name}
            </button>
          ))}
        </div>
        
        {/* Floor Plan Display */}
        <div className="flex-1 glass rounded-3xl overflow-hidden relative">
          <div className="w-full h-full flex flex-col items-center justify-center p-8">
            {/* Floor Plan Image */}
            <div className="relative flex-1 w-full flex items-center justify-center">
              <img 
                ref={imageRef}
                src={floorPlanData[activeFloor].image}
                alt={`${floorPlanData[activeFloor].name} Floor Plan`} 
                className="max-w-full max-h-full object-contain rounded-xl cursor-zoom-in"
                onClick={handleZoom}
                data-testid="floorplan-image"
              />
            </div>
            
            {/* Floor Plan Info Overlay */}
            <div className="w-full mt-6">
              <div className="glass p-6 rounded-2xl">
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div data-testid="floorplan-total-area">
                    <div className="text-sm text-muted-foreground mb-1">Toplam Alan</div>
                    <div className="text-2xl font-bold text-primary">
                      {floorPlanData[activeFloor].totalArea}
                    </div>
                  </div>
                  <div data-testid="floorplan-ceiling-height">
                    <div className="text-sm text-muted-foreground mb-1">Tavan Yüksekliği</div>
                    <div className="text-2xl font-bold text-accent">
                      {floorPlanData[activeFloor].ceilingHeight}
                    </div>
                  </div>
                  <div data-testid="floorplan-loading-door">
                    <div className="text-sm text-muted-foreground mb-1">Yükleme Kapısı</div>
                    <div className="text-2xl font-bold text-success">
                      {floorPlanData[activeFloor].loadingDoor}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    className="glass px-6 py-2 rounded-lg font-semibold text-sm 
                               hover:bg-primary/20 transition-all flex items-center gap-2"
                    onClick={handleZoom}
                    data-testid="floorplan-zoom"
                  >
                    <ZoomIn className="w-5 h-5" />
                    Yakınlaştır
                  </button>
                  <button 
                    className="glass px-6 py-2 rounded-lg font-semibold text-sm 
                               hover:bg-primary/20 transition-all flex items-center gap-2"
                    onClick={handleDownload}
                    data-testid="floorplan-download"
                  >
                    <Download className="w-5 h-5" />
                    İndir (PDF)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
