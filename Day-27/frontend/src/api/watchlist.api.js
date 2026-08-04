import api from "./axios";

export const getWatchlist = async () => {
  const response = await api.get("/watchlist");

  return response.data.data;
};

export const addToWatchlist = async (stockId) => {
  const response = await api.post("/watchlist", {
    stockId,
  });

  return response.data;
};

export const removeFromWatchlist = async (stockId) => {
  const response = await api.delete(`/watchlist/${stockId}`);

  return response.data;
};