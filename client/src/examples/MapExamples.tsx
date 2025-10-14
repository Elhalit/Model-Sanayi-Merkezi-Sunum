// Example usage of the MapComponent
// This file demonstrates how to use the reusable MapComponent in different contexts

import React from 'react';
import MapComponent from './components/MapComponent';
import { mapLocations, customMapStyle, defaultViewState } from './data/mapData';

// Example 1: Basic usage with default settings
export const BasicMapExample = () => {
  return (
    <div style={{ width: '800px', height: '600px' }}>
      <MapComponent 
        locations={mapLocations}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      />
    </div>
  );
};

// Example 2: Custom styled map with specific view state
export const CustomMapExample = () => {
  const customViewState = {
    longitude: 27.8,
    latitude: 41.15,
    zoom: 12
  };

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden">
      <MapComponent 
        locations={mapLocations}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12" // Satellite view
        initialViewState={customViewState}
        className="satellite-map"
      />
    </div>
  );
};

// Example 3: Single location focus
export const SingleLocationExample = () => {
  const singleLocation = [
    {
      coordinates: [27.970630606847152, 41.269682897335] as [number, number],
      title: "Kapaklı Model Sanayi Merkezi",
      type: "project" as const,
      description: "Premium endüstriyel tesis - Ana proje lokasyonu"
    }
  ];

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <MapComponent 
        locations={singleLocation}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        initialViewState={{
          longitude: 27.970630606847152,
          latitude: 41.269682897335,
          zoom: 15
        }}
      />
    </div>
  );
};

// Example 4: Full-screen presentation map
export const PresentationMapExample = () => {
  return (
    <div className="fixed inset-0 bg-black">
      <MapComponent 
        locations={mapLocations}
        mapStyle={customMapStyle}
        initialViewState={defaultViewState}
        width="100vw"
        height="100vh"
        className="presentation-map"
      />
    </div>
  );
};

// Example 5: Custom location data
export const CustomLocationsExample = () => {
  const customLocations = [
    {
      coordinates: [29.0, 41.0] as [number, number],
      title: "Custom Location 1",
      type: "industrial" as const,
      description: "Custom industrial facility"
    },
    {
      coordinates: [29.1, 41.1] as [number, number],
      title: "Custom Location 2",
      type: "port" as const,
      description: "Custom port facility"
    }
  ];

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <MapComponent 
        locations={customLocations}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
      />
    </div>
  );
};

// Example 6: Integration with existing component
export const IntegratedMapExample = () => {
  const [selectedMapStyle, setSelectedMapStyle] = React.useState("mapbox://styles/mapbox/dark-v11");
  
  const styleOptions = [
    { value: "mapbox://styles/mapbox/dark-v11", label: "Dark" },
    { value: "mapbox://styles/mapbox/streets-v12", label: "Streets" },
    { value: "mapbox://styles/mapbox/satellite-streets-v12", label: "Satellite" },
    { value: "mapbox://styles/mapbox/outdoors-v12", label: "Outdoors" }
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <label htmlFor="style-select">Map Style:</label>
        <select 
          id="style-select"
          value={selectedMapStyle} 
          onChange={(e) => setSelectedMapStyle(e.target.value)}
          className="px-2 py-1 border rounded"
        >
          {styleOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <div style={{ width: '100%', height: '500px' }}>
        <MapComponent 
          locations={mapLocations}
          mapStyle={selectedMapStyle}
          initialViewState={defaultViewState}
        />
      </div>
    </div>
  );
};

export default {
  BasicMapExample,
  CustomMapExample,
  SingleLocationExample,
  PresentationMapExample,
  CustomLocationsExample,
  IntegratedMapExample
};