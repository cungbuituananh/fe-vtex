import axiosInstance from "../axiosConfig";

const getListUserMailAPI = async () => {
  return await axiosInstance.get(`/user/list`);
};

export { getListUserMailAPI };
