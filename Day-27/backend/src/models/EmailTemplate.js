const mongoose = require("mongoose");

const emailTemplateSchema = new mongoose.Schema(
  {
    // Unique lookup key used in code, e.g. "SUBSCRIPTION_WELCOME"
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    // Human-readable name, shown if you ever build an admin UI for these
    name: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    // Plain-text fallback for email clients that block HTML
    text: {
      type: String,
      required: true,
    },

    // Full HTML body. Supports {{variable}} placeholders which get
    // substituted at send time (see utils/renderTemplate.js)
    html: {
      type: String,
      required: true,
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

module.exports = mongoose.model("EmailTemplate", emailTemplateSchema);
