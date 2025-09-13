// src/App.tsx

import React, { useState } from 'react';
import HomePage from './HomePage';
import MapModal from './MapModal';
import './index.css';

// --- UPDATED MOCK DATA ---
const busStandData = {
  "Kayamkulam": { lat: 9.181580961206679, lng: 76.51112325649001 }, // Precise coordinate
  "Karunagapalli": { lat: 9.061537301328288, lng: 76.53575179887908 }, // Precise coordinate
  "Oachira": { lat: 9.133, lng: 76.514 },
  "Vallikavu": { lat: 9.091, lng: 76.491 }, 
};

const routeData = {
  // --- Routes from Kayamkulam ---
  "Kayamkulam-Karunagapalli": { start: busStandData["Kayamkulam"], end: busStandData["Karunagapalli"], path: [[9.181580961206679, 76.51112325649001], [9.1775, 76.51139], [9.17604, 76.51152], [9.1751, 76.51167], [9.1729, 76.51261], [9.17117, 76.51352], [9.16911, 76.5144], [9.16597, 76.51532], [9.16246, 76.51616], [9.15814, 76.51694], [9.15546, 76.51733], [9.1528, 76.51767], [9.14986, 76.51793], [9.14583, 76.51817], [9.14205, 76.51833], [9.13842, 76.5184], [9.1345, 76.51844], [9.13111, 76.51841], [9.12781, 76.51834], [9.1245, 76.51832], [9.12185, 76.51835], [9.11943, 76.51855], [9.11677, 76.51897], [9.11364, 76.51961], [9.11019, 76.52041], [9.10645, 76.52136], [9.10303, 76.52222], [9.10019, 76.52302], [9.09702, 76.52391], [9.09378, 76.52489], [9.09053, 76.52586], [9.08728, 76.52684], [9.08405, 76.52781], [9.08083, 76.52877], [9.0776, 76.52974], [9.0744, 76.5307], [9.07117, 76.53166], [9.06795, 76.53262], [9.06473, 76.53358], [9.06186, 76.53441], [9.061537301328288, 76.53575179887908]] },
  "Kayamkulam-Oachira": { start: busStandData["Kayamkulam"], end: busStandData["Oachira"], path: [[9.173, 76.502], [9.133, 76.514]] },
  "Kayamkulam-Vallikavu": { start: busStandData["Kayamkulam"], end: busStandData["Vallikavu"], path: [[9.173, 76.502], [9.120, 76.495], [9.091, 76.491]] },

  // --- NEW, DETAILED REVERSE ROUTE ---
  "Karunagapalli-Kayamkulam": { 
    start: busStandData["Karunagapalli"], 
    end: busStandData["Kayamkulam"], 
    path: [ [9.061537301328288, 76.53575179887908], [9.06186, 76.53441], [9.06473, 76.53358], [9.06795, 76.53262], [9.07117, 76.53166], [9.0744, 76.5307], [9.0776, 76.52974], [9.08083, 76.52877], [9.08405, 76.52781], [9.08728, 76.52684], [9.09053, 76.52586], [9.09378, 76.52489], [9.09702, 76.52391], [9.10019, 76.52302], [9.10303, 76.52222], [9.10645, 76.52136], [9.11019, 76.52041], [9.11364, 76.51961], [9.11677, 76.51897], [9.11943, 76.51855], [9.12185, 76.51835], [9.1245, 76.51832], [9.12781, 76.51834], [9.13111, 76.51841], [9.1345, 76.51844], [9.13842, 76.5184], [9.14205, 76.51833], [9.14583, 76.51817], [9.14986, 76.51793], [9.1528, 76.51767], [9.15546, 76.51733], [9.15814, 76.51694], [9.16246, 76.51616], [9.16597, 76.51532], [9.16911, 76.5144], [9.17117, 76.51352], [9.1729, 76.51261], [9.1751, 76.51167], [9.17604, 76.51152], [9.1775, 76.51139], [9.181580961206679, 76.51112325649001] ] 
  },
  
  // --- Other existing routes ---
  "Karunagapalli-Oachira": { start: busStandData["Karunagapalli"], end: busStandData["Oachira"], path: [[9.055, 76.530], [9.133, 76.514]] },
  "Karunagapalli-Vallikavu": { start: busStandData["Karunagapalli"], end: busStandData["Vallikavu"], path: [[9.055, 76.530], [9.091, 76.491]] },

  "Oachira-Kayamkulam": { start: busStandData["Oachira"], end: busStandData["Kayamkulam"], path: [[9.133, 76.514], [9.173, 76.502]] },
  "Oachira-Karunagapalli": { start: busStandData["Oachira"], end: busStandData["Karunagapalli"], path: [[9.133, 76.514], [9.055, 76.530]] },
  "Oachira-Vallikavu": { start: busStandData["Oachira"], end: busStandData["Vallikavu"], path: [[9.133, 76.514], [9.091, 76.491]] },

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