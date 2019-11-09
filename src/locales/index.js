import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { es as esDateLocales } from 'date-fns/locale';
import mapValues from 'lodash/mapValues';
import es from './es';

const resources = { es };

export const availableLocales = mapValues(resources, (value, key) => key);

const i18nLocalesToDateLocales = {
  es: esDateLocales,
};

i18n.use(initReactI18next).init({
  lng: availableLocales.es,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export function getCurrentDateLocale() {
  return i18nLocalesToDateLocales[i18n.language];
}

export default i18n;
