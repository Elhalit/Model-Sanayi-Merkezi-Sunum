import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const excelPath = path.join(__dirname, 'ZK NK Ekleme CRM.xlsx');
const jsonPath = path.join(__dirname, 'client', 'src', 'data', 'unitData.json');

try {
    const workbook = xlsx.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const excelData = xlsx.utils.sheet_to_json(sheet);

    // Debug: Print first ROW 'Blok No' and 'Daire No'
    if (excelData.length > 0) {
        console.log('First Excel Row Block:', excelData[0]['Blok No']);
        console.log('First Excel Row Daire:', excelData[0]['Daire No']);
        console.log('Keys:', Object.keys(excelData[0]));
    }

    const rawJson = fs.readFileSync(jsonPath, 'utf-8');
    const units = JSON.parse(rawJson);
    console.log('First JSON Unit:', units[0]);

    let matchCount = 0;

    units.forEach(unit => {
        const jsonBlock = unit.blockName;
        const jsonUnitNum = String(unit.unitNumber).split('-')[1];

        // normalize
        const match = excelData.find(row => {
            // Handle potential variations
            // 'Blok No' might be "M" or "M "
            const excelBlock = String(row['Blok No']).trim();
            const excelDaire = String(row['Daire No']).trim();

            return excelBlock === String(jsonBlock) && excelDaire === String(jsonUnitNum);
        });

        if (match) {
            matchCount++;
            unit.zeminKatBrut = match['Zemin Kat m²'];
            unit.normalKatBrut = match['Normal Kat m²'];
        }
    });

    console.log(`Matched: ${matchCount}`);
    if (matchCount > 0) {
        fs.writeFileSync(jsonPath, JSON.stringify(units, null, 2));
    }

} catch (e) {
    console.log(e);
}
