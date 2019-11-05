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
  organizationCreate: values => api.post('/organizations', values),
  organizationUpdate: (id, values) => api.put(`/organizations/${id}`, values),
  ogranizationDestroy: id => api.delete(`/organizations/${id}`),
};
