import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSession } from '../hooks';
import { Background } from './Common';
import Employees from './Employees';
import Layout from './Layout';
import LogIn from './LogIn';
import Organizations from './Organizations';
import routes from '../routes';
import Home from './Home';

export default function Router() {
  const { loggedIn } = useSession();

  if (!loggedIn) {
    return (
      <Background centered>
        <Switch>
          <Route path={routes.logIn} component={LogIn} />
          <Redirect to={routes.logIn} />
        </Switch>
      </Background>
    );
  }

  return (
    <Layout>
      <Switch>
        <Route path={routes.organizations} component={Organizations} />
        <Route path={routes.employees} component={Employees} />
        <Route component={Home} />
      </Switch>
    </Layout>
  );
}
