import React from 'react';

export const LanguageContext = React.createContext({
  lang: 'en',
  setLang: () => {},
});