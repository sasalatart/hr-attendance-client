import pathToRegexp from 'path-to-regexp';
import mapValues from 'lodash/mapValues';

const routes = {
  home: '/',
  organizations: '/organizations',
  organizationsOrganization: '/organizations/:organizationId',
};

export const compiledRoutes = mapValues(routes, route =>
  pathToRegexp.compile(route),
);

export default routes;
