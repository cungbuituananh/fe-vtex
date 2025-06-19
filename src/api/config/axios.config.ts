// src/api/config/axios.config.ts
import axios from 'axios';
import type { AxiosResponse, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosError } from 'axios';

import type { ApiResponse, ApiError, AuthTokens } from '../types/api.types';
  
  // Thêm thuộc tính _retry vào interface của Axios để TypeScript không báo lỗi
  declare module 'axios' {
    export interface InternalAxiosRequestConfig {
      _retry?: boolean;
    }
  }
  
  class ApiClient {
    private axiosInstance: AxiosInstance;
    private baseURL: string;
    private timeout: number;
  
    // Sử dụng một API public có chức năng auth để demo: Platzi Fake Store API
    constructor(baseURL: string = 'https://api.escuelajs.co/api/v1', timeout: number = 10000) {
      this.baseURL = baseURL;
      this.timeout = timeout;
      this.axiosInstance = this.createAxiosInstance();
      this.setupInterceptors();
    }
  
    private createAxiosInstance(): AxiosInstance {
      return axios.create({
        baseURL: this.baseURL,
        timeout: this.timeout,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
    }
  
    private setupInterceptors(): void {
      // Request Interceptor
      this.axiosInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          const token = this.getAccessToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
  
          if (process.env.NODE_ENV === 'development') {
            console.log(`🚀 [${config.method?.toUpperCase()}] ${config.url}`, {
              params: config.params,
              data: config.data,
            });
          }
          return config;
        },
        (error: AxiosError) => {
          console.error('❌ Request Error:', error);
          return Promise.reject(error);
        }
      );
  
      // Response Interceptor
      this.axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
          if (process.env.NODE_ENV === 'development') {
            console.log(`✅ [${response.status}] ${response.config.url}`, response.data);
          }
          // Trả về response trực tiếp vì API demo không có cấu trúc ApiResponse của bạn
          return response;
        },
        async (error: AxiosError<ApiError>) => {
          const originalRequest = error.config;
  
          if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;
  
            try {
              const newAccessToken = await this.refreshAccessToken();
              if (newAccessToken) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return this.axiosInstance(originalRequest);
              }
            } catch (refreshError) {
              this.handleAuthError();
              return Promise.reject(refreshError);
            }
          }
  
          this.handleApiError(error);
          return Promise.reject(error);
        }
      );
    }
  
    private getAccessToken(): string | null {
      return localStorage.getItem('accessToken');
    }
  
    private getRefreshToken(): string | null {
      return localStorage.getItem('refreshToken');
    }
  
    private async refreshAccessToken(): Promise<string | null> {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
  
      try {
        // API demo này dùng endpoint /auth/refresh-token
        const response = await axios.post<{ access_token: string }>(`${this.baseURL}/auth/refresh-token`, {
          refreshToken,
        });
  
        const { access_token } = response.data;
        localStorage.setItem('accessToken', access_token);
        return access_token;
      } catch (error) {
        console.error('❌ Token refresh failed:', error);
        this.handleAuthError();
        return null;
      }
    }
  
    private handleAuthError(): void {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
  
    private handleApiError(error: AxiosError<ApiError>): void {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;
      console.error(`❌ API Error [${status}]:`, message, error.response?.data);
    }
  
    public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
      return this.axiosInstance.get(url, config);
    }
  
    public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
      return this.axiosInstance.post(url, data, config);
    }
  }
  
  export const apiClient = new ApiClient();