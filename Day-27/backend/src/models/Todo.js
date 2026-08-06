const mongoose = require("mongoose");

const TODO_STATUS = ["PENDING", "IN_PROGRESS", "COMPLETED"];

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: TODO_STATUS,
      default: "PENDING",
    },

    dueDate: {
      type: Date,
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
module.exports.TODO_STATUS = TODO_STATUS;
