const watchlistService = require("../services/watchlist.service");

const addToWatchlist = async (req, res, next) => {
  try {
    const watchlist = await watchlistService.addToWatchlist(
      req.user._id,
      req.body.stockId
    );

    res.status(201).json({
      success: true,
      message: "Stock added to watchlist",
      data: watchlist,
    });
  } catch (error) {
    next(error);
  }
};

const getWatchlist = async (req, res, next) => {
  try {
    const watchlist = await watchlistService.getWatchlist(req.user._id);

    res.status(200).json({
      success: true,
      data: watchlist,
    });
  } catch (error) {
    next(error);
  }
};

const removeFromWatchlist = async (req, res, next) => {
  try {
    await watchlistService.removeFromWatchlist(
      req.user._id,
      req.params.stockId
    );

    res.status(200).json({
      success: true,
      message: "Stock removed from watchlist",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
};