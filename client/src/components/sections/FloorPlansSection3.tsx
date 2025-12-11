import { useState, useRef, useEffect } from 'react';
import { Download, ZoomIn, Users, Building, TrendingUp, Search, Filter } from 'lucide-react';
import { parseCSV, getBlockSummary, getAllBlocks, parseFirmInfoCSV, getFirmInfoForUnit, parseZKNKCSV, type FloorPlanUnit, type FirmInfo } from '@/lib/csvParser';
import PaymentModal from '../PaymentModal';

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
  const [selectedUnit, setSelectedUnit] = useState<FloorPlanUnit | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // Load CSV data on component mount
  useEffect(() => {
    const loadFloorPlanData = async () => {
      try {
        // Load units data
        const unitsResponse = await fetch('/3.etab - 3.etab.csv');
        const unitsContent = await unitsResponse.text();
        let parsedUnits = parseCSV(unitsContent, '3');

        // Load ZKNK data
        try {
          const zknkResponse = await fetch('/zknk_data.csv');
          if (zknkResponse.ok) {
            const zknkContent = await zknkResponse.text();
            const zknkData = parseZKNKCSV(zknkContent);

            // Merge ZKNK data
            parsedUnits = parsedUnits.map(unit => {
              // Ensure block prefix logic matches CSV content (sometimes prefix is needed, sometimes not)
              // For simplicity, we try direct match first
              const key = `${unit.block}-${unit.unitNumber}`;
              if (zknkData[key]) {
                return {
                  ...unit,
                  groundFloorArea: zknkData[key].ground,
                  normalFloorArea: zknkData[key].normal,
                  priceTL: zknkData[key].priceTL,
                  priceUSD: zknkData[key].priceUSD
                };
              }
              return unit;
            });
          }
        } catch (err) {
          console.error('Error loading ZKNK data:', err);
        }

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

  // Sort units: arrange in columns, bottom to top (1-5 per column)
  const sortedUnits = [...currentBlockUnits].sort((a, b) => {
    const numA = parseInt(a.unitNumber);
    const numB = parseInt(b.unitNumber);
    return numA - numB;
  });

  // Calculate grid dimensions - 6 units per column (bottom to top)
  const unitsPerColumn = 6;
  const numColumns = Math.max(1, Math.ceil(sortedUnits.length / unitsPerColumn));

  // Rearrange units to display bottom-to-top in columns
  const arrangedUnits: FloorPlanUnit[] = [];
  for (let col = 0; col < numColumns; col++) {
    const columnUnits: FloorPlanUnit[] = [];
    for (let row = 0; row < unitsPerColumn; row++) {
      const index = col * unitsPerColumn + row;
      if (index < sortedUnits.length) {
        columnUnits.push(sortedUnits[index]);
      }
    }
    // Reverse to show bottom to top
    arrangedUnits.push(...columnUnits.reverse());
  }

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
    <section
      className="section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative h-screen w-full overflow-hidden"
      data-testid="floorplans-section-3"
    >
      <div className="w-full h-full flex flex-col relative z-10 pl-12 pr-32">
        {/* Top Section - Compact Header */}
        <div className="px-6 pt-4 shrink-0 flex flex-col gap-3">
          <h2 className="text-2xl md:text-3xl font-black text-center py-2" style={{
            background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            KAT PLANLARI - 3. ETAP
          </h2>

          {/* Controls Row */}
          <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto w-full">
            {/* Block Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {availableBlocks.map((block) => (
                <button
                  key={block}
                  className={`glass px-4 py-2 rounded-lg font-semibold whitespace-nowrap text-sm
                             transition-all border border-white/10 ${activeBlock === block
                      ? 'bg-primary/20 text-primary border-primary'
                      : 'hover:bg-primary/20 text-white/70'
                    }`}
                  onClick={() => setActiveBlock(block)}
                >
                  {block} Blok
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="w-64">
              <div className="glass rounded-lg overflow-hidden flex items-center border border-white/10 h-10">
                <Search className="w-4 h-4 text-white/50 ml-3" />
                <input
                  type="text"
                  placeholder="Ünite ara..."
                  className="flex-1 bg-transparent px-3 py-1 outline-none text-white text-sm placeholder:text-white/30"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filters removed as per request */}
          </div>

          {/* Block Statistics - Compact */}
          <div className="grid grid-cols-4 gap-3 max-w-3xl mx-auto w-full">
            <div className="glass px-3 py-2 rounded-lg text-center border border-white/10 bg-white/5 flex items-center justify-between">
              <span className="text-xs text-white/60">Toplam</span>
              <span className="text-lg font-bold text-primary">{blockSummary.total}</span>
            </div>
            <div className="glass px-3 py-2 rounded-lg text-center border border-white/10 bg-white/5 flex items-center justify-between">
              <span className="text-xs text-white/60">Müsait</span>
              <span className="text-lg font-bold text-success">{blockSummary.available}</span>
            </div>
            <div className="glass px-3 py-2 rounded-lg text-center border border-white/10 bg-white/5 flex items-center justify-between">
              <span className="text-xs text-white/60">Satılan</span>
              <span className="text-lg font-bold text-destructive">{blockSummary.sold}</span>
            </div>
            <div className="glass px-3 py-2 rounded-lg text-center border border-white/10 bg-white/5 flex items-center justify-between">
              <span className="text-xs text-white/60">Rezerve</span>
              <span className="text-lg font-bold text-warning">{blockSummary.reserved}</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex min-h-0 px-6 pb-6 pt-4 gap-6 overflow-hidden">

          {/* Left Sidebar - Info & Details */}
          <div className="w-80 shrink-0 flex flex-col gap-4 overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">

            {/* Block Info & Legend */}
            <div className="glass p-5 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl">
              <h3 className="font-semibold text-orange-500 mb-3 text-lg border-b border-white/10 pb-2">
                {activeBlock} Blok Bilgisi
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/60">Görüntülenen:</span>
                    <span className="text-white font-medium">{filteredUnits.length} / {currentBlockUnits.length}</span>
                  </div>
                  {searchTerm && (
                    <div className="text-xs text-accent">
                      Arama: "{searchTerm}"
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Göstergeler</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-xs text-white/80">Müsait</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded">
                      <div className="w-3 h-3 bg-destructive rounded-full"></div>
                      <span className="text-xs text-white/80">Satıldı</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded">
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <span className="text-xs text-white/80">Rezerve</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded">
                      <div className="w-3 h-3 bg-accent rounded-full flex items-center justify-center text-[8px]">🏢</div>
                      <span className="text-xs text-white/80">Firma</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Unit Details Card */}
            <div className={`glass p-5 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-300 ${selectedUnit ? 'opacity-100 translate-x-0' : 'opacity-50 translate-x-0'}`}>
              {selectedUnit ? (
                <div>
                  <div className="font-semibold text-orange-500 mb-4 text-lg border-b border-white/10 pb-2 flex items-center justify-between">
                    <span>Ünite {selectedUnit.unitNumber}</span>
                    <span className="text-xs text-white/50 font-normal">{selectedUnit.block} Blok</span>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 p-2 rounded-lg">
                        <span className="text-white/50 text-xs block mb-1">Zemin Kat m²</span>
                        <span className="font-bold text-white text-lg">{selectedUnit.groundFloorArea || '-'} m²</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg">
                        <span className="text-white/50 text-xs block mb-1">Normal Kat m²</span>
                        <span className="font-bold text-white text-lg">{selectedUnit.normalFloorArea || '-'} m²</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/50 text-xs block">Durum</span>
                      </div>

                      {selectedUnit.status === 'available' ? (
                        <div
                          className="w-full relative z-[100] cursor-pointer"
                          onClick={() => {
                            console.log('Opening payment modal (wrapper click) for', selectedUnit.unitNumber);
                            setShowPaymentModal(true);
                          }}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Opening payment modal (button click) for', selectedUnit.unitNumber);
                              setShowPaymentModal(true);
                            }}
                            className="w-full px-3 py-2 rounded-lg text-sm font-bold text-center uppercase tracking-wider transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg group relative overflow-hidden bg-success/20 text-success border border-success/30 hover:bg-success/30 pointer-events-auto z-[101]"
                          >
                            <div className="flex items-center justify-center gap-2 pointer-events-none">
                              <span>Müsait</span>
                              <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] animate-pulse">

                              </span>
                            </div>
                          </button>
                        </div>
                      ) : (
                        <div className={`px-3 py-2 rounded-lg text-sm font-bold text-center uppercase tracking-wider
                           ${selectedUnit.status === 'sold'
                            ? 'bg-destructive/20 text-destructive border border-destructive/30'
                            : 'bg-warning/20 text-warning border border-warning/30'
                          }`}>
                          {selectedUnit.status === 'sold' ? 'Satıldı' : 'Rezerve'}
                        </div>
                      )}
                    </div>

                    {/* Firm Information */}
                    {(() => {
                      const firmInfo = getFirmInfoForUnit(firms, selectedUnit.block, selectedUnit.unitNumber, '3');
                      return firmInfo ? (
                        <div className="border-t border-white/10 pt-4 mt-4">
                          <div className="text-xs font-bold text-orange-500 mb-3 flex items-center gap-2 uppercase tracking-wider">
                            <span>🏢</span> Firma Bilgileri
                          </div>
                          <div className="space-y-3 bg-white/5 p-3 rounded-lg">
                            <div>
                              <span className="text-white/40 text-[10px] uppercase tracking-wider block mb-1">Firma Adı</span>
                              <div className="font-semibold text-white text-sm leading-tight">{firmInfo.firma}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-white/40 text-[10px] uppercase tracking-wider block mb-1">Durum</span>
                                <span className={`font-bold text-xs ${firmInfo.kiraci.includes('MALİK') ? 'text-success' : 'text-warning'
                                  }`}>
                                  {firmInfo.kiraci}
                                </span>
                              </div>
                              <div>
                                <span className="text-white/40 text-[10px] uppercase tracking-wider block mb-1">İş Kolu</span>
                                <div className="font-medium text-white/90 text-xs leading-tight">{firmInfo.isKolu}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                </div>
              ) : (
                <div className="text-center text-white/40 py-12 flex flex-col items-center justify-center h-full">
                  <div className="mb-4 text-4xl opacity-30 animate-pulse">📍</div>
                  <div className="text-sm font-medium">
                    Detaylar için<br />
                    bir ünite seçin
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Grid Area */}
          <div className="flex-1 glass rounded-2xl p-4 flex items-center justify-center overflow-hidden border border-white/10 bg-black/20 relative">
            <div className="w-full h-full overflow-hidden flex items-center justify-center">
              <div className="w-[90%] h-[96%] grid gap-3 mx-auto" style={{
                gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
                gridTemplateRows: `repeat(${unitsPerColumn}, 1fr)`,
              }}>
                {arrangedUnits.map((unit, index) => {
                  const isFiltered = filteredUnits.includes(unit);
                  const col = Math.floor(index / unitsPerColumn);
                  const row = index % unitsPerColumn;

                  const isSold = unit.status === 'sold' || unit.status === 'reserved';

                  return (
                    <div
                      key={`${unit.block}-${unit.unitNumber}`}
                      className={`
                          relative cursor-pointer transition-all duration-300 
                          ${isFiltered ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}
                          hover:scale-[1.02] hover:z-10 w-full h-full
                        `}
                      style={{
                        gridColumn: col + 1,
                        gridRow: row + 1
                      }}
                      onClick={() => setSelectedUnit(unit)}
                    >
                      <div className={`
                          w-full h-full rounded-md border transition-all duration-300
                          flex items-center justify-between px-2 relative
                          ${isSold
                          ? 'bg-[#ef4444] border-red-700 hover:bg-red-500'
                          : 'bg-[#22c55e] border-green-700 hover:bg-green-500'
                        }
                          ${!isFiltered ? 'grayscale' : ''}
                          ${selectedUnit === unit ? 'ring-2 ring-white shadow-lg z-20' : ''}
                        `}>
                        <div className="font-bold text-sm md:text-base lg:text-lg text-white drop-shadow-md">
                          {unit.unitNumber}
                        </div>

                        <div className="text-[10px] md:text-xs font-bold text-white drop-shadow-md">
                          {unit.groundFloorArea ? Math.round(unit.groundFloorArea + (unit.normalFloorArea || 0)) : unit.netArea}m²
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && selectedUnit && (
          <PaymentModal
            unit={selectedUnit}
            onClose={() => setShowPaymentModal(false)}
          />
        )}

      </div>
    </section>
  );
}