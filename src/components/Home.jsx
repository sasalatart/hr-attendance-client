import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSession } from '../hooks';
import routes, { compiledRoutes } from '../routes';

export default function Home() {
  const { isAdmin, isEmployee, currentUser } = useSession();

  if (isAdmin) return <Redirect to={routes.organizations} />;
  if (isEmployee) return <Redirect to={routes.employeesRegistry} />;

  return (
    <Redirect
      to={compiledRoutes.organizationsOrganization({
        organizationId: currentUser.organizationId,
      })}
    />
  );
}
