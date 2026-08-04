const { body } = require("express-validator");

const createStockValidator = [
  body("company")
    .trim()
    .notEmpty()
    .withMessage("Company is required"),

  body("symbol")
    .trim()
    .notEmpty()
    .withMessage("Symbol is required"),

  body("description")
    .optional()
    .trim(),

  body("sector")
    .trim()
    .notEmpty()
    .withMessage("Sector is required"),

  body("exchange")
    .trim()
    .notEmpty()
    .withMessage("Exchange is required"),

  body("currency")
    .optional()
    .trim(),

  body("currentPrice")
    .isFloat({ min: 0 })
    .withMessage("Current price must be greater than 0"),

  body("marketCap")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Market cap must be greater than or equal to 0"),
];

const updateStockValidator = [
  body("company").optional().trim(),

  body("symbol").optional().trim(),

  body("description").optional().trim(),

  body("sector").optional().trim(),

  body("exchange").optional().trim(),

  body("currency").optional().trim(),

  body("currentPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Current price must be greater than 0"),

  body("marketCap")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Market cap must be greater than or equal to 0"),
];

module.exports = {
  createStockValidator,
  updateStockValidator,
};