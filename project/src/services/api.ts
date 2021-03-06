import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

const ErrorStatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const isDisplayError = ( response: AxiosResponse ) => ErrorStatusCodeMapping[response.status];


export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(( config: AxiosRequestConfig ) => {
    const token = getToken();

    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    ( response ) => response,
    ( error: AxiosError ) => {
      if (error.response && isDisplayError(error.response)) {
        toast.error(error.response.data.error);
      }
      throw error;
    }
  );

  return api;
};
