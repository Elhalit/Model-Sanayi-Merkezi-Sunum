import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, useMap, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';



// Fix for default Leaflet markers in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

import { Location } from '../data/mapData';

interface LeafletMapProps {
    locations: Location[];
    selectedLocation?: Location | null;
    onLocationSelect?: (location: Location | null) => void;
    width?: string;
    height?: string;
    className?: string;
}

// Helper to fit bounds
const BoundsController: React.FC<{ locations: Location[], selectedLocation?: Location | null }> = ({ locations, selectedLocation }) => {
    const map = useMap();

    useEffect(() => {
        if (selectedLocation) {
            if (selectedLocation.polygon) {
                // Return [lat, lng] for polygon points
                const polygonBounds = selectedLocation.polygon.map(p => [p[0], p[1]] as [number, number]);
                const bounds = L.latLngBounds(polygonBounds);
                map.fitBounds(bounds, { padding: [50, 50] });
            } else {
                const origin = locations.find(l => l.title.includes("Model Sanayi")) || locations[0];
                const bounds = L.latLngBounds([
                    [origin.coordinates[1], origin.coordinates[0]],
                    [selectedLocation.coordinates[1], selectedLocation.coordinates[0]]
                ]);
                map.fitBounds(bounds, { padding: [100, 100], maxZoom: 15 });
            }
        } else if (locations.length > 0) {
            const bounds = L.latLngBounds(locations.map(l => [l.coordinates[1], l.coordinates[0]]));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [locations, selectedLocation, map]);

    return null;
};

// Helper to calculate distance between two points
function getDistance(p1: [number, number], p2: [number, number]) {
    const dx = p1[0] - p2[0];
    const dy = p1[1] - p2[1];
    return Math.sqrt(dx * dx + dy * dy);
}

// Helper to interpolate position along path
function getPositionAt(path: [number, number][], t: number): [number, number] {
    if (path.length < 2) return path[0];
    if (t <= 0) return path[0];
    if (t >= 1) return path[path.length - 1];

    // Calculate total length
    let totalLength = 0;
    const lengths = [];
    for (let i = 0; i < path.length - 1; i++) {
        const d = getDistance(path[i], path[i + 1]);
        lengths.push(d);
        totalLength += d;
    }

    const targetDist = t * totalLength;
    let currentDist = 0;

    for (let i = 0; i < lengths.length; i++) {
        if (currentDist + lengths[i] >= targetDist) {
            const segmentT = (targetDist - currentDist) / lengths[i];
            const p1 = path[i];
            const p2 = path[i + 1];
            return [
                p1[0] + (p2[0] - p1[0]) * segmentT,
                p1[1] + (p2[1] - p1[1]) * segmentT
            ];
        }
        currentDist += lengths[i];
    }
    return path[path.length - 1];
}

const TrainMarker: React.FC<{ path: [number, number][] }> = ({ path }) => {
    const [position, setPosition] = useState<[number, number]>(path[0]);
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        const oneWayDuration = 30000; // 30 seconds one way
        const totalDuration = oneWayDuration * 2;
        const startTime = performance.now();
        let animationFrame: number;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;

            // Cycle 0 -> 2*duration
            const cyclePhase = elapsed % totalDuration;
            const isReturn = cyclePhase > oneWayDuration;

            // Calculate t (0 to 1)
            let t = 0;
            if (!isReturn) {
                // Forward: 0 -> 1
                t = cyclePhase / oneWayDuration;
            } else {
                // Return: 1 -> 0
                t = 1 - ((cyclePhase - oneWayDuration) / oneWayDuration);
            }

            // Clamp t to be safe
            t = Math.max(0, Math.min(1, t));

            const pos = getPositionAt(path, t);

            // Calculate bearing
            // Look slightly ahead or behind based on direction
            const epsilon = 0.005;
            let nextT = t;

            if (!isReturn) {
                nextT = Math.min(t + epsilon, 1);
            } else {
                nextT = Math.max(t - epsilon, 0);
            }

            // If at boundaries, clamp search
            if (nextT === t) {
                if (!isReturn) nextT = Math.max(t - epsilon, 0);
                else nextT = Math.min(t + epsilon, 1);
            }

            const nextPos = getPositionAt(path, nextT);

            const dLat = nextPos[0] - pos[0];
            const dLng = nextPos[1] - pos[1];

            // Calculate bearing (CSS rotate, 0 = East, + = CW)
            // Screen Y is inverted relative to Lat (.i.e. Up is -Y)
            let deg = (Math.atan2(-dLat, dLng) * 180) / Math.PI;

            setPosition(pos);
            setAngle(deg);

            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [path]);

    const trainIcon = L.divIcon({
        html: `
            <div style="
                transform: rotate(${angle}deg); 
                transition: transform 0.1s linear; 
                transform-origin: center center;
                filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.4));
                width: 200px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <div style="transform: scaleX(-1); width: 100%; height: 100%;">
                    <svg width="200" height="24" viewBox="0 0 200 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <!-- Locomotive -->
                        <path d="M10 3H38V21H10C5 21 2 17 2 12C2 7 5 3 10 3Z" fill="#E6E6E6" stroke="#4A4A4A" stroke-width="1"/>
                        <path d="M10 5H28V19H10C7 19 5 16 5 12C5 8 7 5 10 5Z" fill="#333333"/>
                        <rect x="30" y="5" width="6" height="14" rx="1" fill="#88C4FF"/>
                        <rect x="2" y="15" width="36" height="3" fill="#FF5300"/>
                        
                        <!-- Connector 1 -->
                        <rect x="38" y="9" width="4" height="6" fill="#333333"/>
                        
                        <!-- Car 1 -->
                        <rect x="42" y="3" width="36" height="18" rx="1" fill="white" stroke="#4A4A4A" stroke-width="1"/>
                        <rect x="45" y="5" width="8" height="14" rx="1" fill="#88C4FF"/>
                        <rect x="56" y="5" width="8" height="14" rx="1" fill="#88C4FF"/>
                        <rect x="67" y="5" width="8" height="14" rx="1" fill="#88C4FF"/>
                        <rect x="42" y="15" width="36" height="3" fill="#FF5300"/>

                        <!-- Connector 2 -->
                        <rect x="78" y="9" width="4" height="6" fill="#333333"/>

                        <!-- Car 2 -->
                        <rect x="82" y="3" width="36" height="18" rx="1" fill="white" stroke="#4A4A4A" stroke-width="1"/>
                        <rect x="85" y="5" width="8" height="14" rx="1" fill="#88C4FF"/>
                        <rect x="96" y="5" width="8" height="14" rx="1" fill="#88C4FF"/>
                        <rect x="107" y="5" width="8" height="14" rx="1" fill="#88C4FF"/>
                        <rect x="82" y="15" width="36" height="3" fill="#FF5300"/>

                        <!-- Connector 3 -->
                        <rect x="118" y="9" width="4" height="6" fill="#333333"/>

                        <!-- Car 3 -->
                        <rect x="122" y="3" width="36" height="18" rx="1" fill="white" stroke="#4A4A4A" stroke-width="1"/>
                        <rect x="125" y="5" width="8" height="14" rx="1" fill="#88C4FF"/>
                        <rect x="136" y="5" width="8" height="14" rx="1" fill="#88C4FF"/>
                        <rect x="147" y="5" width="8" height="14" rx="1" fill="#88C4FF"/>
                        <rect x="122" y="15" width="36" height="3" fill="#FF5300"/>

                        <!-- Connector 4 -->
                        <rect x="158" y="9" width="4" height="6" fill="#333333"/>

                        <!-- Car 4 (Tail) -->
                        <path d="M162 3H190C195 3 198 7 198 12C198 17 195 21 190 21H162V3Z" fill="white" stroke="#4A4A4A" stroke-width="1"/>
                        <rect x="165" y="5" width="8" height="14" rx="1" fill="#88C4FF"/>
                        <rect x="176" y="5" width="8" height="14" rx="1" fill="#88C4FF"/>
                        <path d="M188 5H190C193 5 195 7 195 12C195 17 193 19 190 19H188V5Z" fill="#333333" opacity="0.3"/>
                        <rect x="162" y="15" width="30" height="3" fill="#FF5300"/>
                    </svg>
                </div>
            </div>
        `,
        className: 'train-marker-container',
        iconSize: [200, 24],
        iconAnchor: [100, 12]
    });

    return (
        <>
            <Polyline
                positions={path}
                pathOptions={{
                    color: '#ff6b1a',
                    weight: 4,
                    dashArray: '10, 10',
                    opacity: 0.8
                }}
            />
            <Marker position={position} icon={trainIcon} zIndexOffset={1000}>
                <Popup>
                    <div className="text-center font-bold">Yüksek Hızlı Tren</div>
                </Popup>
            </Marker>
        </>
    );
};

const LeafletMap: React.FC<LeafletMapProps> = ({
    locations,
    selectedLocation,
    onLocationSelect,
    width = '100%',
    height = '100%',
    className = ''
}) => {
    const [routePositions, setRoutePositions] = useState<[number, number][]>([]);
    const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
    const [isRouting, setIsRouting] = useState(false);

    // Origin: Model Sanayi Merkezi
    const originLocation = useMemo(() => {
        return locations.find(l => l.title.includes("Model Sanayi Merkezi")) || locations[0];
    }, [locations]);

    // Fetch Route when selectedLocation changes
    useEffect(() => {
        if (!selectedLocation || !originLocation || selectedLocation === originLocation) {
            setRoutePositions([]);
            setRouteInfo(null);
            return;
        }

        // If location has polygon, polyline, or is train, skip routing
        if (selectedLocation.polygon || selectedLocation.polyline || selectedLocation.type === 'train') {
            setRoutePositions([]);
            setRouteInfo(null);
            return;
        }

        const fetchRoute = async () => {
            setIsRouting(true);
            setRouteInfo(null);

            try {
                const start = `${originLocation.coordinates[0]},${originLocation.coordinates[1]}`;
                const end = `${selectedLocation.coordinates[0]},${selectedLocation.coordinates[1]}`;

                const response = await fetch(`https://routing.openstreetmap.de/routed-car/route/v1/driving/${start};${end}?overview=full&geometries=geojson`);
                const data = await response.json();

                if (data.routes && data.routes.length > 0) {
                    const route = data.routes[0];
                    const coords = route.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]] as [number, number]);
                    setRoutePositions(coords);

                    // Format info
                    const distKm = (route.distance / 1000).toFixed(1);
                    const durMin = Math.round(route.duration / 60);
                    setRouteInfo({
                        distance: `${distKm} km`,
                        duration: `${durMin} dk`
                    });
                }
            } catch (error) {
                console.error("Routing error:", error);
                setRoutePositions([
                    [originLocation.coordinates[1], originLocation.coordinates[0]],
                    [selectedLocation.coordinates[1], selectedLocation.coordinates[0]]
                ]);
                // Fallback info (rough estimate)
                setRouteInfo({ distance: "? km", duration: "? dk" });
            } finally {
                setIsRouting(false);
            }
        };

        fetchRoute();
    }, [selectedLocation, originLocation]);

    return (
        <div className={`relative ${className}`} style={{ width, height, borderRadius: '12px', overflow: 'hidden' }}>
            <MapContainer
                center={[originLocation.coordinates[1], originLocation.coordinates[0]]}
                zoom={13}
                style={{ width: '100%', height: '100%' }}
                zoomControl={false}
            >
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="Satellite (Esri)">
                        <TileLayer
                            attribution='Tiles &copy; Esri'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Roadmap (OSM)">
                        <TileLayer
                            attribution='&copy; OpenStreetMap'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.Overlay checked name="Labels">
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
                        />
                    </LayersControl.Overlay>
                </LayersControl>

                <BoundsController locations={locations} selectedLocation={selectedLocation} />

                {/* Markers */}
                {locations.map((loc, idx) => {
                    // Don't show marker for locations with polygon (e.g. KOSB) ONLY if it's currently selected (showing polygon instead)
                    if (loc.polygon && selectedLocation?.title === loc.title) return null;
                    // Don't show static marker for train if it's selected (we show animated train instead)
                    if (loc.type === 'train' && selectedLocation?.title === loc.title) return null;

                    return (
                        <Marker
                            key={idx}
                            position={[loc.coordinates[1], loc.coordinates[0]]}
                            eventHandlers={{
                                click: () => {
                                    onLocationSelect && onLocationSelect(loc);
                                },
                            }}
                        >
                            <Popup>
                                <div className="p-2">
                                    <h3 className="font-bold">{loc.title}</h3>
                                    <p className="text-sm">{loc.description}</p>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                {/* Location Specific Polygons */}
                {locations.map((loc, idx) => (
                    loc.polygon && selectedLocation?.title === loc.title && (
                        <Polygon
                            key={`polygon-${idx}`}
                            positions={loc.polygon}
                            pathOptions={{
                                color: '#3b82f6', // Blue as requested
                                weight: 2,
                                opacity: 0.8,
                                fillColor: '#3b82f6',
                                fillOpacity: 0.15,
                                dashArray: '10, 10',
                                className: 'animate-route-draw' // Animated dash effect
                            }}
                            eventHandlers={{
                                click: () => {
                                    onLocationSelect && onLocationSelect(loc);
                                }
                            }}
                        />
                    )
                ))}

                {/* Location Specific Polylines */}
                {locations.map((loc, idx) => (
                    loc.polyline && (
                        <Polyline
                            key={`poly-${idx}`}
                            positions={loc.polyline}
                            pathOptions={{
                                color: '#ff6b1a', // Brand orange
                                weight: 6,
                                opacity: 0.8,
                                lineCap: 'round',
                                lineJoin: 'round',
                                dashArray: '15, 15'
                            }}
                        />
                    )
                ))}

                {/* Animated Train Path */}
                {selectedLocation?.type === 'train' && selectedLocation.trainPath && (
                    <TrainMarker path={selectedLocation.trainPath} />
                )}

                {/* Route Polyline */}
                {routePositions.length > 0 && (
                    <Polyline
                        key={selectedLocation?.title}
                        positions={routePositions}
                        pathOptions={{
                            color: '#ff6b1a',
                            weight: 6,
                            opacity: 0.9,
                            lineCap: 'round',
                            dashArray: '15, 15', // Static dashed line
                        }}
                    />
                )}


            </MapContainer>
        </div>
    );
};

export default LeafletMap;
