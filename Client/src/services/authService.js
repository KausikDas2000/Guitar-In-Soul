import api from "./api";

export const registerUser = (userData) => {
  return api.post("/auth/register", userData);
};

export const loginUser = (userData) => {
  return api.post("/auth/login", userData);
};

export const getCurrentUser = () => {
  return api.get("/auth/me");
};

export const updateProfile = (data) => {
  return api.put("/auth/profile", data);
};

export const changePassword = (data) => {
  return api.put("/auth/change-password", data);
};


