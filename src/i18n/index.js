const i18next = require('i18next');

const ru = require('./ru');
const en = require('./en');
const kg = require('./kg');

i18next.init({
  lng: 'ru',
  debug: process.env.NODE_ENV === 'development',
  resources: {
    kg: {
      translation: { ...kg }
    },
    ru: {
      translation: { ...ru }
    },
    en: {
      translation: { ...en }
    }
  }
});

module.exports = i18next;