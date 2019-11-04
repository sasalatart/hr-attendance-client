import React from 'react';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';
import configureStore from './store';
import './locales';

const { store } = configureStore();

export default function App() {
  const { t } = useTranslation();
  return (
    <Provider store={store}>
      <p>{t('helloWorld')}</p>
    </Provider>
  );
}
