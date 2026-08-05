import api from "./axios";

export const getStocks = async ({ pageParam = 1, search = "" }) => {
  const response = await api.get("/stocks", {
    params: {
      page: pageParam,
      limit: 10,
      search,
    },
  });

  return {
    stocks: response.data.data.stocks,
    page: response.data.data.page,
    limit: response.data.data.limit,
    total: response.data.data.total,
    hasMore: response.data.data.hasMore,
  };
};

export const createStock = async (data) => {
  const response = await api.post("/stocks", data);

  return response.data;
};

export const updateStock = async ({ id, data }) => {
  const response = await api.put(`/stocks/${id}`, data);

  return response.data;
};

export const deleteStock = async (id) => {
  const response = await api.delete(`/stocks/${id}`);

  return response.data;
};