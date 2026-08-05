const Stock = require("../models/Stock");
const getPagination = require("../utils/pagination");

const createStock = async (stockData) => {
  return await Stock.create(stockData);
};

const getStocks = async ({
  page = 1,
  limit = 10,
  search = "",
  sort = "company",
  order = "asc",
} = {}) => {
  const query = {};

  if (search) {
    query.$text = {
      $search: search,
    };
  }

  const { page: parsedPage, limit: parsedLimit, skip } = getPagination(
    page,
    limit
  );

  const stocks = await Stock.find(query)
    .sort({
      [sort]: order === "asc" ? 1 : -1,
    })
    .skip(skip)
    .limit(parsedLimit);

  const total = await Stock.countDocuments(query);

  return {
    stocks,
    page: parsedPage,
    limit: parsedLimit,
    total,
    hasMore: parsedPage * parsedLimit < total,
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