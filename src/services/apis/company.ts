import axiosInstance from "../axiosConfig";

interface CompanyBranch {
  branchName: string;
  address: string;
  isHeadOffice: boolean;
  longitude: string;
  latitude: string;
}

interface CompanyFile {
  fileName: string;
  fileType: string;
  base64: string;
  mediaTypeEnum: "LOGO" | "IMAGE" | "PROFILE";
}

interface CreateCompanyParams {
  name: string;
  shortName: string;
  taxCode: string;
  website: string;
  email: string;
  emailOwner: string;
  phoneNumber: string;
  companyBranchDtoList: CompanyBranch[];
  introduction: string;
  urlVideo: string;
  manufacturingSector: string;
  productionModels: string;
  keyProducts: string;
  manufacturingMarket: string;
  annualCapacity: string;
  numberOfEmployees: number;
  productionScale: string;
  exportBrand: string;
  companyCertification: string;
  fileDtoList: CompanyFile[];
}

const createCompanyAPI = async (company: any) => {
  return await axiosInstance.post(`/company/create`, company);
};

const getListCompanyAPI = async (params: any) => {
  return await axiosInstance.get(`/company/list`, { params });
};

const updateCompanyAPI = async (params: CreateCompanyParams) => {
  return await axiosInstance.post(`/company/update`, params);
};

const deleteCompanyAPI = async (taxCode: string) => {
  return await axiosInstance.delete(`/company/delete/${taxCode}`);
};

export {
  createCompanyAPI,
  getListCompanyAPI,
  updateCompanyAPI,
  deleteCompanyAPI,
};
