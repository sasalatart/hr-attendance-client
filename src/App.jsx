import React from 'react';
import { useTranslation } from 'react-i18next';
import './locales';

export default function App() {
  const { t } = useTranslation();
  return <p>{t('helloWorld')}</p>;
}
