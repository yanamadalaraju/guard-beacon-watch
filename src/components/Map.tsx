
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Guard, Location } from '@/types';
import { cn } from '@/lib/utils';

interface MapProps {
  guards?: Guard[];
  locations?: Location[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
  showGuards?: boolean;
  showLocations?: boolean;
  showGeofencing?: boolean;
}

const Map = ({
  guards = [],
  locations = [],
  center = [34.0522, -118.2437],
  zoom = 13,
  height = '400px',
  className,
  showGuards = true,
  showLocations = true,
  showGeofencing = true,
}: MapProps) => {
  const mapRef = useRef(null);

  const guardIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const locationIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className={cn('rounded-lg overflow-hidden', className)} style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {showGuards && guards.map((guard) => (
          guard.currentLocation && (
            <Marker
              key={guard.id}
              position={[guard.currentLocation.lat, guard.currentLocation.lng]}
              icon={guardIcon}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-medium">{guard.name}</h3>
                  <p className="text-sm">Status: {guard.status}</p>
                  <p className="text-xs text-muted-foreground">
                    Last updated: {new Date(guard.currentLocation.lastUpdated).toLocaleTimeString()}
                  </p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
        
        {showLocations && locations.map((location) => (
          <div key={location.id}>
            <Marker
              position={[location.lat, location.lng]}
              icon={locationIcon}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-medium">{location.name}</h3>
                  <p className="text-sm">{location.address}</p>
                  {showGeofencing && (
                    <p className="text-xs text-muted-foreground">
                      Geofence radius: {location.radius}m
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
            
            {showGeofencing && (
              <Circle
                center={[location.lat, location.lng]}
                radius={location.radius}
                pathOptions={{ fillColor: 'blue', fillOpacity: 0.1, weight: 1, color: 'blue' }}
              />
            )}
          </div>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
