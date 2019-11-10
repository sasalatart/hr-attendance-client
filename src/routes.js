import pathToRegexp from 'path-to-regexp';
import mapValues from 'lodash/mapValues';

const routes = {
  employees: '/employees',
  employeesAttendances: '/employees/:employeeId/attendances',
  employeesRegistry: '/employees/registry',
  organizations: '/organizations',
  organizationsOrganization: '/organizations/:organizationId',
};

export const compiledRoutes = mapValues(routes, route =>
  pathToRegexp.compile(route),
);

export default routes;
