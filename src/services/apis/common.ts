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

export {
  getListMajorAPI,
  getListGroupAPI,
  getListProvinceAPI,
  getListCompanyPublicAPI,
};
