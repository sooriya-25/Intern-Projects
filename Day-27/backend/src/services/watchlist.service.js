const Watchlist = require("../models/Watchlist");
const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");

const addToWatchlist = async (userId, stockId) => {
  const existing = await Watchlist.findOne({
    user: userId,
    stock: stockId,
  });

  if (existing) {
    throw new AppError("Stock already exists in watchlist", HTTP_STATUS.CONFLICT);
  }

  return await Watchlist.create({
    user: userId,
    stock: stockId,
  });
};

const getWatchlist = async (userId) => {
  const watchlist = await Watchlist.find({
    user: userId,
  }).populate("stock");

  return watchlist.filter((item) => item?.stock);
};

const removeFromWatchlist = async (userId, stockId) => {
  return await Watchlist.findOneAndDelete({
    user: userId,
    stock: stockId,
  });
};

module.exports = {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
};