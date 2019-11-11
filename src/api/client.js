import URI from 'urijs';
import humps from 'lodash-humps';
import createHumps from 'lodash-humps/lib/createHumps';
import mapValues from 'lodash/mapValues';
import snakeCase from 'lodash/snakeCase';
import config from '../config';
import { availableLocales } from '../locales';

const snake = createHumps(snakeCase);

export default {
  locale: availableLocales.es,

  setLocale(locale) {
    this.locale = locale;
  },

  setToken(token) {
    this.token = token;
  },

  clearToken() {
    this.token = undefined;
  },

  async handleResponse(res) {
    const { headers } = res;

    let body;
    try {
      body = humps(res.status === 204 ? {} : await res.json());
    } catch {
      /** noop */
    }

    // eslint-disable-next-line prefer-promise-reject-errors
    if (!res.ok) return Promise.reject({ ...body, status: res.status });

    const page = +headers.get('x-page');
    if (!page) return body;

    const perPage = +headers.get('x-per-page');
    const total = +headers.get('x-total');
    return {
      resources: body,
      pagination: {
        page,
        totalPages: Math.ceil(total / perPage),
        perPage,
        totalRecords: total,
      },
    };
  },

  fetch(method, path, body) {
    const finalQuery = {
      ...mapValues(snake(URI.parseQuery(path.split('?')[1])), snakeCase),
      locale: this.locale,
    };
    const finalURL = URI(`${config.api.url}${path}`)
      .addQuery(finalQuery)
      .toString();
    const finalBody = body && snake(body);

    const fetchOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token && `Bearer ${this.token}`,
      },
      body: finalBody && JSON.stringify(finalBody),
    };

    return window.fetch(finalURL, fetchOptions).then(this.handleResponse);
  },

  get(path) {
    return this.fetch('GET', path);
  },

  post(path, body) {
    return this.fetch('POST', path, body);
  },

  put(path, body) {
    return this.fetch('PUT', path, body);
  },

  delete(path) {
    return this.fetch('DELETE', path);
  },
};
