import axiosInstance from "../axiosConfig";

const getListGroupPublicAPI = async (type: string) => {
  return await axiosInstance.get(`public/category/list?groupCategory=${type}`);
};

const getDetailCompanyPublicAPI = async (id: string) => {
  return await axiosInstance.get(`public/detail/${id}`);
};

export { getListGroupPublicAPI, getDetailCompanyPublicAPI };
