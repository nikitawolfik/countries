const en = require('../assets/translations/en.json');
const ru = require('../assets/translations/ru.json');

const languages = {
  en,
  ru,
};

export const translate = (key, lang = 'en') => languages[lang][key];