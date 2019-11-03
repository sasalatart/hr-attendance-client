import URI from 'urijs';
import keymirror from 'keymirror';
import humps from 'lodash-humps';
import config from '../config';
import { availableLocales } from '../locales';

const methods = keymirror({
  GET: null,
  POST: null,
  PUT: null,
  PATCH: null,
  DELETE: null,
});

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

  fetchOptions(method, { body, options }) {
    const finalOptions = { ...options, method };

    if (this.token) {
      finalOptions.headers = { Authorization: `Bearer ${this.token}` };
    }

    if (body) {
      finalOptions.body = JSON.stringify(body);
      finalOptions.headers = {
        ...finalOptions.headers,
        'Content-Type': 'application/json',
      };
    }

    return finalOptions;
  },

  async handleResponse(res) {
    const { headers } = res;
    const body = humps(res.status === 204 ? {} : await res.json());

    // eslint-disable-next-line prefer-promise-reject-errors
    if (!res.ok) return Promise.reject({ ...body, httpStatus: res.status });

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

  fetch(method, path, { body, options }) {
    const url = URI(`${config.api.url}${path}`)
      .addQuery({ locale: this.locale })
      .toString();
    return window
      .fetch(url, this.fetchOptions(method, { body, options }))
      .then(this.handleResponse);
  },

  get(path, options) {
    return this.fetch(methods.GET, path, { options });
  },

  post(path, body, options) {
    return this.fetch(methods.POST, path, { body, options });
  },

  put(path, body, options) {
    return this.fetch(methods.PUT, path, { body, options });
  },

  patch(path, body, options) {
    return this.fetch(methods.PATCH, path, { body, options });
  },

  delete(path, options) {
    return this.fetch(methods.DELETE, path, { options });
  },
};
