import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, useMap, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Navigation, MapPin } from 'lucide-react';

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

        // If location has polygon, skip routing
        if (selectedLocation.polygon) {
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

                const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson`);
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
                {locations.map((loc, idx) => (
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
                ))}

                {/* Location Specific Polygons */}
                {selectedLocation?.polygon && (
                    <Polygon
                        positions={selectedLocation.polygon}
                        pathOptions={{
                            color: '#088',
                            weight: 2,
                            opacity: 1,
                            fillColor: '#088',
                            fillOpacity: 0.4
                        }}
                    />
                )}

                {/* Location Specific Polylines */}
                {locations.map((loc, idx) => (
                    loc.polyline && (
                        <Polyline
                            key={`poly-${idx}`}
                            positions={loc.polyline}
                            pathOptions={{
                                color: '#00ff00', // Neon green as requested
                                weight: 6,
                                opacity: 0.8,
                                lineCap: 'round',
                                lineJoin: 'round'
                            }}
                        />
                    )
                ))}

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
