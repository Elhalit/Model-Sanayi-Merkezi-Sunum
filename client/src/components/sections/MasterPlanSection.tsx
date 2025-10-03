import { useState, useEffect, useRef } from 'react';
import { Search, ZoomIn, ZoomOut, RotateCcw, Filter } from 'lucide-react';
import { gsap } from 'gsap';
import unitData from '@/data/unitData.json';

type Unit = {
  unitNumber: string;
  blockName: string;
  size: number;
  status: 'available' | 'sold';
  price: number;
  companyName?: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type FilterType = 'all' | 'available' | 'sold';

export default function MasterPlanSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const units: Unit[] = unitData as Unit[];

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`;
    }
  }, [zoomLevel, panOffset]);

  const handleUnitClick = (unit: Unit) => {
    setSelectedUnit(unit);
    
    // Animate unit selection
    const unitElement = document.querySelector(`[data-unit="${unit.unitNumber}"]`);
    if (unitElement) {
      gsap.to(unitElement, {
        scale: 1.1,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }

    // Trigger modal opening (handled by UnitModal component)
    const event = new CustomEvent('openUnitModal', { detail: unit });
    window.dispatchEvent(event);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      // Reset all units visibility
      units.forEach(unit => {
        const unitElement = document.querySelector(`[data-unit="${unit.unitNumber}"]`);
        if (unitElement) {
          gsap.to(unitElement.parentElement, { opacity: 1, scale: 1, duration: 0.3 });
        }
      });
      return;
    }

    units.forEach(unit => {
      const unitElement = document.querySelector(`[data-unit="${unit.unitNumber}"]`);
      if (unitElement) {
        if (unit.unitNumber.toLowerCase().includes(term.toLowerCase())) {
          gsap.to(unitElement.parentElement, { opacity: 1, scale: 1.1, duration: 0.3 });
        } else {
          gsap.to(unitElement.parentElement, { opacity: 0.2, scale: 1, duration: 0.3 });
        }
      }
    });
  };

  const handleFilter = (filterType: FilterType) => {
    setFilter(filterType);
    
    units.forEach(unit => {
      const unitElement = document.querySelector(`[data-unit="${unit.unitNumber}"]`);
      if (unitElement) {
        const shouldShow = filterType === 'all' || unit.status === filterType;
        gsap.to(unitElement.parentElement, { 
          opacity: shouldShow ? 1 : 0.2, 
          duration: 0.3 
        });
      }
    });
  };

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    if (direction === 'in') {
      setZoomLevel(Math.min(zoomLevel * 1.2, 3));
    } else if (direction === 'out') {
      setZoomLevel(Math.max(zoomLevel / 1.2, 1));
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
    if (isPanning) {
      setPanOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  return (
    <section className="section bg-gradient-to-br from-background via-card to-background" data-testid="masterplan-section">
      <div className="max-w-7xl mx-auto px-8 w-full h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Vaziyet Planı
          </h2>
          
          {/* Filter Controls */}
          <div className="flex gap-3">
            <button 
              className={`glass px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                filter === 'all' ? 'bg-primary/20 text-primary' : 'hover:bg-primary/20'
              }`}
              onClick={() => handleFilter('all')}
              data-testid="filter-all"
            >
              <Filter className="w-4 h-4 inline mr-2" />
              Tümü
            </button>
            <button 
              className={`glass px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                filter === 'available' ? 'bg-success/20 text-success' : 'hover:bg-success/20'
              }`}
              onClick={() => handleFilter('available')}
              data-testid="filter-available"
            >
              Müsait
            </button>
            <button 
              className={`glass px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                filter === 'sold' ? 'bg-destructive/20 text-destructive' : 'hover:bg-destructive/20'
              }`}
              onClick={() => handleFilter('sold')}
              data-testid="filter-sold"
            >
              Satılan
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="glass rounded-xl overflow-hidden flex items-center">
            <Search className="w-6 h-6 text-muted-foreground ml-4" />
            <input 
              type="text" 
              placeholder="Blok veya ünite numarası ara (örn: M-1, F-5)" 
              className="flex-1 bg-transparent px-4 py-3 outline-none text-foreground"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              data-testid="unit-search"
            />
          </div>
        </div>
        
        {/* Master Plan Container */}
        <div className="flex-1 glass rounded-3xl overflow-hidden relative">
          <div 
            className="w-full h-full relative cursor-grab"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            data-testid="masterplan-container"
          >
            <div ref={containerRef} className="w-full h-full transition-transform duration-300">
              <svg 
                ref={svgRef}
                viewBox="0 0 1200 800" 
                className="w-full h-full"
                data-testid="masterplan-svg"
              >
                {/* Background */}
                <rect width="1200" height="800" fill="hsl(220, 26%, 10%)" />
                
                {/* Roads */}
                <path d="M 0 400 L 1200 400" stroke="hsl(220, 26%, 18%)" strokeWidth="30" />
                <path d="M 600 0 L 600 800" stroke="hsl(220, 26%, 18%)" strokeWidth="30" />
                
                {/* Render Units */}
                {units.map((unit) => (
                  <g 
                    key={unit.unitNumber} 
                    className="unit-group cursor-pointer" 
                    data-block={unit.blockName}
                    onClick={() => handleUnitClick(unit)}
                  >
                    <rect
                      className={unit.status === 'available' ? 'unit-available' : 'unit-sold'}
                      x={unit.x}
                      y={unit.y}
                      width={unit.width}
                      height={unit.height}
                      rx="8"
                      strokeWidth="2"
                      data-unit={unit.unitNumber}
                      data-size={unit.size}
                      data-status={unit.status}
                      data-price={unit.price}
                      data-company={unit.companyName}
                    />
                    <text 
                      x={unit.x + unit.width / 2} 
                      y={unit.y + unit.height / 2 - 10} 
                      textAnchor="middle" 
                      fill="white" 
                      fontSize="20" 
                      fontWeight="bold" 
                      pointerEvents="none"
                    >
                      {unit.unitNumber}
                    </text>
                    <text 
                      x={unit.x + unit.width / 2} 
                      y={unit.y + unit.height / 2 + 15} 
                      textAnchor="middle" 
                      fill="white" 
                      fontSize="14" 
                      opacity="0.8" 
                      pointerEvents="none"
                    >
                      {unit.size} m²
                    </text>
                  </g>
                ))}
                
                {/* Legend */}
                <text x="50" y="750" fill="white" fontSize="18" fontWeight="bold">Legend:</text>
                <rect className="unit-available" x="150" y="735" width="40" height="20" rx="4" strokeWidth="1" />
                <text x="200" y="750" fill="white" fontSize="16">Müsait</text>
                <rect className="unit-sold" x="300" y="735" width="40" height="20" rx="4" strokeWidth="1" />
                <text x="350" y="750" fill="white" fontSize="16">Satılan</text>
              </svg>
            </div>
          </div>
          
          {/* Zoom Controls */}
          <div className="absolute bottom-8 left-8 flex gap-2 z-10">
            <button 
              className="glass w-12 h-12 rounded-lg flex items-center justify-center 
                         text-primary hover:bg-primary/20 transition-all"
              onClick={() => handleZoom('in')}
              data-testid="zoom-in"
            >
              <ZoomIn className="w-6 h-6" />
            </button>
            <button 
              className="glass w-12 h-12 rounded-lg flex items-center justify-center 
                         text-primary hover:bg-primary/20 transition-all"
              onClick={() => handleZoom('out')}
              data-testid="zoom-out"
            >
              <ZoomOut className="w-6 h-6" />
            </button>
            <button 
              className="glass w-12 h-12 rounded-lg flex items-center justify-center 
                         text-primary hover:bg-primary/20 transition-all"
              onClick={() => handleZoom('reset')}
              data-testid="zoom-reset"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
