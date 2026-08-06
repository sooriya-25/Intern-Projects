const mongoose = require("mongoose");

const MODULES = require("../constants/modules");

const permissionSchema = new mongoose.Schema(
  {
    module: {
      type: String,
      enum: Object.values(MODULES),
      required: true,
    },

    view: {
      type: Boolean,
      default: false,
    },

    add: {
      type: Boolean,
      default: false,
    },

    edit: {
      type: Boolean,
      default: false,
    },

    delete: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    isSystem: {
      type: Boolean,
      default: false,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },

    permissions: {
      type: [permissionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Role", roleSchema);
