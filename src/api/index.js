import api from './client';

export default {
  logIn: body => api.post('/user_token', body),
  loadProfile: () => api.get('/users/me'),
};
