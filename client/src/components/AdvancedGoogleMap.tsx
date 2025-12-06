import React, { useState, useCallback, useMemo, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { mapLocations, Location } from '../data/mapData';

// Define the libraries array outside of the component to prevent re-renders
const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"];

interface AdvancedGoogleMapProps {
    locations?: Location[];
    selectedLocation?: Location | null;
    onLocationSelect?: (location: Location | null) => void;
    width?: string;
    height?: string;
    className?: string;
}

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '12px'
};

const defaultCenter = {
    lat: 41.2867,
    lng: 28.0719
};

const AdvancedGoogleMap: React.FC<AdvancedGoogleMapProps> = ({
    locations = mapLocations,
    selectedLocation: propSelectedLocation,
    onLocationSelect,
    width = '100%',
    height = '500px',
    className = ''
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState<Error | null>(null);
    const [internalSelectedLocation, setInternalSelectedLocation] = useState<Location | null>(null);
    const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const [directionsError, setDirectionsError] = useState<string | null>(null);

    const mapRef = useRef<google.maps.Map | null>(null);

    // Use prop selected location if provided, otherwise internal state
    const activeLocation = propSelectedLocation !== undefined ? propSelectedLocation : internalSelectedLocation;

    // Origin: Model Sanayi Merkezi
    const originLocation = useMemo(() => {
        const loc = locations.find(l => l.title.includes("Model Sanayi Merkezi"));
        if (loc) {
            return { lat: loc.coordinates[1], lng: loc.coordinates[0] };
        }
        return defaultCenter;
    }, [locations]);

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
        setIsLoaded(true);
    }, []);

    const onUnmount = useCallback(() => {
        mapRef.current = null;
    }, []);

    const onMapLoadError = useCallback((error: Error) => {
        setLoadError(error);
        console.error("Google Maps Load Error:", error);
    }, []);

    const handleMarkerClick = useCallback((location: Location) => {
        if (onLocationSelect) {
            onLocationSelect(location);
        } else {
            setInternalSelectedLocation(location);
        }
    }, [onLocationSelect]);

    const directionsCallback = useCallback((
        result: google.maps.DirectionsResult | null,
        status: google.maps.DirectionsStatus
    ) => {
        if (status === 'OK' && result) {
            setDirectionsResponse(result);
            setDirectionsError(null);
        } else {
            console.error(`Directions request failed due to ${status}`);
            setDirectionsError(`Directions request failed: ${status}`);
        }
    }, []);

    // Reset directions when active location changes
    React.useEffect(() => {
        if (activeLocation) {
            setDirectionsResponse(null); // Clear previous directions to trigger new request
        } else {
            setDirectionsResponse(null);
        }
    }, [activeLocation]);

    const openExternalMap = useCallback((destination: Location) => {
        const originStr = `${originLocation.lat},${originLocation.lng}`;
        const destStr = `${destination.coordinates[1]},${destination.coordinates[0]}`;

        // Use the standard maps URL with t=k for satellite view
        // saddr = start address, daddr = destination address, t = map type (k = satellite)
        const url = `https://www.google.com/maps?saddr=${originStr}&daddr=${destStr}&t=k`;
        window.open(url, '_blank');
    }, [originLocation]);

    const mapOptions = useMemo(() => ({
        mapTypeId: 'roadmap',
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: true,
        mapTypeControl: true,
        fullscreenControl: true,
    }), []);

    if (loadError) {
        return (
            <div className={`flex items-center justify-center bg-red-50 border border-red-200 rounded-lg p-6 ${className}`} style={{ width, height }}>
                <div className="text-center">
                    <h3 className="text-lg font-bold text-red-600 mb-2">Map Loading Error</h3>
                    <p className="text-sm text-red-500">{loadError.message}</p>
                    <p className="text-xs text-gray-500 mt-4">Please check your API key configuration.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`} style={{ width, height }}>
            <LoadScript
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}
                libraries={libraries}
                onError={onMapLoadError}
                loadingElement={
                    <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                }
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={defaultCenter}
                    zoom={11}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={mapOptions}
                >
                    {/* Markers */}
                    {locations.map((location, index) => (
                        <Marker
                            key={index}
                            position={{ lat: location.coordinates[1], lng: location.coordinates[0] }}
                            title={location.title}
                            onClick={() => handleMarkerClick(location)}
                        />
                    ))}

                    {/* Directions Service */}
                    {activeLocation && (
                        <DirectionsService
                            options={{
                                destination: { lat: activeLocation.coordinates[1], lng: activeLocation.coordinates[0] },
                                origin: originLocation,
                                travelMode: 'DRIVING' as google.maps.TravelMode,
                            }}
                            callback={directionsCallback}
                        />
                    )}

                    {/* Directions Renderer */}
                    {directionsResponse && (
                        <DirectionsRenderer
                            options={{
                                directions: directionsResponse,
                                suppressMarkers: true,
                                polylineOptions: {
                                    strokeColor: '#3b82f6',
                                    strokeWeight: 5,
                                }
                            }}
                        />
                    )}

                    {/* InfoWindow */}
                    {activeLocation && (
                        <InfoWindow
                            position={{ lat: activeLocation.coordinates[1], lng: activeLocation.coordinates[0] }}
                            onCloseClick={() => {
                                if (onLocationSelect) onLocationSelect(null);
                                else setInternalSelectedLocation(null);
                                setDirectionsResponse(null);
                            }}
                        >
                            <div className="p-2 max-w-xs">
                                <h3 className="font-bold text-gray-900 mb-1">{activeLocation.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{activeLocation.description}</p>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => openExternalMap(activeLocation)}
                                        className="w-full px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <span>Open Route in Maps</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </button>
                                    {activeLocation.title.includes("KOSB") && (
                                        <p className="text-xs text-blue-600 italic">
                                            * Recommended Route (Satellite)
                                        </p>
                                    )}
                                </div>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default AdvancedGoogleMap;
