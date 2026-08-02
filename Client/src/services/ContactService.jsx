import API from "../api/axios";

export const sendMessage = async (form) => {
  const res = await API.post("/contact", form);

  return res.data;
};