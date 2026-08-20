const express = require("express");

const router = express.Router();

const stockController = require("../controllers/stock.controller");

const authenticate = require("../middlewares/auth.middleware");
const checkPermission = require("../middlewares/checkPermission.middleware");

// Request body validation is handled globally by express-openapi-validator
// (see app.js + src/openapi/modules/stock.yaml).

const MODULES = require("../constants/modules");
const ACTIONS = require("../constants/actions");

// Get all stocks (any role with view permission on STOCKS)
router.get(
  "/",
  authenticate,
  checkPermission(MODULES.STOCKS, ACTIONS.VIEW),
  stockController.getStocks
);

// Create Stock
router.post(
  "/",
  authenticate,
  checkPermission(MODULES.STOCKS, ACTIONS.ADD),
  stockController.createStock
);

// Update Stock
router.put(
  "/:id",
  authenticate,
  checkPermission(MODULES.STOCKS, ACTIONS.EDIT),
  stockController.updateStock
);

// Delete Stock
router.delete(
  "/:id",
  authenticate,
  checkPermission(MODULES.STOCKS, ACTIONS.DELETE),
  stockController.deleteStock
);

module.exports = router;
