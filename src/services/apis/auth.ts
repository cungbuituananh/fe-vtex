import axiosInstance from "../axiosConfig";

export const loginAPI = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return await axiosInstance.post(`/auth/login`, {
    username,
    password,
  });
};

export const registerAPI = async (params: {
  username: string;
  email: string;
  password: string;
}) => {
  return await axiosInstance.post(`/auth/register`, params);
};

export const refreshTokenAPI = async (refreshToken: string) => {
  return await axiosInstance.post(`/auth/refresh-token`, { refreshToken });
};

export const logoutAPI = async () => {
  return await axiosInstance.post(`/auth/logout`);
};

export const getUserInfoAPI = async () => {
  return await axiosInstance.get(`/auth/user-info`);
};

export const updateUserInfoAPI = async (params: {
  username?: string;
  email?: string;
  password?: string;
}) => {
  return await axiosInstance.post(`/user/user-info`, params);
};
