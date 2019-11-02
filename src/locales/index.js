import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './es';

i18n.use(initReactI18next).init({
  lng: 'es',
  resources: { es },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
