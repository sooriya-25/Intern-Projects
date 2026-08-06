const express = require("express");

const router = express.Router();

const watchlistController = require("../controllers/watchlist.controller");

const authenticate = require("../middlewares/auth.middleware");
const checkPermission = require("../middlewares/checkPermission.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  addToWatchlistValidator,
} = require("../validators/watchlist.validator");

const MODULES = require("../constants/modules");
const ACTIONS = require("../constants/actions");

router.get(
  "/",
  authenticate,
  checkPermission(MODULES.WATCHLIST, ACTIONS.VIEW),
  watchlistController.getWatchlist
);

router.post(
  "/",
  authenticate,
  checkPermission(MODULES.WATCHLIST, ACTIONS.ADD),
  addToWatchlistValidator,
  validate,
  watchlistController.addToWatchlist
);

router.delete(
  "/:stockId",
  authenticate,
  checkPermission(MODULES.WATCHLIST, ACTIONS.DELETE),
  watchlistController.removeFromWatchlist
);

module.exports = router;
