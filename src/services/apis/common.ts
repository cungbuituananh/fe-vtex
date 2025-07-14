import axiosInstance from "../axiosConfig";

const getListMajorAPI = async () => {
  return await axiosInstance.get(`category/list?groupCategory=MARJOR`);
};

const getListGroupAPI = async (type: string) => {
  return await axiosInstance.get(`category/list?groupCategory=${type}`);
};

export { getListMajorAPI, getListGroupAPI };
