import axios from 'axios';
import { LS_KEY_SB_JWT } from './const';

/**
 * Generic wrapper for axios only.
 * For frequently used request, put in api-helper.js.
 */
class API {
  /**
   * Set token for default API calls (to REACT_APP_API).
   */
  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  clearAccessToken() {
    delete this.accessToken;
  }

  request = (config) => {
    const { method = 'GET', url, params, headers, baseURL = process.env.REACT_APP_API, getTotal } = config;

    // console.log('API.token:', this.accessToken);
    // console.log('API.Request:', `${baseURL}${url}`, params, method);

    const token = localStorage.getItem(LS_KEY_SB_JWT);

    let newHeaders = { 'Content-Type': 'application/json' };
    if (this.accessToken || token) {
      newHeaders.Authorization = `Bearer ${this.accessToken || token}`;
    }
    if (headers) {
      newHeaders = { ...newHeaders, ...headers };
    }

    const requestConfig = {
      method,
      url,
      baseURL,
      headers: newHeaders,
      timeout: 20000, //timeout error message 20s.
      timeoutErrorMessage: 'Quá thời gian chờ dịch vụ'
    };

    if (params) {
      if (typeof method === 'string' && method.toLowerCase().trim() === 'get') {
        requestConfig.params = params;
      } else {
        requestConfig.data = params;
      }
    }

    return axios(requestConfig)
      .then((response) => {
        // console.log('API.Response:', response);

        const { data, status, error } = response;

        if (status !== 200 && status !== 201 && status !== 202) {
          throw Error(error);
        }
        if (getTotal) {
          return data;
        }
        return data?.data;
      })
      .catch((error) => Promise.reject(error?.response?.data || error));
  };

  upload = async (config) => {
    const { file } = config;
    if (!file) {
      return Promise.resolve(null);
    }

    const token = localStorage.getItem(LS_KEY_SB_JWT);

    let newHeaders = {
      'content-type': 'multipart/form-data'
    };

    if (this.accessToken || token) {
      newHeaders.Authorization = `Bearer ${this.accessToken || token}`;
    }

    const formData = new FormData();
    formData.append('file', file);

    const requestConfig = {
      method: 'POST',
      url: '/upload',
      baseURL: process.env.REACT_APP_API,
      headers: newHeaders,
      timeout: 20000, //timeout error message 20s.
      timeoutErrorMessage: 'Quá thời gian chờ dịch vụ',
      data: formData
    };

    try {
      const response = await axios(requestConfig);
      const { data, status, error } = response;
      if (status !== 200 && status !== 201 && status !== 202) {
        throw Error(error);
      }
      return data?.data;
    } catch (error) {
      throw error?.response?.data || error;
    }
  };
}

export default new API();
