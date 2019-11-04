import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSession } from '../hooks';
import { Background } from './Common';
import Home from './Home';
import Layout from './Layout';
import LogIn from './LogIn';

export default function Router() {
  const { loggedIn } = useSession();

  if (!loggedIn) {
    return (
      <BrowserRouter>
        <Background>
          <Route component={LogIn} />
        </Background>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route component={Home} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
