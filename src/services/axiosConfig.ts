import axios from "axios";
import {
  setupInterceptorsRequest,
  setupInterceptorsResponse,
} from "./interceptors";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

setupInterceptorsRequest(axiosInstance);
setupInterceptorsResponse(axiosInstance);

export default axiosInstance;
