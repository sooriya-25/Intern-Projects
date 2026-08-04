const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    symbol: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    sector: {
      type: String,
      required: true,
      trim: true,
    },

    exchange: {
      type: String,
      required: true,
      trim: true,
    },

    currency: {
      type: String,
      default: "USD",
    },

    currentPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    marketCap: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

stockSchema.index({
  company: "text",
  symbol: "text",
});

module.exports = mongoose.model("Stock", stockSchema);