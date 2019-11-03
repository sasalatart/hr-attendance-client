import APIClient from '../api/client';

export function getToken() {
  return localStorage.getItem('jwt');
}

export function setToken(jwt) {
  APIClient.setToken(jwt);
  localStorage.setItem('jwt', jwt);
}

export function clearToken() {
  APIClient.clearToken();
  localStorage.removeItem('jwt');
}
