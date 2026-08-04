const express = require("express");

const router = express.Router();

const watchlistController = require("../controllers/watchlist.controller");

const authenticate = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  addToWatchlistValidator,
} = require("../validators/watchlist.validator");

router.get(
  "/",
  authenticate,
  watchlistController.getWatchlist
);

router.post(
  "/",
  authenticate,
  addToWatchlistValidator,
  validate,
  watchlistController.addToWatchlist
);

router.delete(
  "/:stockId",
  authenticate,
  watchlistController.removeFromWatchlist
);

module.exports = router;