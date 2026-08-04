import api from "./api";

export const getAllSongs = async () => {
  const response = await api.get("/arrangements");
  return response.data;
};

export const getSong = async (id) => {
  let visitorId = localStorage.getItem("visitorId");

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("visitorId", visitorId);
  }


  const res = await api.get(
    `/arrangements/${id}`,
    {
      headers: {
        visitorid: visitorId
      }
    }
  );


  return res.data;
};



export const uploadSong = (formData) =>
  api.post("/arrangements", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteSong = async (id) => {
  const res = await api.delete(`/arrangements/${id}`);

  return res.data;
};

export const updateSong = (id, formData) =>
  api.put(`/arrangements/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


  export const toggleLike = async (id) => {
  const token = localStorage.getItem("token");

  const { data } = await api.put(
    `/arrangements/${id}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};




// Add / Remove Favorite
export const favoriteSong = async (songId) => {
  const { data } = await api.post(`/favorites/${songId}`);
  return data;
};

// Get My Favorites
export const getFavorites = async () => {
  const { data } = await api.get("/favorites");
  return data;
};

// Remove Favorite
export const removeFavorite = async (songId) => {
  const { data } = await api.delete(`/favorites/${songId}`);
  return data;
};


export const incrementDownload = async (id) => {
  const { data } = await api.put(`/arrangements/${id}/download`);

  return data;
};