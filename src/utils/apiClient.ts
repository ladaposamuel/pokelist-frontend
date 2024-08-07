import axios, { AxiosRequestConfig } from "axios";

const baseURL = process.env.BACKEND_URL || "http://localhost:3000/api";

export const apiClient = {
  get: (url: string, config?: AxiosRequestConfig) =>
    axios.get(`${baseURL}/${url}`, config).then((res) => res.data),

  post: (url: string, data: any, config?: AxiosRequestConfig) =>
    axios.post(`${baseURL}/${url}`, data, config).then((res) => res.data),

  
  put: (url: string, data: any, config?: AxiosRequestConfig) =>
    axios.put(`${baseURL}/${url}`, data, config).then((res) => res.data),
  delete: (url: string, config?: AxiosRequestConfig) =>
    axios.delete(`${baseURL}/${url}`, config).then((res) => res.data),
};
