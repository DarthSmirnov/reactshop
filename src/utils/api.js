import { setup } from 'axios-cache-adapter';

// Create `axios` instance passing the newly created `cache.adapter`
const axios = setup({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  cache: {
    maxAge: 15 * 60 * 1000,
    exclude: { query: false },
    clearOnStale: true,
    clearOnError: true,
    async invalidate(config, request) {
      if (request.clearCacheEntry) {
        await config.store.removeItem(config.uuid);
      }
    },
  },
});

export default {
  async clear(item = null) {
    let cache = await axios.cache.store;
    if (item) {
      delete cache[item];
    } else {
      Object.keys(cache).forEach((key) => {
        delete cache[key];
      });
    }
  },
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  delete(url, additional = null) {
    return axios.delete(url, JSON.stringify(additional), {
      headers: this.headers,
    });
  },
  post(url, additional = null) {
    return axios.post(url, JSON.stringify(additional), {
      headers: this.headers,
    });
  },
  get(url, additional = null, clearCacheEntry = false) {
    let params = {
      headers: this.headers,
      clearCacheEntry,
    };
    if (additional) Object.assign(params, { params: additional });
    return axios.get(url, params).then(async (response) => {
      // Do something awesome with response.data \o/
      // console.log('Request response:', response);
      // Interacting with the store, see `localForage` API.
      // const length = await api.cache.length();
      // console.log('Cache store length:', length);

      // Response.
      return response;
    });
  },
};
