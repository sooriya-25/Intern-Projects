const mongoose = require("mongoose");

const STATUS = require("../constants/status");

// One entry per logged-in device/browser. `sessionId` mirrors the `sid`
// claim embedded in that login's JWT — auth.middleware looks it up here
// on every request (piggy-backing on the User lookup it already does, so
// this adds no extra query) to know whether the token has been revoked
// (e.g. via "log out this device") before its natural expiry.
const sessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },
    browserName: {
      type: String,
      default: "Unknown browser",
    },
    deviceName: {
      type: String,
      default: "Unknown device",
    },
    userAgent: {
      type: String,
      default: null,
    },
    ip: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastActiveAt: {
      type: Date,
      default: Date.now,
    },
    // Mirrors the JWT's own expiry, so an expired-but-not-yet-revoked
    // session is never treated as valid, and stale entries can be pruned
    // on read/login without needing a separate TTL sweep.
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { _id: false }
);

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

    sessions: {
      type: [sessionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
