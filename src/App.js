import React from 'react';
import { Provider } from 'react-redux';

import { CountryData } from 'containers';
import { LanguageContext } from 'context';
import { store } from 'redux/store';

const App = () => {
  const language = localStorage.getItem('lang') || 'en';
  const [lang, setLang] = React.useState(language);

  const setLanguage = (lang) => {
    localStorage.setItem('lang', lang);
    setLang(lang);
  }

  return (
    <Provider store={store}>
      <LanguageContext.Provider value={[lang, setLanguage]}>
        <CountryData />
      </LanguageContext.Provider>
    </Provider>
  );
};

export default App;
