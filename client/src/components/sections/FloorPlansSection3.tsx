import { useState, useRef, useEffect } from 'react';
import { Download, ZoomIn, Users, Building, TrendingUp, Search, Filter } from 'lucide-react';
import { parseCSV, getBlockSummary, getAllBlocks, parseFirmInfoCSV, getFirmInfoForUnit, type FloorPlanUnit, type FirmInfo } from '@/lib/csvParser';

const floorPlanImages = {
  K: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&h=900',
  L: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&h=900',
  M: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&h=900'
} as const;

type FilterType = 'all' | 'available' | 'sold' | 'reserved' | 'with-firms';

export default function FloorPlansSection3() {
  const [activeBlock, setActiveBlock] = useState<string>('K');
  const [units, setUnits] = useState<FloorPlanUnit[]>([]);
  const [firms, setFirms] = useState<FirmInfo[]>([]);
  const [availableBlocks, setAvailableBlocks] = useState<string[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredUnit, setHoveredUnit] = useState<FloorPlanUnit | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Load CSV data on component mount
  useEffect(() => {
    const loadFloorPlanData = async () => {
      try {
        // Load units data
        const unitsResponse = await fetch('/3.etab - 3.etab.csv');
        const unitsContent = await unitsResponse.text();
        const parsedUnits = parseCSV(unitsContent, '3');
        setUnits(parsedUnits);
        
        // Load firm information
        const firmsResponse = await fetch('/MSM FİRMA BİLGİLERİ(1) - Sayfa1 (1).csv');
        const firmsContent = await firmsResponse.text();
        const parsedFirms = parseFirmInfoCSV(firmsContent);
        setFirms(parsedFirms);
        
        const blocks = getAllBlocks(parsedUnits);
        setAvailableBlocks(blocks);
        if (blocks.length > 0) {
          setActiveBlock(blocks[0]);
        }
      } catch (error) {
        console.error('Error loading floor plan data:', error);
      }
    };

    loadFloorPlanData();
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = floorPlanImages[activeBlock as keyof typeof floorPlanImages] || floorPlanImages.K;
    link.download = `${activeBlock}-blok-kat-plani-3etap.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoom = () => {
    if (imageRef.current) {
      imageRef.current.requestFullscreen();
    }
  };

  // Get current block data
  const blockSummary = getBlockSummary(units, activeBlock);
  const currentBlockUnits = units.filter(unit => unit.block === activeBlock);
  
  // Filter units based on search and filter
  const filteredUnits = currentBlockUnits.filter(unit => {
    const matchesSearch = searchTerm === '' || 
      unit.unitNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = false;
    if (filter === 'all') {
      matchesFilter = true;
    } else if (filter === 'with-firms') {
      matchesFilter = getFirmInfoForUnit(firms, unit.block, unit.unitNumber, '3') !== null;
    } else {
      matchesFilter = unit.status === filter;
    }
    
    return matchesSearch && matchesFilter;
  });

  return (
    <section className="section bg-gradient-to-br from-background via-muted to-background" data-testid="floorplans-section-3">
      <div className="w-full h-full flex flex-col px-0">
        <div className="px-8">
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-center bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
            Kat Planları - 3. Etap
          </h2>
          
          {/* Block Tabs */}
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
            {availableBlocks.map((block) => (
              <button
                key={block}
                className={`glass px-6 py-3 rounded-lg font-semibold whitespace-nowrap 
                           transition-all ${
                             activeBlock === block 
                               ? 'bg-primary/20 text-primary border-primary' 
                               : 'hover:bg-primary/20'
                           }`}
                onClick={() => setActiveBlock(block)}
                data-testid={`floor-tab-${block}`}
              >
                {block} Blok
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex gap-4 mb-6">
            {/* Search */}
            <div className="flex-1">
              <div className="glass rounded-xl overflow-hidden flex items-center">
                <Search className="w-5 h-5 text-muted-foreground ml-4" />
                <input 
                  type="text" 
                  placeholder="Ünite numarası ara..."
                  className="flex-1 bg-transparent px-4 py-2 outline-none text-foreground"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              {(['all', 'available', 'sold', 'reserved', 'with-firms'] as FilterType[]).map((filterType) => (
                <button
                  key={filterType}
                  className={`glass px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    filter === filterType ? 'bg-primary/20 text-primary' : 'hover:bg-primary/20'
                  }`}
                  onClick={() => setFilter(filterType)}
                >
                  {filterType === 'all' ? 'Tümü' : 
                   filterType === 'available' ? 'Müsait' : 
                   filterType === 'sold' ? 'Satılan' : 
                   filterType === 'reserved' ? 'Rezerve' :
                   filterType === 'with-firms' ? '🏢 Firma Var' : filterType}
                </button>
              ))}
            </div>
          </div>

          {/* Block Statistics */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="glass p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-primary">{blockSummary.total}</div>
              <div className="text-sm text-muted-foreground">Toplam Ünite</div>
            </div>
            <div className="glass p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-success">{blockSummary.available}</div>
              <div className="text-sm text-muted-foreground">Müsait</div>
            </div>
            <div className="glass p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-destructive">{blockSummary.sold}</div>
              <div className="text-sm text-muted-foreground">Satılan</div>
            </div>
            <div className="glass p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-warning">{blockSummary.reserved}</div>
              <div className="text-sm text-muted-foreground">Rezerve</div>
            </div>
          </div>
        </div>

        {/* Interactive Unit Grid */}
        <div className="flex-1 glass rounded-3xl overflow-hidden relative">
          <div className="w-full h-full p-8">
            <div className="w-full h-full relative">
              
              {/* Grid Container */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="grid gap-2 p-4" style={{
                  gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(currentBlockUnits.length))}, minmax(120px, 1fr))`,
                  maxWidth: '100%',
                  maxHeight: '90%'
                }}>
                  {currentBlockUnits.map((unit) => {
                    const isFiltered = filteredUnits.includes(unit);
                    return (
                      <div
                        key={`${unit.block}-${unit.unitNumber}`}
                        className={`
                          relative cursor-pointer transition-all duration-300 
                          ${isFiltered ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}
                          hover:scale-105 hover:z-10
                        `}
                        onMouseEnter={() => setHoveredUnit(unit)}
                        onMouseLeave={() => setHoveredUnit(null)}
                        onClick={() => {
                          // Handle unit click - could open modal or show details
                          console.log('Selected unit:', unit);
                        }}
                      >
                        {/* Unit Box */}
                        <div className={`
                          w-full h-24 rounded-lg border-2 transition-all duration-300
                          flex flex-col items-center justify-center text-center p-2 relative
                          ${unit.status === 'sold' 
                            ? 'bg-destructive/20 border-destructive hover:bg-destructive/30 text-destructive-foreground' 
                            : unit.status === 'reserved'
                            ? 'bg-warning/20 border-warning hover:bg-warning/30 text-warning-foreground'
                            : 'bg-success/20 border-success hover:bg-success/30 text-success-foreground'
                          }
                          ${!isFiltered ? 'grayscale' : ''}
                        `}>
                          {/* Unit Number */}
                          <div className="font-bold text-lg leading-tight">
                            {unit.unitNumber}
                          </div>
                          
                          {/* Unit Area */}
                          <div className="text-xs opacity-80 leading-tight">
                            {unit.netArea}m²
                          </div>
                          
                          {/* Status Indicator */}
                          <div className={`
                            absolute -top-1 -right-1 w-3 h-3 rounded-full
                            ${unit.status === 'sold' 
                              ? 'bg-destructive' 
                              : unit.status === 'reserved'
                              ? 'bg-warning'
                              : 'bg-success'
                            }
                          `} />
                          
                          {/* Firm Indicator */}
                          {getFirmInfoForUnit(firms, unit.block, unit.unitNumber, '3') && (
                            <div className="absolute -top-1 -left-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                              <span className="text-xs">🏢</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Combined Left Panel - Fixed to Screen Left */}
              <div className="fixed top-1/2 left-4 transform -translate-y-1/2 glass p-4 rounded-lg space-y-6 z-50">
                {/* Info Panel */}
                <div>
                  <h3 className="font-semibold text-primary mb-2">{activeBlock} Blok - 3. Etap</h3>
                  <div className="text-sm text-muted-foreground mb-2">
                    Toplam {currentBlockUnits.length} ünite
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Filtrelenmiş: {filteredUnits.length} ünite
                  </div>
                  {searchTerm && (
                    <div className="text-xs mt-2 text-accent">
                      Arama: "{searchTerm}"
                    </div>
                  )}
                </div>

                {/* Legend */}
                <div>
                  <div className="text-sm font-semibold mb-3">Durum Göstergeleri:</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-success rounded border-2 border-success"></div>
                      <span className="text-xs">Müsait</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-destructive rounded border-2 border-destructive"></div>
                      <span className="text-xs">Satıldı</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-warning rounded border-2 border-warning"></div>
                      <span className="text-xs">Rezerve</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-xs">🏢</span>
                      </div>
                      <span className="text-xs">Firma Bilgisi</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed Right Panel - Unit Info Display */}
              <div className="fixed top-1/2 right-8 transform -translate-y-1/2 glass p-4 rounded-lg z-50 min-w-[250px]">
                {hoveredUnit ? (
                  <div>
                    <div className="font-semibold text-primary mb-3">
                      {hoveredUnit.block} Blok - Ünite {hoveredUnit.unitNumber}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Net Alan:</span>
                        <span className="font-medium">{hoveredUnit.netArea} m²</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Brüt Alan:</span>
                        <span className="font-medium">{hoveredUnit.grossArea} m²</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Durum:</span>
                        <div className={`px-2 py-1 rounded text-xs font-semibold ${
                          hoveredUnit.status === 'sold' 
                            ? 'bg-destructive/20 text-destructive' 
                            : hoveredUnit.status === 'reserved'
                            ? 'bg-warning/20 text-warning'
                            : 'bg-success/20 text-success'
                        }`}>
                          {hoveredUnit.status === 'sold' ? 'Satıldı' : 
                           hoveredUnit.status === 'reserved' ? 'Rezerve' : 'Müsait'}
                        </div>
                      </div>
                      
                      {/* Firm Info */}
                      {(() => {
                        const firmInfo = getFirmInfoForUnit(firms, hoveredUnit.block, hoveredUnit.unitNumber, '3');
                        return firmInfo ? (
                          <div className="border-t pt-3 mt-3">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-accent">🏢</span>
                              <span className="font-medium text-accent">Firma Bilgileri</span>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div><span className="text-muted-foreground">Firma:</span> {firmInfo.firma}</div>
                              <div><span className="text-muted-foreground">Kiracı/Malik:</span> {firmInfo.kiraci}</div>
                              <div><span className="text-muted-foreground">İş Kolu:</span> {firmInfo.isKolu}</div>
                            </div>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <div className="mb-2">📍</div>
                    <div className="text-sm">
                      Ünite detayları için<br />
                      fareyi ünite üzerine getirin
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}