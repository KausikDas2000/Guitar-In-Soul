import api from "./api";

// Get all notifications
export const getNotifications = async () => {
  const { data } = await api.get("/notifications");
  return data;
};

// Get one notification
export const getNotificationById = async (id) => {
  const { data } = await api.get(`/notifications/${id}`);
  return data;
};

// Delete notification
export const deleteNotification = async (id) => {
  const { data } = await api.delete(`/notifications/${id}`);
  return data;
};

// Clear all notifications
export const clearNotifications = async () => {
  const { data } = await api.delete("/notifications");
  return data;
};

export const markNotificationAsRead = async (id) => {
  const { data } = await api.put(`/notifications/${id}/read`);
  return data;
};

export const markAllNotificationsAsRead = async () => {
  const { data } = await api.put("/notifications/read-all");
  return data;
};