const Watchlist = require("../models/Watchlist");

const addToWatchlist = async (userId, stockId) => {
  const existing = await Watchlist.findOne({
    user: userId,
    stock: stockId,
  });

  if (existing) {
    throw new Error("Stock already exists in watchlist");
  }

  return await Watchlist.create({
    user: userId,
    stock: stockId,
  });
};

const getWatchlist = async (userId) => {
  return await Watchlist.find({
    user: userId,
  }).populate("stock");
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