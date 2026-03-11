import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000
});

export const adminApi = axios.create({
  baseURL: API_URL,
  timeout: 15000
});

adminApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("lk_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
