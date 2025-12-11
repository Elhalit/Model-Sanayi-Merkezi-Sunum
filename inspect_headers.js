import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'ZK NK Ekleme CRM.xlsx');

try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Get headers
    const headers = [];
    const range = xlsx.utils.decode_range(sheet['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
        const addr = xlsx.utils.encode_cell({ r: range.s.r, c: C });
        const cell = sheet[addr];
        headers.push(cell ? cell.v : undefined);
    }

    console.log('Headers with indices:');
    headers.forEach((h, i) => console.log(`${i}: ${h}`));

} catch (error) {
    console.error('Error:', error.message);
}
