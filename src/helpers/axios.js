import axios from "axios";
export const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  async config => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("agroioToken")}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
   return Promise.reject(error);
  }
);
