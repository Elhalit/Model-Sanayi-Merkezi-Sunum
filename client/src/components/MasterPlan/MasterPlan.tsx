import React, { useState, useMemo } from 'react';
import './MasterPlan.css';
import unitData from './unitData.json';

// Types
interface Unit {
    id: string;
    block: string;
    unitNumber: number;
    M2: number;
    status: string;
    price: string;
}

// Layout Configuration
// We need precise control over sub-sections of blocks (Left A vs Right A).
// We will define "Zones" which map to a Block and a range of Unit Numbers.

interface ZoneLayout {
    id: string; // unique internal id for layout logic
    blockCode: string; // The specific block letter
    unitRange: [number, number]; // inclusive start, end
    x: number;
    y: number;
    width: number;
    height: number;
    cols: number; // grid columns
    label: string;
    labelPos?: 'top' | 'bottom';
}

// Coordinate System: 1600 x 1200
// Separation Axis (Road): x=750 to x=850 (100px wide road)

// Left Side (x < 750)
// Right Side (x > 850)

const ZONES: ZoneLayout[] = [
    // --- LEFT SIDE ---

    // A BLOK (Left) - 24 units
    // Top left-ish
    { id: 'A_Left', blockCode: 'A', unitRange: [1, 24], x: 350, y: 150, width: 280, height: 260, cols: 4, label: 'A BLOK' },

    // B BLOK (Left) - 22 units
    // Below A Left
    { id: 'B_Left', blockCode: 'B', unitRange: [1, 22], x: 350, y: 460, width: 280, height: 240, cols: 4, label: 'B BLOK' },

    // C BLOK (Yellow/Small) - 4 units
    // Maybe to the left of A or B? Or distinct. Assuming small cluster.
    { id: 'C_Small', blockCode: 'C', unitRange: [1, 4], x: 100, y: 300, width: 120, height: 120, cols: 2, label: 'C BLOK' },

    // D BLOK - 20 units
    // Below B
    { id: 'D', blockCode: 'D', unitRange: [1, 20], x: 350, y: 750, width: 280, height: 220, cols: 4, label: 'D BLOK' },

    // E BLOK - 20 units
    // Bottom Left
    { id: 'E', blockCode: 'E', unitRange: [1, 20], x: 350, y: 1020, width: 280, height: 220, cols: 4, label: 'E BLOK' },

    // --- RIGHT SIDE ---

    // F BLOK - 22 units
    // Top Right
    { id: 'F', blockCode: 'F', unitRange: [1, 22], x: 950, y: 150, width: 300, height: 150, cols: 6, label: 'F BLOK' },

    // G BLOK - 20 units
    // Below F
    { id: 'G', blockCode: 'G', unitRange: [1, 20], x: 950, y: 340, width: 300, height: 140, cols: 5, label: 'G BLOK' },

    // H BLOK - 20 units
    // Below G
    { id: 'H', blockCode: 'H', unitRange: [1, 20], x: 950, y: 520, width: 300, height: 140, cols: 5, label: 'H BLOK' },

    // K BLOK - 20 units
    // Below H
    { id: 'K', blockCode: 'K', unitRange: [1, 20], x: 950, y: 700, width: 300, height: 140, cols: 5, label: 'K BLOK' },

    // L BLOK - 20 units
    // Below K
    { id: 'L', blockCode: 'L', unitRange: [1, 20], x: 950, y: 880, width: 300, height: 140, cols: 5, label: 'L BLOK' },

    // M BLOK - 24 units
    // Bottom Right Large
    { id: 'M', blockCode: 'M', unitRange: [1, 24], x: 950, y: 1060, width: 500, height: 140, cols: 8, label: 'M BLOK' },


    // --- RIGHT SIDE "A, B, C" clones? ---
    // The user said: "A BLOK (Right): 24 units", "B BLOK (Right): 21 units", "C BLOK (Right): 21 units".
    // Where do these fit?
    // If F..L are stacked vertically on the right, maybe A(R), B(R), C(R) are even further right? Or arranged differently.
    // Given the typical layout of these dual-wing projects, maybe:
    // F..M are apartment blocks (row like).
    // A(R), B(R) are industrial blocks similar to A(L), B(L).
    // Let's place A(R), B(R), C(R) to the right of F..M or between road and F..M?
    // Let's try placing them in a 3rd column FAR RIGHT for now, or just wider Right Section.
    // Actually, usually it's symmetric.
    // Left Wing: A, B, C, D, E
    // Right Wing: A, B, C + F..M vertically stacked?
    // Let's place A(R), B(R), C(R) at x=1300 (Far Right).

    { id: 'A_Right', blockCode: 'A', unitRange: [25, 48], x: 1300, y: 150, width: 250, height: 260, cols: 3, label: 'A BLOK' },
    { id: 'B_Right', blockCode: 'B', unitRange: [23, 43], x: 1300, y: 460, width: 250, height: 240, cols: 3, label: 'B BLOK' },
    { id: 'C_Right', blockCode: 'C', unitRange: [5, 25], x: 1300, y: 750, width: 250, height: 240, cols: 3, label: 'C BLOK' },

];


const MasterPlan: React.FC = () => {
    const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Group units by Block first, but we need to distribute them into Zones.
    const unitsByZone = useMemo(() => {
        const map: Record<string, Unit[]> = {};

        // Initialize empty arrays
        ZONES.forEach(z => map[z.id] = []);

        unitData.forEach((u: Unit) => {
            // Find which zone this unit belongs to
            const zone = ZONES.find(z =>
                z.blockCode === u.block &&
                u.unitNumber >= z.unitRange[0] &&
                u.unitNumber <= z.unitRange[1]
            );

            if (zone) {
                map[zone.id].push(u);
            }
        });

        return map;
    }, []);

    const handleUnitClick = (unit: Unit) => {
        setSelectedUnit(unit);
        setIsModalOpen(true);
    };

    // Helper to grid positioning inside a Zone
    const getUnitPosition = (zone: ZoneLayout, index: number, total: number) => {
        const padding = 30;
        const usableW = zone.width - (padding * 2);
        const usableH = zone.height - (padding * 1.5); // label space

        const cols = zone.cols;
        const rows = Math.ceil(total / cols);

        const col = index % cols;
        const row = Math.floor(index / cols);

        // Centering logic
        const cellW = usableW / Math.max(1, cols - 1); // space between dots
        // If cols=1, avoid div by zero

        // Better approach: Distribute evenly in box
        const stepX = cols > 1 ? usableW / (cols - 1) : 0;
        const stepY = rows > 1 ? usableH / (rows - 1) : 0;

        let cx = zone.x + padding + (col * stepX);

        // If single column, center X
        if (cols === 1) cx = zone.x + zone.width / 2;
        // If we have fewer items in the last row, maybe center them? keeping it simple for now (left aligned grid)

        let cy = zone.y + 40 + (row * stepY); // +40 for label top offset

        // Adjustment for loose grid (spread out)
        if (rows === 1) cy = zone.y + zone.height / 2 + 10;

        return { cx, cy };
    };

    return (
        <div className="master-plan-container">
            <svg
                className="master-plan-svg"
                viewBox="0 0 1600 1300"
                preserveAspectRatio="xMidYMid meet"
                onClick={() => setIsModalOpen(false)}
            >
                <defs>
                    <filter id="glow-unit" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Central Road Background */}
                <rect x="750" y="0" width="100" height="1300" fill="#1e293b" opacity="0.3" />
                {/* Dashed Line */}
                <line x1="800" y1="50" x2="800" y2="1250" stroke="#94a3b8" strokeWidth="2" strokeDasharray="20,20" opacity="0.2" />

                {/* Zones */}
                {ZONES.map((zone) => {
                    const units = unitsByZone[zone.id] || [];

                    return (
                        <g key={zone.id} className="zone-group">
                            {/* Zone Boundary (Optional: Visual debug or subtle background) */}
                            <rect
                                x={zone.x}
                                y={zone.y}
                                width={zone.width}
                                height={zone.height}
                                rx="12"
                                className="block-boundary"
                            />

                            {/* Block Label */}
                            <text
                                x={zone.x + 20}
                                y={zone.y + 30}
                                fill="white"
                                fontSize="20"
                                fontWeight="bold"
                                opacity="0.5"
                            >
                                {zone.label}
                            </text>

                            {/* Units */}
                            {units.map((unit, idx) => {
                                const { cx, cy } = getUnitPosition(zone, idx, units.length);
                                return (
                                    <g
                                        key={unit.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUnitClick(unit);
                                        }}
                                        className="unit-interactive"
                                    >
                                        <circle
                                            cx={cx}
                                            cy={cy}
                                            r="10"
                                            className={`unit-circle status-${unit.status}`}
                                        />
                                        <text
                                            x={cx}
                                            y={cy}
                                            dy="1"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fontSize="8"
                                            fill="white"
                                            fontWeight="bold"
                                            pointerEvents="none"
                                        >
                                            {unit.unitNumber}
                                        </text>
                                    </g>
                                );
                            })}
                        </g>
                    );
                })}

            </svg>

            {/* Sidebar Modal (Same as before) */}
            <div className={`details-sidebar ${isModalOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
                {selectedUnit ? (
                    <>
                        <div className="sidebar-header">
                            <h2 className="sidebar-title">Unit Details</h2>
                            <span className={`status-badge badge-${selectedUnit.status}`}>
                                {selectedUnit.status}
                            </span>
                        </div>
                        <div className="unit-info">
                            <div className="detail-row"><span className="detail-label">Block</span><span className="detail-value">{selectedUnit.block}</span></div>
                            <div className="detail-row"><span className="detail-label">Unit No</span><span className="detail-value">{selectedUnit.unitNumber}</span></div>
                            <div className="detail-row"><span className="detail-label">Size</span><span className="detail-value">{selectedUnit.M2} m²</span></div>
                            <div className="detail-row"><span className="detail-label">Price</span><span className="detail-value">{selectedUnit.price}</span></div>
                            <div className="detail-row"><span className="detail-label">ID</span><span className="detail-value-sm">{selectedUnit.id}</span></div>
                        </div>
                        <div className="sidebar-actions">
                            <button className="action-btn">Interest Request</button>
                        </div>
                    </>
                ) : <p>Select a unit</p>}
            </div>
        </div>
    );
};

export default MasterPlan;
