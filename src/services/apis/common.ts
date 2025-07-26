import axiosInstance from "../axiosConfig";

const getListMajorAPI = async () => {
  return await axiosInstance.get(`category/list?groupCategory=MARJOR`);
};

const getListGroupAPI = async (type: string) => {
  return await axiosInstance.get(`category/list?groupCategory=${type}`);
};

const getListProvinceAPI = async () => {
  return await axiosInstance.get(`province/list`);
};

const getListCompanyPublicAPI = async (params: any) => {
  return await axiosInstance.get(`public/company/list`, { params });
};

const getListUserAPI = async () => {
  return await axiosInstance.get(`user/list`);
};

export {
  getListMajorAPI,
  getListGroupAPI,
  getListProvinceAPI,
  getListCompanyPublicAPI,
  getListUserAPI,
};
