export interface ApiResponse<T = any> {
    data: T;
    message: string;
    status: number;
    success: boolean;
  }
  
  export interface ApiError {
    message: string;
    status: number;
    code?: string;
    errors?: Record<string, string[]>;
  }
  
  export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
  }