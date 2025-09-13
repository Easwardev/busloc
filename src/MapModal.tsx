// src/MapModal.tsx

import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapModalProps {
  onClose: () => void;
  route: any; // The route data from App.tsx (can be null)
}

const MapModal: React.FC<MapModalProps> = ({ onClose, route }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapContainerRef.current.hasChildNodes()) {
      const map = L.map(mapContainerRef.current);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // --- NEW LOGIC ---
      if (route) {
        // If a specific route is provided, show it
        const startCoords = [route.start.lat, route.start.lng];
        const endCoords = [route.end.lat, route.end.lng];
        
        L.marker(startCoords).addTo(map).bindPopup("Start");
        L.marker(endCoords).addTo(map).bindPopup("End");
        
        const routePolyline = L.polyline(route.path, { color: 'blue' }).addTo(map);
        
        // Automatically zoom the map to fit the route
        map.fitBounds(routePolyline.getBounds());

      } else {
        // If no route, show the default Kollam map
        map.setView([8.8934, 76.6141], 13);
        L.marker([8.8934, 76.6141]).addTo(map).bindPopup('Welcome to Kollam!').openPopup();
      }
    }
  }, [route]); // Rerun this effect if the route changes

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
      <div style={{ position: 'relative', width: '90%', height: '80%', backgroundColor: 'white', padding: '10px', borderRadius: '8px' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 1000, cursor: 'pointer', fontSize: '18px', padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc' }}>
          Close
        </button>
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default MapModal;