import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button 
        onClick={() => changeLanguage('en')} 
        disabled={i18n.language === 'en'}
      >
        English
      </button>
      <button 
        onClick={() => changeLanguage('ml')} 
        disabled={i18n.language === 'ml'}
      >
        മലയാളം
      </button>
    </div>
  );
};

export default LanguageSwitcher;