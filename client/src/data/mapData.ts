// mapData.ts - Location data for the interactive map

export interface Location {
  coordinates: [number, number];
  title: string;
  type: 'port' | 'train' | 'industrial' | 'customs' | 'osb' | 'project';
  description: string;
  polyline?: [number, number][];
  polygon?: [number, number][];
}

export const mapLocations: Location[] = [
  {
    coordinates: [27.970630606847152, 41.269682897335],
    title: "Kapaklı Model Sanayi Merkezi",
    type: "project",
    description: "Premium endüstriyel tesis - Ana proje lokasyonu"
  },
  {
    coordinates: [27.958268351465446, 41.28460805227061],
    title: "Çerkezköy Tren İstasyonu",
    type: "train",
    description: "Yüksek hızlı tren bağlantısı - Ankara-İstanbul hattı"
  },
  {
    coordinates: [27.508699722172217, 40.93436081897144],
    title: "Asyaport Liman A.Ş.",
    type: "port",
    description: "Konteyner terminali - Tekirdağ limanı"
  },
  {
    coordinates: [27.976457577293424, 41.31398720054284],
    title: "Çerkezköy Organize Sanayi Bölge Müdürlüğü",
    type: "industrial",
    description: "ÇOSB - Çerkezköy Organize Sanayi Bölgesi"
  },
  {
    coordinates: [27.943797150480712, 41.289516396747885],
    title: "KOSB - Kapaklı Organize Sanayi Bölgesi",
    type: "osb",
    description: "Kapaklı OSB - Organize sanayi bölgesi",
    polygon: [
      [41.282, 27.935],
      [41.282, 27.995],
      [41.315, 27.995],
      [41.315, 27.935],
      [41.282, 27.935]
    ]
  },
  {
    coordinates: [27.965, 41.285],
    title: "Gümrük Müdürlüğü",
    type: "customs",
    description: "İhracat/İthalat işlemleri - Çerkezköy"
  }
];

// Custom map style URL - You should replace this with your Mapbox Studio style
export const customMapStyle = import.meta.env.VITE_MAPBOX_STYLE || 'mapbox://styles/mapbox/dark-v11'; // Dark theme as fallback

// Default view state for the map
export const defaultViewState = {
  longitude: 27.8,
  latitude: 41.15,
  zoom: 10
};