// Utility functions for parsing CSV floor plan data

export interface FloorPlanUnit {
  section: string;  // Bölüm Adı
  block: string;    // Blok No
  unitNumber: string; // Daire No
  grossArea: number;  // Brüt m²
  netArea: number;    // Net M²
  status: 'sold' | 'available' | 'reserved'; // Durumu - converted
  groundFloorArea?: number; // Zemin Kat m²
  normalFloorArea?: number; // Normal Kat m²
}

export interface FirmInfo {
  siraNo: number;     // SIRA NO
  etap: string;       // ETAP (Phase/Stage)
  block: string;      // BLOK
  unitNo: string;     // NO (unit numbers, can be ranges like "1-2" or "3-4-6")
  firma: string;      // FİRMA
  kiraci: string;     // KİRACI/MALİK
  isKolu: string;     // İŞ KOLU
}

export function parseCSV(csvContent: string, etapType: '1' | '2' | '3' | '4' | '5' = '1'): FloorPlanUnit[] {
  const lines = csvContent.split('\n');
  const units: FloorPlanUnit[] = [];

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Parse CSV line - handle quoted fields
    const fields = parseCSVLine(line);

    if (etapType === '1' && fields.length >= 6) {
      // 1.etab format: Bölüm Adı, Blok No, Daire No, Brüt m², Net M², Durumu
      const statusText = fields[5].toLowerCase();
      let status: 'sold' | 'available' | 'reserved' = 'available';

      if (statusText.includes('satıldı')) {
        status = 'sold';
      } else if (statusText.includes('satışa kapalı')) {
        status = 'reserved';
      }

      units.push({
        section: fields[0],
        block: fields[1],
        unitNumber: fields[2],
        grossArea: parseFloat(fields[3]) || 0,
        netArea: parseFloat(fields[4]) || 0,
        status
      });
    } else if (etapType === '2' && fields.length >= 8) {
      // 2.etab format: ID, Bölüm Adı, Blok No, Daire No, Brüt m², Net M², Fiyat, Durumu
      const statusText = fields[7].toLowerCase();
      let status: 'sold' | 'available' | 'reserved' = 'available';

      if (statusText.includes('satıldı')) {
        status = 'sold';
      } else if (statusText.includes('satılık')) {
        status = 'available';
      } else if (statusText.includes('satışa kapalı')) {
        status = 'reserved';
      }

      units.push({
        section: fields[1], // Bölüm Adı is at index 1 in 2.etab
        block: fields[2],   // Blok No is at index 2
        unitNumber: fields[3], // Daire No is at index 3
        grossArea: parseFloat(fields[4]) || 0,
        netArea: parseFloat(fields[5]) || 0,
        status
      });
    } else if ((etapType === '3' || etapType === '4' || etapType === '5') && fields.length >= 6) {
      // 3.etab & 4.etab & 5.etab format: Bölüm Adı, Blok No, Daire No, Brüt m², Net M², Durumu
      const statusText = fields[5].toLowerCase();
      let status: 'sold' | 'available' | 'reserved' = 'available';

      if (statusText.includes('satıldı')) {
        status = 'sold';
      } else if (statusText.includes('satılık')) {
        status = 'available';
      } else if (statusText.includes('satışa kapalı')) {
        status = 'reserved';
      }

      units.push({
        section: fields[0],
        block: fields[1],
        unitNumber: fields[2],
        grossArea: parseFloat(fields[3]) || 0,
        netArea: parseFloat(fields[4]) || 0,
        status
      });
    }
  }

  return units;
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(currentField.trim());
      currentField = '';
    } else {
      currentField += char;
    }
  }

  // Add the last field
  fields.push(currentField.trim());

  return fields;
}

export function getBlockSummary(units: FloorPlanUnit[], blockName: string) {
  const blockUnits = units.filter(unit => unit.block === blockName);

  const total = blockUnits.length;
  const sold = blockUnits.filter(unit => unit.status === 'sold').length;
  const available = blockUnits.filter(unit => unit.status === 'available').length;
  const reserved = blockUnits.filter(unit => unit.status === 'reserved').length;

  const totalArea = blockUnits.reduce((sum, unit) => sum + unit.netArea, 0);
  const avgArea = total > 0 ? Math.round(totalArea / total) : 0;

  return {
    total,
    sold,
    available,
    reserved,
    totalArea,
    avgArea,
    occupancyRate: total > 0 ? Math.round((sold / total) * 100) : 0
  };
}

export function getAllBlocks(units: FloorPlanUnit[]): string[] {
  const blocks = new Set(units.map(unit => unit.block));
  return Array.from(blocks).sort();
}

export function parseFirmInfoCSV(csvContent: string): FirmInfo[] {
  const lines = csvContent.split('\n');
  const firms: FirmInfo[] = [];

  console.log('🔍 Parsing firm CSV, total lines:', lines.length);
  console.log('📄 First few lines:', lines.slice(0, 5));

  // Skip header row (first line is header)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const fields = parseCSVLine(line);

    if (fields.length >= 7 && fields[0] && !isNaN(parseInt(fields[0]))) {
      firms.push({
        siraNo: parseInt(fields[0]),
        etap: fields[1].toString(),
        block: fields[2].toUpperCase(),
        unitNo: fields[3],
        firma: fields[4],
        kiraci: fields[5],
        isKolu: fields[6]
      });
    }
  }

  console.log('🏢 Parsed firms:', firms.length);
  console.log('📊 Firms by etap:', firms.reduce((acc, firm) => {
    acc[firm.etap] = (acc[firm.etap] || 0) + 1;
    return acc;
  }, {} as Record<string, number>));

  return firms;
}

export function getFirmInfoForUnit(firms: FirmInfo[], block: string, unitNumber: string, etap?: string): FirmInfo | null {
  // Find firm info for a specific unit
  console.log(`🔍 Looking for firm: Block ${block}, Unit ${unitNumber}, Etap ${etap}`);
  console.log(`📋 Available firms: ${firms.length}`);

  for (const firm of firms) {
    // Clean and normalize block names for comparison
    const firmBlock = firm.block.trim().toUpperCase();
    const targetBlock = block.trim().toUpperCase();

    // If etap is specified, check etap match as well
    const etapMatches = !etap || firm.etap.toString() === etap.toString();

    if (firmBlock === targetBlock && etapMatches) {
      console.log(`✅ Block match found: ${firm.firma} in ${firmBlock}, units: ${firm.unitNo}`);
      // Handle unit number ranges (e.g., "1-2", "3-4-6", "17-18-19-20")
      const unitNumbers = firm.unitNo.split('-').map(n => n.trim());
      if (unitNumbers.includes(unitNumber.toString())) {
        console.log(`🎯 Unit match found: ${firm.firma}`);
        return firm;
      }
    }
  }

  console.log('❌ No firm found');
  return null;
}

// Helper function to get all firms for a specific block and etap
export function getFirmsForBlock(firms: FirmInfo[], block: string, etap?: string): FirmInfo[] {
  return firms.filter(firm => {
    const blockMatches = firm.block.trim().toUpperCase() === block.trim().toUpperCase();
    const etapMatches = !etap || firm.etap.toString() === etap.toString();
    return blockMatches && etapMatches;
  });
}

// Helper function to get all firms for a specific etap
export function getFirmsForEtap(firms: FirmInfo[], etap: string): FirmInfo[] {
  return firms.filter(firm => firm.etap.toString() === etap.toString());
}

export function parseZKNKCSV(csvContent: string): Record<string, { ground: number; normal: number }> {
  const lines = csvContent.split('\n');
  const data: Record<string, { ground: number; normal: number }> = {};

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Parse CSV line
    const fields = parseCSVLine(line);

    // Index 5: Blok No, 6: Daire No, 12: Zemin Kat m², 13: Normal Kat m²
    if (fields.length >= 14) {
      const block = fields[5].trim();
      const unit = fields[6].trim();

      // Parse numbers, handling commas as decimal points if necessary
      const ground = parseFloat(fields[12].replace(',', '.')) || 0;
      const normal = parseFloat(fields[13].replace(',', '.')) || 0;

      const key = `${block}-${unit}`;
      data[key] = { ground, normal };
    }
  }

  return data;
}