const mongoose = require("mongoose");

const otpVerificationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    purpose: {
      type: String,
      enum: ["SIGNUP", "PASSWORD_RESET"],
      default: "SIGNUP",
    },

    otpHash: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    attempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

otpVerificationSchema.index({ email: 1, purpose: 1 }, { unique: true });

// Housekeeping: drop the document an hour after it was created, whether or
// not it was ever verified/used, so stale OTPs don't pile up.
otpVerificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

module.exports = mongoose.model("OtpVerification", otpVerificationSchema);
