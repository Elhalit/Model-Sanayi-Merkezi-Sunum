import { useState, useEffect } from 'react';
import { X, CheckCircle, Building2, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type Unit = {
  unitNumber: string;
  blockName: string;
  size: number;
  status: 'available' | 'sold';
  price: number;
  companyName?: string;
};

export default function UnitModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  useEffect(() => {
    const handleOpenModal = (event: CustomEvent) => {
      setSelectedUnit(event.detail);
      setIsOpen(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('openUnitModal', handleOpenModal as EventListener);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('openUnitModal', handleOpenModal as EventListener);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedUnit(null), 300);
  };

  if (!isOpen || !selectedUnit) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR').format(price) + ' ₺';
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 
                 animate-in fade-in duration-300"
      onClick={closeModal}
      data-testid="unit-modal-overlay"
    >
      <Card 
        className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto 
                   bg-card border-2 border-primary animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-3xl font-black text-primary mb-2" data-testid="modal-unit-number">
                {selectedUnit.unitNumber}
              </h3>
              <p className="text-muted-foreground flex items-center gap-2" data-testid="modal-unit-block">
                <Building2 className="w-5 h-5" />
                {selectedUnit.blockName} Blok
              </p>
            </div>
            <button 
              className="glass w-10 h-10 rounded-full flex items-center justify-center 
                         hover:bg-destructive/20 transition-all"
              onClick={closeModal}
              data-testid="modal-close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Unit Status */}
            <div className="glass p-4 rounded-xl" data-testid="modal-status-card">
              <div className="text-sm text-muted-foreground mb-2">Durum</div>
              <div className="flex items-center gap-2">
                <span 
                  className={`w-3 h-3 rounded-full ${
                    selectedUnit.status === 'available' ? 'bg-success' : 'bg-destructive'
                  }`}
                />
                <span className="text-xl font-bold" data-testid="modal-status">
                  {selectedUnit.status === 'available' ? 'Müsait' : 'Satılan'}
                </span>
              </div>
            </div>
            
            {/* Unit Size */}
            <div className="glass p-4 rounded-xl" data-testid="modal-size-card">
              <div className="text-sm text-muted-foreground mb-2">Alan</div>
              <div className="text-3xl font-black text-accent" data-testid="modal-size">
                {selectedUnit.size} m²
              </div>
            </div>
            
            {/* Unit Price */}
            <div className="glass p-4 rounded-xl" data-testid="modal-price-card">
              <div className="text-sm text-muted-foreground mb-2">Fiyat</div>
              <div className="text-3xl font-black text-primary" data-testid="modal-price">
                {formatPrice(selectedUnit.price)}
              </div>
            </div>
            
            {/* Company (if sold) */}
            {selectedUnit.companyName && (
              <div className="glass p-4 rounded-xl" data-testid="modal-company-card">
                <div className="text-sm text-muted-foreground mb-2">Şirket</div>
                <div className="text-xl font-bold flex items-center gap-2" data-testid="modal-company">
                  <Building2 className="w-5 h-5" />
                  {selectedUnit.companyName}
                </div>
              </div>
            )}
            
            {/* Features */}
            <div className="glass p-4 rounded-xl" data-testid="modal-features">
              <div className="text-sm text-muted-foreground mb-3">Özellikler</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2" data-testid="feature-infrastructure">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>Tam Altyapı</span>
                </div>
                <div className="flex items-center gap-2" data-testid="feature-security">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>Güvenlik Sistemi</span>
                </div>
                <div className="flex items-center gap-2" data-testid="feature-parking">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span>Otopark</span>
                </div>
                <div className="flex items-center gap-2" data-testid="feature-location">
                  <MapPin className="w-5 h-5 text-success" />
                  <span>Stratejik Konum</span>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            {selectedUnit.status === 'available' && (
              <button 
                className="w-full bg-primary text-background py-4 rounded-xl font-bold text-lg 
                           hover:bg-primary/90 transition-all glow"
                data-testid="modal-cta-button"
              >
                Bilgi Al
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
