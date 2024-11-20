import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api",
  headers: { 
     "Content-Type": "application/json",  
     'Accept': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Cookie = `token=${token}`; 
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);