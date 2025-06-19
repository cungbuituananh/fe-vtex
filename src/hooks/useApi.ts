// src/hooks/useApi.ts
import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import type { ApiError } from '@/api/types/api.types';

export function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  // Sử dụng useCallback để tránh tạo lại hàm fetchData mỗi lần render
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      // Lấy thông tin lỗi từ response của axios hoặc tạo lỗi mặc định
      const apiError = axiosError.response?.data || { message: axiosError.message || 'An unknown error occurred', status: axiosError.status || 500 };
      setError(apiError);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiCall, ...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}