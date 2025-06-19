import { apiClient } from '../config/axios.config';

// Định nghĩa các kiểu dữ liệu cho API demo
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}


export class AuthService {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    // API demo trả về dữ liệu trực tiếp trong response.data
    return response.data;
  }

  static async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get<UserProfile>('/auth/profile');
    return response.data;
  }
}

export class ProductService {
  static async getProducts(page: number = 1, limit: number = 10): Promise<Product[]> {
    const offset = (page - 1) * limit;
    const response = await apiClient.get<Product[]>('/products', {
      params: { offset, limit }
    });
    return response.data;
  }
}