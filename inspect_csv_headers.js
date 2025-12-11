import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const csvPath = path.join(__dirname, 'client', 'public', 'zknk_data.csv');

try {
    const content = fs.readFileSync(csvPath, 'utf8');
    const lines = content.split('\n');
    if (lines.length > 0) {
        // Handle CSV split carefully (quotes)
        // Quick regex for CSV matching
        const headers = lines[0].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[0].split(',');
        console.log('--- HEADERS ---');
        headers.forEach((h, i) => console.log(`${i}: ${h.replace(/"/g, '')}`));
    }
} catch (e) {
    console.error(e);
}
