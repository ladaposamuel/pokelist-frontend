import axios from "axios";

const baseURL = "http://localhost:3000/api";

export const apiClient = {
  get: (url: string) => axios.get(`${baseURL}/${url}`).then((res) => res.data),
  post: (url: string, data: any) =>
    axios.post(`${baseURL}/${url}`, data).then((res) => res.data),
  put: (url: string, data: any) =>
    axios.put(`${baseURL}/${url}`, data).then((res) => res.data),
  delete: (url: string) =>
    axios.delete(`${baseURL}/${url}`).then((res) => res.data),
};
