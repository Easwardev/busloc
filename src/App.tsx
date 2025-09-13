// src/App.tsx

import React, { useState } from 'react';
import HomePage from './HomePage';
import MapModal from './MapModal';
import './index.css';

// --- FULLY EXPANDED MOCK DATA ---
const busStandData = {
  "Kayamkulam": { lat: 9.173, lng: 76.502 },
  "Karunagapalli": { lat: 9.055, lng: 76.530 },
  "Oachira": { lat: 9.133, lng: 76.514 },
  "Vallikavu": { lat: 9.091, lng: 76.491 }, // Amritapuri
};

const routeData = {
  // --- Routes from Kayamkulam ---
  "Kayamkulam-Karunagapalli": { start: busStandData["Kayamkulam"], end: busStandData["Karunagapalli"], path: [[9.173, 76.502], [9.133, 76.514], [9.055, 76.530]] },
  "Kayamkulam-Oachira": { start: busStandData["Kayamkulam"], end: busStandData["Oachira"], path: [[9.173, 76.502], [9.133, 76.514]] },
  "Kayamkulam-Vallikavu": { start: busStandData["Kayamkulam"], end: busStandData["Vallikavu"], path: [[9.173, 76.502], [9.120, 76.495], [9.091, 76.491]] },

  // --- Routes from Karunagapalli ---
  "Karunagapalli-Kayamkulam": { start: busStandData["Karunagapalli"], end: busStandData["Kayamkulam"], path: [[9.055, 76.530], [9.133, 76.514], [9.173, 76.502]] },
  "Karunagapalli-Oachira": { start: busStandData["Karunagapalli"], end: busStandData["Oachira"], path: [[9.055, 76.530], [9.133, 76.514]] },
  "Karunagapalli-Vallikavu": { start: busStandData["Karunagapalli"], end: busStandData["Vallikavu"], path: [[9.055, 76.530], [9.091, 76.491]] },

  // --- Routes from Oachira ---
  "Oachira-Kayamkulam": { start: busStandData["Oachira"], end: busStandData["Kayamkulam"], path: [[9.133, 76.514], [9.173, 76.502]] },
  "Oachira-Karunagapalli": { start: busStandData["Oachira"], end: busStandData["Karunagapalli"], path: [[9.133, 76.514], [9.055, 76.530]] },
  "Oachira-Vallikavu": { start: busStandData["Oachira"], end: busStandData["Vallikavu"], path: [[9.133, 76.514], [9.091, 76.491]] },

  // --- Routes from Vallikavu ---
  "Vallikavu-Kayamkulam": { start: busStandData["Vallikavu"], end: busStandData["Kayamkulam"], path: [[9.091, 76.491], [9.120, 76.495], [9.173, 76.502]] },
  "Vallikavu-Karunagapalli": { start: busStandData["Vallikavu"], end: busStandData["Karunagapalli"], path: [[9.091, 76.491], [9.055, 76.530]] },
  "Vallikavu-Oachira": { start: busStandData["Vallikavu"], end: busStandData["Oachira"], path: [[9.091, 76.491], [9.133, 76.514]] },
};
// --- END OF MOCK DATA ---

function App() {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleTrackBus = (from, to) => {
    const routeKey = `${from}-${to}`;
    const foundRoute = routeData[routeKey];

    if (foundRoute) {
      setSelectedRoute(foundRoute);
      setIsMapVisible(true);
    } else if (from === to) {
      alert("'From' and 'To' stands cannot be the same.");
    } else {
      alert(`Sorry, a direct route from ${from} to ${to} is not available.`);
    }
  };

  const handleOpenGenericMap = () => {
    setSelectedRoute(null);
    setIsMapVisible(true);
  };
  
  const handleCloseMap = () => {
    setIsMapVisible(false);
  }

  return (
    <div>
      <HomePage 
        onTrackBus={handleTrackBus} 
        onOpenMap={handleOpenGenericMap} 
      />
      {isMapVisible && (
        <MapModal 
          onClose={handleCloseMap} 
          route={selectedRoute}
        />
      )}
    </div>
  );
}

export default App;