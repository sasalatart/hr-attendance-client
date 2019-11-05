import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSession } from '../hooks';
import { Background } from './Common';
import Layout from './Layout';
import LogIn from './LogIn';
import OrganizationsList from './Organizations/List';

export default function Router() {
  const { loggedIn } = useSession();

  if (!loggedIn) {
    return (
      <Background>
        <Route component={LogIn} />
      </Background>
    );
  }

  return (
    <Layout>
      <Switch>
        <Route component={OrganizationsList} />
      </Switch>
    </Layout>
  );
}
