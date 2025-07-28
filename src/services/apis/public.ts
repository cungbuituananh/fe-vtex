import axiosInstance from "../axiosConfig";

const getListGroupPublicAPI = async (type: string) => {
  return await axiosInstance.get(`public/category/list?groupCategory=${type}`);
};

export { getListGroupPublicAPI };
