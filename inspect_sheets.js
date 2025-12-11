import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'ZK NK Ekleme CRM.xlsx');

try {
    const workbook = xlsx.readFile(filePath);
    console.log('Sheets:', workbook.SheetNames);

    workbook.SheetNames.forEach(name => {
        const sheet = workbook.Sheets[name];
        const json = xlsx.utils.sheet_to_json(sheet, { header: 1 });
        if (json.length > 0) {
            console.log(`--- Sheet: ${name} Headers ---`);
            console.log(json[0]);
        }
    });

} catch (error) {
    console.error('Error:', error.message);
}
