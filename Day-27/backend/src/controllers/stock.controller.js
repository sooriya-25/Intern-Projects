const stockService = require("../services/stock.service");

const createStock = async (req, res, next) => {
  try {
    const stock = await stockService.createStock(req.body);

    res.status(201).json({
      success: true,
      message: "Stock created successfully",
      data: stock,
    });
  } catch (error) {
    next(error);
  }
};

const getStocks = async (req, res, next) => {
  try {
    const result = await stockService.getStocks(req.query);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateStock = async (req, res, next) => {
  try {
    const stock = await stockService.updateStock(req.params.id, req.body);

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      data: stock,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStock = async (req, res, next) => {
  try {
    const stock = await stockService.deleteStock(req.params.id);

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Stock deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStock,
  getStocks,
  updateStock,
  deleteStock,
};