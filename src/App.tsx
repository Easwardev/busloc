// src/App.tsx

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomePage from './HomePage';
import ResultsPage from './ResultsPage';
import MapModal from './MapModal';
import './index.css';
import './HomePage.css'; // Import for the global button styles
import polyline from '@mapbox/polyline';
import { busStandData } from './data/busData';

function App() {
  const { t, i18n } = useTranslation();
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ml' : 'en';
    i18n.changeLanguage(newLang);
  };

  // This function is passed to the ResultsPage and is called when a user clicks a bus.
  const handleShowRouteOnMap = async (bus: any) => {
    const startCoords = busStandData[bus.from];
    const endCoords = busStandData[bus.to];
    
    // Ensure we have coordinates before trying to fetch a route.
    if (!startCoords || !endCoords) {
      console.error("Could not find coordinates for the selected route:", bus);
      alert("Location data is missing for this route.");
      return;
    }

    const url = `http://router.project-osrm.org/route/v1/driving/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?overview=full&geometries=polyline`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.code !== 'Ok') throw new Error('Route not found on OSRM server');

      const geometry = data.routes[0].geometry;
      const decodedPath = polyline.decode(geometry);
      
      setSelectedRoute({
        start: startCoords,
        end: endCoords,
        path: decodedPath,
      });
      setIsMapVisible(true);
    } catch (error) {
      console.error("Error fetching route from OSRM:", error);
      alert("Could not calculate the route. Please check your connection and try again.");
    }
  };
  
  // This opens the map to a default, generic view.
  const handleOpenGenericMap = () => {
    setSelectedRoute(null);
    setIsMapVisible(true);
  };
  
  const handleCloseMap = () => {
    setIsMapVisible(false);
  };

  return (
    <>
      {/* These global buttons are always visible, outside the page routing system. */}
      <div className="top-bar-buttons">
        <button className="language-switcher" onClick={toggleLanguage}>
          {i18n.language === 'en' ? 'മലയാളം' : 'English'}
        </button>
        <button className="live-map-link" onClick={handleOpenGenericMap}>
          {t('map')}
        </button>
      </div>
      
      {/* This defines the pages of your application. */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/results" 
          element={<ResultsPage onShowRoute={handleShowRouteOnMap} />} 
        />
      </Routes>

      {/* The map modal is an overlay, so it sits outside the page routes. */}
      {isMapVisible && (
        <MapModal 
          onClose={handleCloseMap} 
          route={selectedRoute}
        />
      )}
    </>
  );
}

export default App;

