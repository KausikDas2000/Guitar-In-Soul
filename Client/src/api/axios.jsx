import axios from "axios";

const API = axios.create({
  baseURL: "https://guitar-in-soul.onrender.com/api",
});

// ✅ Attach JWT to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("STATUS:", error.response?.status);
    console.log("BACKEND MESSAGE:", error.response?.data);

    return Promise.reject(error);
  }
);

export default API;