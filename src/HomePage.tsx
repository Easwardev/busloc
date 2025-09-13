// src/HomePage.tsx

import React, { useState } from 'react';
import './HomePage.css';

interface HomePageProps {
  onOpenMap: () => void;
  onTrackBus: (from: string, to: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onOpenMap, onTrackBus }) => {
  const [fromStand, setFromStand] = useState('');
  const [toStand, setToStand] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // UPDATED: Ensure this list matches the data in App.tsx
  const busStands = ["Kayamkulam", "Karunagapalli", "Oachira", "Vallikavu"];

  // ... the rest of your HomePage.tsx code remains the same ...
  // (handleSelectStand, handleSearch, and the return JSX)
  const handleSelectStand = (stand: string) => {
    if (activeDropdown === 'from') setFromStand(stand);
    else if (activeDropdown === 'to') setToStand(stand);
    setActiveDropdown(null);
  };
  
  const handleSearch = () => {
    if (!fromStand || !toStand) {
      alert("Please select both 'From' and 'To' stands.");
      return;
    }
    onTrackBus(fromStand, toStand);
  }

  return (
    <div className="hero-section">
      <button className="live-map-link" onClick={onOpenMap}>
        Live Map
      </button>

      <div className="search-card">
        <h1>Live Bus Tracker</h1>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="from">FROM</label>
            <input id="from" type="text" placeholder="Enter source stand" value={fromStand} onFocus={() => setActiveDropdown('from')} onChange={(e) => setFromStand(e.target.value)} />
            {activeDropdown === 'from' && (
              <div className="dropdown-list">
                {busStands.filter(s => s.toLowerCase().includes(fromStand.toLowerCase())).map(s => <div key={s} className="dropdown-item" onClick={() => handleSelectStand(s)}>{s}</div>)}
              </div>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="to">TO</label>
            <input id="to" type="text" placeholder="Enter destination stand" value={toStand} onFocus={() => setActiveDropdown('to')} onChange={(e) => setToStand(e.target.value)} />
            {activeDropdown === 'to' && (
              <div className="dropdown-list">
                {busStands.filter(s => s.toLowerCase().includes(toStand.toLowerCase())).map(s => <div key={s} className="dropdown-item" onClick={() => handleSelectStand(s)}>{s}</div>)}
              </div>
            )}
          </div>
        </div>
        <button className="search-button" onClick={handleSearch}>Track Bus</button>
      </div>
    </div>
  );
};

export default HomePage;