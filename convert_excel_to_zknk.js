import xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const excelPath = path.join(__dirname, 'ZK NK Ekleme CRM.xlsx');
const csvPath = path.join(__dirname, 'client', 'public', 'zknk_data.csv');

try {
    console.log(`Reading Excel from ${excelPath}...`);
    const workbook = xlsx.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert to JSON to manipulate
    const data = xlsx.utils.sheet_to_json(sheet);

    // Add Mock Prices since columns are missing in provided file
    const newData = data.map(row => {
        const area = (parseFloat(row['Zemin Kat m²'] || 0) + parseFloat(row['Normal Kat m²'] || 0)) || 100;

        // Mock Pricing if missing
        if (!row['Satış Fiyatı 01']) {
            row['Satış Fiyatı 01'] = Math.round(area * 35000); // ~35k TL/m2
        }
        if (!row['Satış Fiyatı 02']) {
            row['Satış Fiyatı 02'] = Math.round(row['Satış Fiyatı 01'] / 35); // ~35 TL/USD
        }
        return row;
    });

    // Convert back to CSV
    // We want to force the new fields to be included
    const header = [
        'ID', 'Proje ID', 'Proje Adı(50)', 'Gayrimenkul Son Hareket Tipi',
        'Bölüm Adı', 'Blok No', 'Daire No', 'Gayrimenkul Kat',
        'Brüt m²(Σ:15.977,00)', 'Net m²(Σ:15.977,00)',
        'Zemin Kat m²', 'Normal Kat m²',
        'Satış Fiyatı 01', 'Satış Fiyatı 02'
    ];

    const newSheet = xlsx.utils.json_to_sheet(newData, { header });
    const csvContent = xlsx.utils.sheet_to_csv(newSheet);

    fs.writeFileSync(csvPath, csvContent, 'utf-8');
    console.log('Successfully updated zknk_data.csv with mock prices.');

} catch (error) {
    console.error('Error:', error);
}
