# Interactive MapComponent Documentation

A reusable, self-contained Mapbox GL JS React component for displaying business locations with custom styling and interactive features.

## 🚀 Features

- **Custom Mapbox Styling**: Supports any Mapbox Studio custom style
- **Interactive Markers**: Click markers to view detailed information
- **Responsive Design**: Works on desktop and mobile devices
- **Custom SVG Icons**: Different icons for different location types
- **Auto-fitting View**: Automatically calculates optimal view to show all locations
- **Fullscreen Support**: Can be integrated with fullscreen functionality
- **TypeScript Support**: Fully typed for better development experience
- **Scoped Styling**: CSS modules prevent style conflicts

## 📦 Installation

```bash
npm install react-map-gl mapbox-gl
```

## 🔧 Setup

1. **Get Mapbox Access Token**
   - Sign up at [Mapbox](https://account.mapbox.com/)
   - Get your access token from the dashboard
   - Add it to your `.env` file:

```env
REACT_APP_MAPBOX_TOKEN=your_mapbox_token_here
```

2. **Create Custom Map Style** (Optional)
   - Go to [Mapbox Studio](https://studio.mapbox.com/)
   - Create a custom style or use a preset
   - Copy the style URL

## 🎯 Usage

### Basic Usage

```tsx
import MapComponent from './components/MapComponent';

const locations = [
  {
    coordinates: [27.970630606847152, 41.269682897335],
    title: "Main Project Location",
    type: "project",
    description: "Primary industrial facility"
  },
  {
    coordinates: [27.958268351465446, 41.28460805227061],
    title: "Train Station",
    type: "train",
    description: "High-speed rail connection"
  }
];

function App() {
  return (
    <div style={{ width: '800px', height: '600px' }}>
      <MapComponent 
        locations={locations}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      />
    </div>
  );
}
```

### Advanced Usage with Custom View

```tsx
const customViewState = {
  longitude: 27.8,
  latitude: 41.15,
  zoom: 12
};

<MapComponent 
  locations={locations}
  mapStyle="mapbox://styles/your-username/your-style-id"
  initialViewState={customViewState}
  width="100%"
  height="500px"
  className="my-custom-map"
/>
```

## 📋 Props API

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `locations` | `Location[]` | ✅ | Array of location objects to display |
| `mapStyle` | `string` | ✅ | Mapbox style URL |
| `initialViewState` | `ViewState` | ❌ | Initial map position and zoom |
| `width` | `string` | ❌ | Container width (default: "100%") |
| `height` | `string` | ❌ | Container height (default: "100%") |
| `className` | `string` | ❌ | Additional CSS classes |

### Location Object Structure

```typescript
interface Location {
  coordinates: [number, number]; // [longitude, latitude]
  title: string;                // Display name
  type: 'port' | 'train' | 'industrial' | 'customs' | 'osb' | 'project';
  description: string;          // Popup description
}
```

### ViewState Object Structure

```typescript
interface ViewState {
  longitude: number;  // Center longitude
  latitude: number;   // Center latitude  
  zoom: number;       // Zoom level (0-22)
}
```

## 🎨 Location Types & Icons

The component supports different location types with custom SVG icons:

- **`project`**: Star icon with pulsing animation (primary location)
- **`train`**: Train icon with speed lines
- **`port`**: Ship/container icon with wave animation
- **`industrial`**: Factory/building icon
- **`osb`**: Industrial zone icon
- **`customs`**: Government shield icon with checkmark

## 🎨 Styling

The component uses scoped CSS to prevent conflicts. You can:

1. **Override default styles** by targeting the CSS classes
2. **Create custom themes** by modifying `MapComponent.css`
3. **Use custom Mapbox styles** for the map background

### CSS Classes

- `.mapbox-container`: Main container
- `.map-marker`: Individual markers
- `.popup-content`: Popup styling
- `.type-badge`: Location type badges

## 🔍 Example Data

```typescript
export const sampleLocations = [
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
  }
];
```

## 🌟 Integration Examples

### With Fullscreen Support

```tsx
const [isFullscreen, setIsFullscreen] = useState(false);

<div className={isFullscreen ? 'fixed inset-0 z-50' : 'w-full h-96'}>
  <MapComponent 
    locations={locations}
    mapStyle={mapStyle}
    className={isFullscreen ? 'fullscreen-map' : ''}
  />
</div>
```

### With Dynamic Data

```tsx
const [locations, setLocations] = useState([]);

useEffect(() => {
  // Fetch locations from API
  fetchLocations().then(setLocations);
}, []);

<MapComponent 
  locations={locations}
  mapStyle="mapbox://styles/mapbox/dark-v11"
/>
```

## 🛠️ Customization

### Adding New Location Types

1. **Add type to interface**:
```typescript
type: 'port' | 'train' | 'industrial' | 'customs' | 'osb' | 'project' | 'your-new-type';
```

2. **Add icon in getLocationIcon function**:
```typescript
case 'your-new-type':
  return (
    <div style={iconStyle} className="map-marker your-type-marker">
      {/* Your custom SVG */}
    </div>
  );
```

3. **Add styling in CSS**:
```css
.your-type-bg {
  fill: #your-color;
  stroke: #your-border-color;
  stroke-width: 2;
}
```

### Custom Map Styles

Create custom styles at [Mapbox Studio](https://studio.mapbox.com/):

1. Choose a template or start from scratch
2. Customize colors, fonts, and features
3. Publish your style
4. Copy the style URL: `mapbox://styles/username/style-id`

## 🚨 Important Notes

- **Mapbox Token**: Required for the component to work
- **Attribution**: Ensure proper Mapbox attribution in your app
- **Performance**: Large numbers of markers may affect performance
- **Mobile**: Touch gestures are enabled by default

## 🔧 Troubleshooting

### Common Issues

1. **Map not loading**: Check your Mapbox token
2. **Markers not showing**: Verify coordinate format [lng, lat]
3. **Styling conflicts**: Use scoped CSS classes
4. **Performance issues**: Reduce number of markers or implement clustering

### Development Tips

- Use browser dev tools to inspect map events
- Test on different screen sizes
- Verify coordinates with [geojson.io](http://geojson.io/)
- Check Mapbox Studio for style validation

## 📄 License

This component is designed to work with Mapbox GL JS, which requires attribution and has usage limits on the free tier. Please review [Mapbox terms of service](https://www.mapbox.com/legal/tos/).