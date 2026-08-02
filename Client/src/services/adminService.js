import axios from "axios";
import api from "../services/api";

const API = "https://guitar-in-soul.onrender.com/api/admin";

export const getUsers = async () => {
    const { data } = await axios.get(`${API}/users`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    return data;
};

export const getAnalytics = async () => {

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API}/analytics`,
        config
    );

    return data;

}


export const getArrangements = async () => {

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const { data } = await axios.get(
        `${API}/arrangements`,
        config
    );

    return data;
};

export const deleteArrangement = async (id) => {

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const { data } = await axios.delete(
        `${API}/arrangements/${id}`,
        config
    );

    return data;
};

export const getArrangementById = async (id) => {
  const { data } = await api.get(`/arrangements/${id}`);
  return data;
};

export const updateArrangement = async (id, formData) => {
  const { data } = await api.put(
    `/arrangements/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// services/adminService.js

export const deleteUser = async (id) => {
  const res = await api.delete(`/admin/users/${id}`);

  return res.data;
};

export const updateUserRole = async (id, role) => {
  const res = await api.put(`/admin/users/${id}/role`, {
    role,
  });

  return res.data;
};


export const getMessages = async () => {
  const res = await api.get("/contact/admin");
  return res.data;
};

export const deleteMessage = async (id) => {
  const res = await api.delete(`/contact/admin/${id}`);
  return res.data;
};
