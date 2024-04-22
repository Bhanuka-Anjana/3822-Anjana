import axios from "axios";
import { toast } from "react-toastify";

const HTTP = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 5000,
});

// Add a request interceptor
HTTP.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Add a response interceptor
HTTP.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      toast.success(response.data?.message);
      return response;
    }
    return response;
  },
  (error) => {
    toast.error(error.response.data?.message);
    return Promise.reject(error);
  }
);

export default HTTP;
