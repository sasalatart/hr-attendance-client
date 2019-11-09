import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSession } from '../hooks';
import { roles } from '../constants';
import AttendanceRegistry from './AttendanceRegistry';
import { Background } from './Common';
import Layout from './Layout';
import LogIn from './LogIn';
import Organizations from './Organizations';

export default function Router() {
  const { loggedIn, role } = useSession();

  if (!loggedIn) {
    return (
      <Background centered>
        <Route component={LogIn} />
      </Background>
    );
  }

  return (
    <Layout>
      <Switch>
        <Route
          component={
            role === roles.employee ? AttendanceRegistry : Organizations
          }
        />
      </Switch>
    </Layout>
  );
}
