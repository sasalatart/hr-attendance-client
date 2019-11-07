import URI from 'urijs';
import api from './client';

export default {
  logIn: body => api.post('/user_token', body),
  loadProfile: () => api.get('/users/me'),

  organizationsIndex: page => {
    return api.get(
      URI('/organizations')
        .addQuery({ page })
        .toString(),
    );
  },
  organizationShow: id => api.get(`/organizations/${id}`),
  organizationCreate: values => api.post('/organizations', values),
  organizationUpdate: (id, values) => api.put(`/organizations/${id}`, values),
  organizationDestroy: id => api.delete(`/organizations/${id}`),

  usersIndex: (organizationId, role, page) => {
    return api.get(
      URI(`/organizations/${organizationId}/users`)
        .addQuery({ page, role })
        .toString(),
    );
  },
  userCreate: (organizationId, values) => {
    return api.post(`/organizations/${organizationId}/users`, values);
  },
  userUpdate: (id, values) => api.put(`/users/${id}`, values),
  userDestroy: id => api.delete(`/users/${id}`),
};
