// src/MapModal.tsx

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { calculateETA } from './utils/etaCalculator';

interface MapModalProps {
  onClose: () => void;
  route: any;
}

// Fix for default Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapModal: React.FC<MapModalProps> = ({ onClose, route }) => {
  const { t } = useTranslation();
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const busMarkerRef = useRef<L.Marker | null>(null);

  const [eta, setEta] = useState<string>(t('calculating'));

  // Effect to initialize the map only once
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = L.map(mapContainerRef.current, { zoomControl: false });
      L.control.zoom({ position: 'bottomright' }).addTo(map);
      mapRef.current = map;

      // --- THIS LINE WAS MISSING ---
      // It adds the OpenStreetMap tile layer (the map background)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      // --- END OF FIX ---
    }
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Effect for drawing routes and handling animation
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear previous layers
    map.eachLayer(layer => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) map.removeLayer(layer);
    });
    
    if (route && route.path && route.path.length > 0) {
      const startCoords: [number, number] = [route.start.lat, route.start.lng];
      const endCoords: [number, number] = [route.end.lat, route.end.lng];
      
      L.marker(startCoords).addTo(map).bindPopup(t('start'));
      L.marker(endCoords).addTo(map).bindPopup(t('end'));

      const routePolyline = L.polyline(route.path, { color: '#0057e7', weight: 5 }).addTo(map);
      map.fitBounds(routePolyline.getBounds());

      const busMarker = L.marker(startCoords, {
        icon: L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
          iconSize: [48, 48],
          iconAnchor: [24, 24],
        })
      }).addTo(map).bindPopup(t('busInMotion'));
      busMarkerRef.current = busMarker;
      
      let currentIndex = 0;
      const speedKmph = 40;
      
      const animationInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % route.path.length;
        busMarkerRef.current?.setLatLng(route.path[currentIndex]);
      }, 100);
      
      const etaInterval = setInterval(() => {
        if (currentIndex >= route.path.length - 1) {
          setEta(t('arrived'));
          clearInterval(animationInterval);
          clearInterval(etaInterval);
        } else {
          const newEta = calculateETA(route.path, currentIndex, speedKmph);
          setEta(newEta);
        }
      }, 3000);

      return () => {
        clearInterval(animationInterval);
        clearInterval(etaInterval);
      };

    } else {
      const kollamCoords: [number, number] = [8.8854, 76.6085];
      map.setView(kollamCoords, 12);
      L.marker(kollamCoords).addTo(map).bindPopup(t('welcomeToKollam')).openPopup();
    }
  }, [route, t]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
      <div style={{ position: 'relative', width: '90%', height: '80%', backgroundColor: 'white', padding: '10px', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 1000, cursor: 'pointer', fontSize: '18px', padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc' }}>
          {t('close')}
        </button>
        <div ref={mapContainerRef} style={{ flex: 1 }} />
        <div style={{ backgroundColor: '#28a745', color: 'white', fontWeight: 'bold', textAlign: 'center', padding: '12px', fontSize: '18px', boxShadow: '0 -2px 8px rgba(0,0,0,0.3)', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
          {t('arrivesIn')} {eta}
        </div>
      </div>
    </div>
  );
};

export default MapModal;

