const Stock = require("../models/Stock");
const User = require("../models/User");
const Watchlist = require("../models/Watchlist");

const getDashboard = async () => {
  const totalStocks = await Stock.countDocuments();

  const totalUsers = await User.countDocuments();

  const totalWatchlist = await Watchlist.countDocuments();

  const marketCap = await Stock.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: "$marketCap",
        },
      },
    },
  ]);

  const sectors = await Stock.aggregate([
    {
      $group: {
        _id: "$sector",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        sector: "$_id",
        count: 1,
      },
    },
  ]);

  const topStocks = await Stock.find()
    .sort({
      currentPrice: -1,
    })
    .limit(5);

  const recentStocks = await Stock.find()
    .sort({
      createdAt: -1,
    })
    .limit(50);

  return {
    stats: {
      totalStocks,
      totalUsers,
      totalWatchlist,
      marketCap: marketCap[0]?.total || 0,
    },

    sectors,

    topStocks,

    recentStocks,
  };
};

module.exports = {
  getDashboard,
};