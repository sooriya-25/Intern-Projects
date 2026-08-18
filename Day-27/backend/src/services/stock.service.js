const Stock = require("../models/Stock");
const getPagination = require("../utils/pagination");
const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");

const createStock = async (stockData) => {
  try {
    const symbol = stockData?.symbol?.trim()?.toUpperCase();
    const normalizedStockData = {
      ...stockData,
      ...(symbol ? { symbol } : {}),
    };

    const existingStockSymbol = await Stock.findOne({ symbol: symbol || undefined });
    if (symbol && existingStockSymbol) {
      throw new AppError(
        "Stock with this symbol already exists",
        HTTP_STATUS.CONFLICT
      );
    }

    return await Stock.create(normalizedStockData);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      "Failed to create stock",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
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