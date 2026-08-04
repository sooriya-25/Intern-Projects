const { body } = require("express-validator");

const addToWatchlistValidator = [
  body("stockId")
    .notEmpty()
    .withMessage("Stock ID is required"),
];

module.exports = {
  addToWatchlistValidator,
};