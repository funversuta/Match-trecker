/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, Method } from 'axios';
import { useAuth } from '../../Context/AuthContext/authUtils';


const host = import.meta.env.VITE_APP_HOST || window.location.origin;

const setAuthHeaders = (options: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: 'Bearer ' + token,
    };
  }
};

const safeFetch = async (
  path: string,
  method: Method,
  data?: any,
  options: AxiosRequestConfig = {},
): Promise<any> => {
  if (!options.headers?.['Content-Type']) {
    options.headers = {
      'Content-Type': 'application/json',
    };
  }

  setAuthHeaders(options);

  try {
    const response = await axios.request({
      baseURL: host,
      url: path,
      method,
      data,
      ...options,
    });

    return response.data ?? response;
  } catch (error: any) {
    console.error(error);

    if (error.response?.status === 401) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const {refreshToken} = useAuth();
        refreshToken();
    }

    throw error;
  }
};

const apiService = {
  GET: async <T>(path: string = '', options?: AxiosRequestConfig): Promise<T> => {
    return safeFetch(`${path}`, 'get', null, options);
  },

  GETBYID: async <T>(path: string = '', options?: AxiosRequestConfig): Promise<T> => {
    return safeFetch(`/${path}`, 'get', null, options);
  },

  POST: async <T>(path: string = '', data?: any, options?: AxiosRequestConfig): Promise<T> => {
    const reqPath = path ? `/${path}` : '';
    return safeFetch(reqPath, 'post', data, options);
  },

  PUT: async <T>(path: string = '', data?: any, options?: AxiosRequestConfig): Promise<T> => {
    return safeFetch(`/${path}`, 'put', data, options);
  },

  DELETE: async <T>(path: string = '', data?: any, options?: AxiosRequestConfig): Promise<T> => {
    return safeFetch(`/${path}`, 'delete', data, options);
  },
};

export default apiService;
