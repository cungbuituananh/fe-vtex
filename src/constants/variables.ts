import { t } from "i18next";

export const LOCAL_STORAGE_KEY = {
  ACCESS_TOKEN: "access_token",
  EXPIRE_TIME: "expire_time",
  LAST_EXPIRE_TIME: "last_expire_time",
  REFRESH_TOKEN: "refresh_token",
  USER_INFO: "user_info",
};

export const ROLE_USER = {
  ADMIN: "admin",
  COMPANY: "company",
  USER: "user",
};

export const SIZE_OPTIONS = [
  { label: "Siêu nhỏ", value: "micro" },
  { label: "Nhỏ", value: "small" },
  { label: "Vừa", value: "medium" },
  { label: "Lớn", value: "large" },
];
export const FIELD_OPTIONS = [
  { label: "May mặc", value: "garment" },
  { label: "Dệt", value: "textile" },
  { label: "Phụ trợ", value: "supporting" },
];
export const PRODUCT_OPTIONS = [
  { label: "Áo sơ mi", value: "shirt" },
  { label: "Quần jeans", value: "jeans" },
  { label: "Vải cotton", value: "cotton" },
];
export const CERTIFICATE_OPTIONS = [
  { label: "ISO 9001", value: "iso9001" },
  { label: "WRAP", value: "wrap" },
  { label: "BSCI", value: "bsci" },
];
export const MARKET_OPTIONS = [
  { label: "Việt Nam", value: "vietnam" },
  { label: "Mỹ", value: "usa" },
  { label: "Châu Âu", value: "europe" },
  { label: "Nhật Bản", value: "japan" },
];
export const HEIGHT_INPUT = "40px";

export const WORKING_STATUS = {
  1: "Active",
  2: "Inactive",
};

export const WORKING_STATUS_OPTIONS = [
  { label: "Đang hoạt động", value: 2 },
  { label: "Ngừng hoạt động", value: 1 },
];

export const DEFAULT_PAGINATION = {
  pageSize: 10,
  page: 0,
};
