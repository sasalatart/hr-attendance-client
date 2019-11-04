import React from 'react';
import { Provider } from 'react-redux';
import CSSBaseline from '@material-ui/core/CssBaseline';
import 'toastr/build/toastr.min.css';
import '../locales';
import configureStore from '../store';
import { SessionProvider } from './Providers';
import Router from './Router';

const { store } = configureStore();

export default function Root() {
  return (
    <Provider store={store}>
      <CSSBaseline />
      <SessionProvider>
        <Router />
      </SessionProvider>
    </Provider>
  );
}
