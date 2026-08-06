const express = require("express");

const router = express.Router();

const stockController = require("../controllers/stock.controller");

const authenticate = require("../middlewares/auth.middleware");
const checkPermission = require("../middlewares/checkPermission.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createStockValidator,
  updateStockValidator,
} = require("../validators/stock.validator");

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
  createStockValidator,
  validate,
  stockController.createStock
);

// Update Stock
router.put(
  "/:id",
  authenticate,
  checkPermission(MODULES.STOCKS, ACTIONS.EDIT),
  updateStockValidator,
  validate,
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
