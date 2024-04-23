import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

export const API_BASE_URL = 'https://board-service.onrender.com';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // TODO: Add refresh token

    }
    return Promise.reject(error);
  }
);

export const axiosRequest = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await axiosInstance.request<T>(config);
    return response.data;
  } catch (error) {
    throw new Error('Failed to make API request');
  }
};

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  return axiosRequest<T>({ ...config, method: 'GET', url });
};

export const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  return axiosRequest<T>({ ...config, method: 'POST', url, data });
};

export const put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  return axiosRequest<T>({ ...config, method: 'PUT', url, data });
};
