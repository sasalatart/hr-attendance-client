import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import mapValues from 'lodash/mapValues';
import es from './es';

const resources = { es };

export const availableLocales = mapValues(resources, (value, key) => key);

i18n.use(initReactI18next).init({
  lng: availableLocales.es,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
