# Google Maps Setup Instructions

## Getting a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Maps JavaScript API:
   - Go to "APIs & Services" > "Library"
   - Search for "Maps JavaScript API"
   - Click on it and enable it
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key

## Setting up the API Key

1. Open the `.env` file in the project root
2. Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual API key:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

## Security (Optional but Recommended)

1. In Google Cloud Console, go to "APIs & Services" > "Credentials"
2. Click on your API key to edit it
3. Under "Application restrictions", you can:
   - Set HTTP referrers (recommended for web apps)
   - Add your domain (e.g., `localhost:5000`, `yourdomain.com`)

## Features

The Google Maps component includes:
- Interactive map centered on Kapaklı, Turkey
- Custom markers for different location types
- Info windows with location details
- Professional styling
- Responsive design
- Loading and error states

## Location Types and Colors

- **Port** (Blue): Asyaport Liman
- **Train** (Green): High-speed train stations
- **Industrial** (Yellow): Industrial areas
- **Customs** (Red): Customs offices
- **OSB** (Purple): Organized Industrial Zones
- **Project** (Orange): Main project location