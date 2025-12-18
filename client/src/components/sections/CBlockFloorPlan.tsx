
import React from 'react';
import { type FloorPlanUnit } from '@/lib/csvParser';

interface CBlockFloorPlanProps {
    units: FloorPlanUnit[];
    selectedUnit: FloorPlanUnit | null;
    onSelect: (unit: FloorPlanUnit) => void;
}

export default function CBlockFloorPlan({ units, selectedUnit, onSelect }: CBlockFloorPlanProps) {
    // Sort units by number
    const sortedUnits = [...units].sort((a, b) => {
        const numA = parseInt(a.unitNumber.replace(/\D/g, '')) || 0;
        const numB = parseInt(b.unitNumber.replace(/\D/g, '')) || 0;
        return numA - numB;
    });

    const getUnitColor = (unit: FloorPlanUnit) => {
        if (unit.status === 'sold' || unit.status === 'reserved') return '#ef4444'; // Red
        return '#22c55e'; // Green
    };

    const calculateRect = (unitNumber: number) => {
        // Top Units 1-18
        if (unitNumber <= 18) {
            const isOdd = unitNumber % 2 !== 0;
            const pairRow = Math.floor((unitNumber - 1) / 2); // 0-8

            const colWidth = 100;
            const rowHeight = 60;
            const gap = 0;

            const w = 4 * colWidth;
            const h = rowHeight; // Remove vertical gap

            const x = isOdd ? 0 : 4 * colWidth;
            const y = pairRow * rowHeight;

            return { x, y, w, h };
        } else {
            // Bottom Units 19, 20, 21
            // Adapted for 8 cols (3-2-3 split)
            const colWidth = 100;
            const rowHeight = 60;
            const gap = 0;
            const h = rowHeight;

            let x, w;

            if (unitNumber === 19) {
                x = 0;
                w = 3 * colWidth;
            } else if (unitNumber === 20) {
                x = 3 * colWidth;
                w = 2 * colWidth;
            } else { // 21
                x = 5 * colWidth;
                w = 3 * colWidth;
            }

            const y = 9 * rowHeight; // 10th row

            return { x, y, w, h };
        }
    };

    const totalWidth = 8 * 100; // 800
    const totalHeight = 10 * 60 - 10; // 590
    const pad = 20;

    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <svg
                viewBox={`-${pad} -${pad} ${totalWidth + pad * 2} ${totalHeight + pad * 2}`}
                className="w-full h-full max-w-4xl max-h-[80vh] drop-shadow-xl"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                {sortedUnits.map((unit) => {
                    const unitNum = parseInt(unit.unitNumber.replace(/\D/g, '')) || 0;
                    if (unitNum > 21) return null;
                    const { x, y, w, h } = calculateRect(unitNum);
                    const isSelected = selectedUnit === unit;

                    return (
                        <g
                            key={unit.unitNumber}
                            onClick={() => onSelect(unit)}
                            className="cursor-pointer transition-all duration-300 hover:opacity-100"
                            style={{
                                transformOrigin: `${x + w / 2}px ${y + h / 2}px`,
                                transition: 'transform 0.2s'
                            }}
                        >
                            <rect
                                x={x}
                                y={y}
                                width={w}
                                height={h}
                                rx={0}
                                fill={getUnitColor(unit)}
                                stroke={isSelected ? "white" : "black"}
                                strokeWidth={isSelected ? 4 : 1}
                                className="transition-all duration-300 hover:filter hover:brightness-110"
                                style={{
                                    filter: isSelected ? 'url(#glow)' : undefined
                                }}
                            />
                            <text
                                x={x + w / 2}
                                y={y + h / 2 - 5}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="white"
                                fontWeight="bold"
                                fontSize="24"
                                style={{ pointerEvents: 'none' }}
                            >
                                {unit.unitNumber}
                            </text>
                            <text
                                x={x + w / 2}
                                y={y + h / 2 + 15}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="rgba(255,255,255,0.9)"
                                fontSize="14"
                                fontWeight="500"
                                style={{ pointerEvents: 'none' }}
                            >
                                {Math.round((unit.groundFloorArea || 0) + (unit.normalFloorArea || 0)) || unit.netArea} m²
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
