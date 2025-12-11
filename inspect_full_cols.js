import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'ZK NK Ekleme CRM.xlsx');

try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON array, header: 1 means array of arrays (first row included)
    const json = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    // First row is headers
    const headers = json[0];
    console.log('--- ALL HEADERS ---');
    headers.forEach((h, i) => console.log(`${i}: ${h}`));

    // Check first data row to see values
    if (json.length > 1) {
        console.log('--- FIRST ROW VALUES ---');
        console.log(json[1]);
    }

} catch (error) {
    console.error('Error:', error.message);
}
