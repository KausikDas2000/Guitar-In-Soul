import axios from "axios";

const api = axios.create({
  baseURL:  "https://guitar-in-soul.onrender.com/api",
   withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getProfileStats = async () => {
  const { data } = await api.get("/users/profile/stats");
  return data;
};

export default api;