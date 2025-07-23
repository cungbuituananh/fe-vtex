import { message } from "antd";
import type { AxiosInstance } from "axios";
import { refreshTokenAPI } from "./apis/auth";

const user = localStorage.getItem("userData");

export const setupInterceptorsRequest = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      // Add any request interceptors here
      const { headers, url } = config;

      // Remove Authorization for Public API
      if (url && url.includes("/refresh-token")) {
        delete headers.Authorization;
      }
      const user = localStorage.getItem("userData");
      if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.accessToken) {
          headers.Authorization = `Bearer ${parsedUser.accessToken}`;
        }
      }

      return config;
    },
    (error) => {
      // Handle request errors
      return Promise.reject(error);
    }
  );
};

let isRefreshing = false;

export const setupInterceptorsResponse = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      if (response?.data?.data !== undefined) {
        return response.data;
      }
      if (response?.data?.content !== undefined) {
        return response.data.content;
      }
      return response.data;
    },
    async (error) => {
      const { status } = error;
      if (status === 401 && user) {
        // Handle token refresh logic
        if (!isRefreshing) {
          isRefreshing = true;
          const parsedUser = JSON.parse(user);
          try {
            const { data } = await refreshTokenAPI(parsedUser.refreshToken);
            // Update local storage with new tokens
            localStorage.setItem("userData", JSON.stringify(data));
            // Optionally, you can update the axios instance headers
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
          } catch (refreshError) {
            console.error("Refresh token failed:", refreshError);
            localStorage.removeItem("userData");
            window.location.href = "/login"; // Redirect to login
          } finally {
            isRefreshing = false;
          }
        }
      }
      message.error(error?.response?.data?.message || "Request failed"); // Show error message
      // Handle response errors
      return Promise.reject(error);
    }
  );
};
