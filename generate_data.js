import fs from 'fs';
import path from 'path';

const filePath = 'client/src/components/MasterPlan/unitData.json';

const statuses = ['available', 'reserved', 'sold'];
const getRandomStatus = () => {
    const r = Math.random();
    if (r > 0.8) return 'sold';
    if (r > 0.6) return 'reserved';
    return 'available';
};
const getRandomPrice = () => `$${200 + Math.floor(Math.random() * 200)},000`;

const blocks = [
    { code: 'M', count: 24, start: 1, m2: 120 },
    { code: 'L', count: 20, start: 1, m2: 155 },
    { code: 'K', count: 20, start: 1, m2: 155 },
    { code: 'H', count: 20, start: 1, m2: 150 },
    { code: 'G', count: 20, start: 1, m2: 150 },
    { code: 'F', count: 22, start: 1, m2: 145 },
    { code: 'A', count: 48, start: 1, m2: 160 }, // 1-24 Left, 25-48 Right
    { code: 'B', count: 43, start: 1, m2: 165 }, // 1-22 Left, 23-43 Right
    { code: 'C', count: 25, start: 1, m2: 180 }, // 1-4 Left, 5-25 Right
    { code: 'D', count: 20, start: 1, m2: 200 },
    { code: 'E', count: 20, start: 1, m2: 200 },
];

const units = [];
blocks.forEach(b => {
    for (let i = 0; i < b.count; i++) {
        const num = b.start + i;
        units.push({
            id: `unit-${b.code}-${num}`,
            block: b.code,
            unitNumber: num,
            M2: b.m2,
            status: getRandomStatus(),
            price: getRandomPrice()
        });
    }
});

fs.writeFileSync(filePath, JSON.stringify(units, null, 2));
console.log('Generated ' + units.length + ' units');
