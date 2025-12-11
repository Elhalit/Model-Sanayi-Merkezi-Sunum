import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Try root path first as listed in file directory
const filePath = path.join(__dirname, 'ZK NK Ekleme CRM.xlsx');

try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    if (data.length > 0) {
        console.log('--- COLUMNS ---');
        Object.keys(data[0]).forEach(k => console.log(k));
        console.log('--- FIRST RECORD ---');
        console.log(JSON.stringify(data[0], null, 2));
    } else {
        console.log('Excel file is empty.');
    }
} catch (error) {
    console.error('Error:', error.message);
}
