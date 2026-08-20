const mongoose = require("mongoose");

const STATUS = require("../constants/status");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      trim: true,
      default: null,
    },

    address: {
      type: String,
      trim: true,
      default: null,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    profileImage: {
      type: String,
      default: null,
    },
    
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.ACTIVE,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    // Soft delete: the user's own record is kept (audit trail, referenced
    // documents like Todos/Watchlist stay valid) but the account can no
    // longer log in or authenticate. Deliberately separate from `status`
    // (ACTIVE/INACTIVE), which is an admin-controlled enable/disable
    // toggle — deletion is user-initiated and one-way.
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
