// https://unsplash.com/documentation#search-photos
// https://www.npmjs.com/package/tui-pagination

import axios from 'axios';

export class UnsplashAPI {
  #BASE_URL = 'https://api.unsplash.com';
  #API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';
  #query = '';

  constructor(perPage = 12) {
    this.per_page = perPage;
  }

  getPopularPhotos(page) {
    return axios.get(`${this.#BASE_URL}/search/photos`, {
      params: {
        query: 'random',
        page,
        per_page: this.per_page,
        client_id: this.#API_KEY,
      },
    });
  }

  getPhotosByQuery(page) {
    return axios.get(`${this.#BASE_URL}/search/photos`, {
      params: {
        query: this.#query,
        page,
        per_page: this.per_page,
        client_id: this.#API_KEY,
      },
    });
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }
}
