/**
 * DEPRECATED: This file is no longer used.
 * Use StrategicLocationSection instead.
 * This file can be safely deleted.
 */

export default function LocationSection() {
  return null;
}
          initializeMap();
        }
      };

      const initializeMap = () => {
        if (!mapRef.current || mapInitialized || mapInstanceRef.current) return;

        try {
          // Kapaklı approximate coordinates
          const center = { lat: 41.0578, lng: 28.0647 };
          
          const map = new window.google.maps.Map(mapRef.current, {
            zoom: 11,
            center,
            mapTypeId: viewType,
            styles: [
              {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#1a1a2e"}]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#0f3460"}]
              }
            ]
          });

          mapInstanceRef.current = map;

          // Project location marker
          new window.google.maps.Marker({
            position: center,
            map,
            title: 'Kapaklı Model Sanayi Merkezi',
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#d4af37',
              fillOpacity: 1,
              strokeWeight: 3,
              strokeColor: '#ffffff'
            }
          });

          // Location advantages markers
          const locations = [
            { position: { lat: 41.0678, lng: 28.0547 }, title: 'OSB - 5 km', icon: 'building' },
            { position: { lat: 41.0478, lng: 28.0847 }, title: 'Otoyol - 2 km', icon: 'highway' },
            { position: { lat: 40.9778, lng: 29.1047 }, title: 'Liman - 25 km', icon: 'port' },
            { position: { lat: 40.9000, lng: 28.8000 }, title: 'Havalimanı - 35 km', icon: 'airport' }
          ];

          locations.forEach(location => {
            const marker = new window.google.maps.Marker({
              position: location.position,
              map,
              title: location.title,
              icon: {
                path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                scale: 6,
                fillColor: '#22c55e',
                fillOpacity: 0.8,
                strokeWeight: 2,
                strokeColor: '#ffffff'
              }
            });

            // Add bounce animation
            marker.addListener('mouseover', () => {
              marker.setAnimation(window.google.maps.Animation.BOUNCE);
              setTimeout(() => marker.setAnimation(null), 750);
            });
          });

          setMapInitialized(true);
        } catch (error) {
          console.error('Error initializing map:', error);
        }
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !mapInitialized) {
              loadGoogleMaps();
            }
          });
        },
        { threshold: 0.3 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        observer.disconnect();
      };
    } else {
      // No API key, just show placeholder
      setMapInitialized(false);
    }
  }, [mapInitialized, viewType]);

  const switchMapView = (type: 'roadmap' | 'satellite') => {
    setViewType(type);
    if (mapInstanceRef.current && window.google) {
      mapInstanceRef.current.setMapTypeId(type);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="section bg-gradient-to-br from-background via-muted to-background"
      data-testid="location-section"
    >
      <div className="max-w-7xl mx-auto px-8 w-full h-full flex flex-col">
        <h2 className="text-5xl md:text-6xl font-black mb-8 text-center bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
          Stratejik Lokasyon
        </h2>
        
        {/* Google Maps Container */}
        <div className="flex-1 glass rounded-3xl overflow-hidden relative">
          <div 
            ref={mapRef}
            className="w-full h-full bg-muted flex items-center justify-center"
            data-testid="google-map-container"
          >
            {!mapInitialized && (
              <div className="text-center">
                <div className="loading-spinner mx-auto mb-4"></div>
                <p className="text-muted-foreground">Harita yükleniyor...</p>
                {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Google Maps API anahtarı gerekli
                  </p>
                )}
              </div>
            )}
          </div>
          
          {/* Location Advantages Overlay */}
          <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-3 z-10">
            <div className="glass px-6 py-3 rounded-full flex items-center gap-3 glow" data-testid="location-osb">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold">OSB Yakınlığı</div>
                <div className="text-xs text-muted-foreground">5 km mesafe</div>
              </div>
            </div>
            
            <div className="glass px-6 py-3 rounded-full flex items-center gap-3 glow" data-testid="location-highway">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold">Otoyol Bağlantısı</div>
                <div className="text-xs text-muted-foreground">2 km mesafe</div>
              </div>
            </div>
            
            <div className="glass px-6 py-3 rounded-full flex items-center gap-3 glow" data-testid="location-port">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold">Liman</div>
                <div className="text-xs text-muted-foreground">25 km mesafe</div>
              </div>
            </div>
            
            <div className="glass px-6 py-3 rounded-full flex items-center gap-3 glow" data-testid="location-airport">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold">Havalimanı</div>
                <div className="text-xs text-muted-foreground">35 km mesafe</div>
              </div>
            </div>
          </div>
          
          {/* Map Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2 z-10">
            <button 
              className={`glass px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                viewType === 'roadmap' ? 'text-white' : 'hover:bg-white/10'
              }`}
              style={viewType === 'roadmap' ? {
                background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)'
              } : {}}
              onClick={() => switchMapView('roadmap')}
              data-testid="map-view-roadmap"
            >
              Harita
            </button>
            <button 
              className={`glass px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                viewType === 'satellite' ? 'text-white' : 'hover:bg-white/10'
              }`}
              style={viewType === 'satellite' ? {
                background: 'linear-gradient(to right, #ff5300, #ff6b1a, #ff5300)'
              } : {}}
              onClick={() => switchMapView('satellite')}
              data-testid="map-view-satellite"
            >
              Uydu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
