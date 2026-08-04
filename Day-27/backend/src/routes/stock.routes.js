const express = require("express");

const router = express.Router();

const stockController = require("../controllers/stock.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createStockValidator,
  updateStockValidator,
} = require("../validators/stock.validator");

const ROLES = require("../constants/roles");

// Get all stocks (Logged-in users)
router.get("/", authenticate, stockController.getStocks);

// Create Stock (Admin)
router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  createStockValidator,
  validate,
  stockController.createStock
);

// Update Stock (Admin)
router.put(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  updateStockValidator,
  validate,
  stockController.updateStock
);

// Delete Stock (Admin)
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  stockController.deleteStock
);

module.exports = router;