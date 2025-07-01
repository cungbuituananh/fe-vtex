import type { AxiosInstance } from "axios";

export const setupInterceptorsRequest = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      // Add any request interceptors here
      const { headers } = config;

      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      // Handle request errors
      return Promise.reject(error);
    }
  );
};

export const setupInterceptorsResponse = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      // Add any response interceptors here
      return response;
    },
    (error) => {
      // Handle response errors
      return Promise.reject(error);
    }
  );
};
