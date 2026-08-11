const mongoose = require("mongoose");

const SUBSCRIBER_STATUS = ["SUBSCRIBED", "UNSUBSCRIBED"];

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    status: {
      type: String,
      enum: SUBSCRIBER_STATUS,
      default: "SUBSCRIBED",
    },

    source: {
      type: String,
      trim: true,
      default: "LANDING_PAGE",
    },

    // Set once the confirmation / welcome email has actually been
    // sent out (SMTP integration to be wired up later).
    emailSentAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subscriber", subscriberSchema);
module.exports.SUBSCRIBER_STATUS = SUBSCRIBER_STATUS;
