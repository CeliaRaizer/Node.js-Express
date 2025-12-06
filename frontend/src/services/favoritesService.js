//src/favoritesService.js
import api from "./api";

export const favoritesService = {
  check: async (bookId) => {
    const res = await api.get(`/favorites/check/${bookId}`);
    return res.data;
  },

  add: async (bookId) => {
    const res = await api.post(`/favorites/${bookId}`);
    return res.data;
  },

  remove: async (bookId) => {
    const res = await api.delete(`/favorites/${bookId}`);
    return res.data;
  },

  list: async () => {
    const res = await api.get("/favorites");
    return res.data;
  }
};

