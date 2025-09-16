// src/HomePage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // State for the FINAL selected values (the keys)
  const [fromStand, setFromStand] = useState('');
  const [toStand, setToStand] = useState('');

  // NEW: State for the user's LIVE TEXT INPUT
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const busStands = [
    "Kollam", "Karunagappally", "Kayamkulam", "Chavara", "Oachira",
    "Paravur", "Punalur", "Kottarakkara", "Pathanapuram", "Sasthamkotta"
  ];

  const handleSelectStand = (standKey: string) => {
    if (activeDropdown === 'from') {
      setFromStand(standKey); // Set the final value
      setFromInput(t(standKey)); // Update the input field with the full, translated name
    } else if (activeDropdown === 'to') {
      setToStand(standKey); // Set the final value
      setToInput(t(standKey)); // Update the input field with the full, translated name
    }
    setActiveDropdown(null); // Close the dropdown
  };

  const handleSearchClick = () => {
    if (!fromStand || !toStand) {
      alert("Please select both 'From' and 'To' stands from the list.");
      return;
    }
    navigate(`/results?from=${encodeURIComponent(fromStand)}&to=${encodeURIComponent(toStand)}`);
  };

  return (
    <div className="hero-section">
      <div className="search-card">
        <h1>{t('liveBusTracker')}</h1>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="from">{t('from')}</label>
            <input
              id="from"
              type="text"
              placeholder={t('enterSourceStand')}
              value={fromInput} // Use the live input state for the value
              onFocus={() => setActiveDropdown('from')}
              // Update the input state as the user types
              onChange={(e) => {
                setFromInput(e.target.value);
                setFromStand(''); // Clear final selection if user is typing again
              }}
              autoComplete="off"
            />
            {activeDropdown === 'from' && (
              <div className="dropdown-list">
                {busStands
                  // THIS IS THE NEW FILTER LOGIC
                  .filter(standKey => 
                    t(standKey).toLowerCase().includes(fromInput.toLowerCase())
                  )
                  .map((standKey) => (
                    <div key={standKey} className="dropdown-item" onClick={() => handleSelectStand(standKey)}>
                      {t(standKey)}
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="to">{t('to')}</label>
            <input
              id="to"
              type="text"
              placeholder={t('enterDestinationStand')}
              value={toInput} // Use the live input state for the value
              onFocus={() => setActiveDropdown('to')}
              // Update the input state as the user types
              onChange={(e) => {
                setToInput(e.target.value)
                setToStand(''); // Clear final selection if user is typing again
              }}
              autoComplete="off"
            />
            {activeDropdown === 'to' && (
              <div className="dropdown-list">
                {busStands
                  // THIS IS THE NEW FILTER LOGIC
                  .filter(standKey => 
                    t(standKey).toLowerCase().includes(toInput.toLowerCase())
                  )
                  .map((standKey) => (
                    <div key={standKey} className="dropdown-item" onClick={() => handleSelectStand(standKey)}>
                      {t(standKey)}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <button className="search-button" onClick={handleSearchClick}>
          {t('showAvailableBuses')}
        </button>
      </div>
    </div>
  );
};

export default HomePage;

