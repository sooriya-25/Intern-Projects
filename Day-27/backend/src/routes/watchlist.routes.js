const express = require("express");

const router = express.Router();

const watchlistController = require("../controllers/watchlist.controller");

const authenticate = require("../middlewares/auth.middleware");
const checkPermission = require("../middlewares/checkPermission.middleware");

// Request body validation is handled globally by express-openapi-validator
// (see app.js + src/openapi/modules/watchlist.yaml).

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
  watchlistController.addToWatchlist
);

router.delete(
  "/:stockId",
  authenticate,
  checkPermission(MODULES.WATCHLIST, ACTIONS.DELETE),
  watchlistController.removeFromWatchlist
);

module.exports = router;
