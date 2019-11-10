import URI from 'urijs';
import api from './client';

function addQueryTo(url, query) {
  return URI(url)
    .addQuery(query)
    .toString();
}

export default {
  logIn: body => api.post('/user_token', body),
  loadProfile: () => api.get('/users/me'),

  attendancesCheckIn: () => api.post('/attendances/check-ins'),
  attendancesCheckOut: () => api.put('/attendances/check-outs'),
  attendancesFromOrganization: (organizationId, page) => {
    return api.get(
      addQueryTo(`/organizations/${organizationId}/attendances`, { page }),
    );
  },
  attendancesFromEmployee: (employeeId, page) => {
    return api.get(
      addQueryTo(`/employees/${employeeId}/attendances`, { page }),
    );
  },
  attendanceCreate: (employeeId, values) => {
    return api.post(`/employees/${employeeId}/attendances`, values);
  },
  attendanceUpdate: (id, values) => api.put(`/attendances/${id}`, values),
  attendanceDestroy: id => api.delete(`/attendances/${id}`),

  organizationsIndex: page => api.get(addQueryTo('/organizations', { page })),
  organizationShow: id => api.get(`/organizations/${id}`),
  organizationCreate: values => api.post('/organizations', values),
  organizationUpdate: (id, values) => api.put(`/organizations/${id}`, values),
  organizationDestroy: id => api.delete(`/organizations/${id}`),

  usersIndex: (organizationId, role, page) => {
    return api.get(
      addQueryTo(`/organizations/${organizationId}/users`, { page, role }),
    );
  },
  userShow: id => api.get(`/users/${id}`),
  userCreate: (organizationId, values) => {
    return api.post(`/organizations/${organizationId}/users`, values);
  },
  userUpdate: (id, values) => api.put(`/users/${id}`, values),
  userDestroy: id => api.delete(`/users/${id}`),
};
