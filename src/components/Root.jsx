import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import CSSBaseline from '@material-ui/core/CssBaseline';
import 'toastr/build/toastr.min.css';
import '../locales';
import configureStore from '../store';
import { SessionProvider } from './Providers';
import Router from './Router';
import Startup from './Startup';

const { store, history } = configureStore();

export default function Root() {
  return (
    <Provider store={store}>
      <CSSBaseline />
      <SessionProvider>
        <ConnectedRouter history={history}>
          <Startup>
            <Router />
          </Startup>
        </ConnectedRouter>
      </SessionProvider>
    </Provider>
  );
}
