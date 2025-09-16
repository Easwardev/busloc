// src/ResultsPage.tsx

import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { allBusServices } from './data/busData';
import './HomePage.css';

interface ResultsPageProps {
  onShowRoute: (bus: any) => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ onShowRoute }) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const availableBuses = allBusServices.filter(
    bus => bus.from === from && bus.to === to
  );

  return (
    <div className="results-page-container">
      <Link to="/" className="back-link">← {t('backToSearch', 'Back to Search')}</Link>
      <div className="results-card">
        <h2>{t('availableBuses', 'Available Buses')}</h2>
        <p className="route-title">{t(from || '')} → {t(to || '')}</p>
        
        {availableBuses.length > 0 ? (
          <>
            <div className="results-header">
              <div>{t('fromHeader', 'From')}</div>
              <div>{t('toHeader', 'To')}</div>
              <div>{t('departure', 'Departure')}</div>
              <div>{t('arrival', 'Arrival')}</div>
            </div>
            {availableBuses.map((bus, index) => (
              <div key={index} className="results-row" onClick={() => onShowRoute(bus)} title="Click to see route on map">
                <div>{t(bus.from)}</div>
                <div>{t(bus.to)}</div>
                <div>{bus.departure}</div>
                <div>{bus.arrival}</div>
              </div>
            ))}
          </>
        ) : (
          <p className="no-results">{t('noDirectBuses', 'No direct buses found for this route in our schedule.')}</p>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;

