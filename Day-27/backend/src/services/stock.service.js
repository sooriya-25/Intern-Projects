const Stock = require("../models/Stock");

const createStock = async (stockData) => {
  return await Stock.create(stockData);
};

const getStocks = async ({
  page = 1,
  limit = 10,
  search = "",
  sort = "company",
  order = "asc",
}) => {
  const query = {};

  if (search) {
    query.$text = {
      $search: search,
    };
  }

  const stocks = await Stock.find(query)
    .sort({
      [sort]: order === "asc" ? 1 : -1,
    })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Stock.countDocuments(query);

  return {
    stocks,
    page: Number(page),
    limit: Number(limit),
    total,
    hasMore: page * limit < total,
  };
};

const updateStock = async (id, stockData) => {
  return await Stock.findByIdAndUpdate(id, stockData, {
    new: true,
    runValidators: true,
  });
};

const deleteStock = async (id) => {
  return await Stock.findByIdAndDelete(id);
};

module.exports = {
  createStock,
  getStocks,
  updateStock,
  deleteStock,
};