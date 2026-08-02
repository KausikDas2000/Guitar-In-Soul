import api from "./api";

// Create Song Request
export const createRequest = async (formData) => {
  const res = await api.post("/requests", formData);
  return res.data;
};

// Get All Requests
export const getRequests = async () => {
  const res = await api.get("/requests");
  return res.data;
};

// Get Single Request
export const getRequest = async (id) => {
  const res = await api.get(`/requests/${id}`);
  return res.data;
};

// Vote / Unvote
export const voteRequest = async (id) => {
  const res = await api.put(`/requests/vote/${id}`);
  return res.data;
};

// Admin - Update Status
export const updateRequestStatus = async (id, status) => {
  const res = await api.put(`/requests/admin/${id}`, {
    status,
  });

  return res.data;
};

// Admin - Delete Request
export const deleteRequest = async (id) => {
  const res = await api.delete(`/requests/admin/${id}`);
  return res.data;
};