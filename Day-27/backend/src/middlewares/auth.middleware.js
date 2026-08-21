const { verifyToken } = require("../utils/jwt");

const User = require("../models/User");
const HTTP_STATUS = require("../constants/httpStatus");
const AppError = require("../utils/appError");

// How often we bother persisting a session's lastActiveAt. The session's
// *validity* is still checked on every single request below (that's the
// whole point) — this only throttles the write side, so an active user
// doesn't trigger a DB write on every API call, just once every N minutes.
const LAST_ACTIVE_THROTTLE_MS = 5 * 60 * 1000;

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Access token is required", HTTP_STATUS.UNAUTHORIZED);
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    // This lookup was already required for req.user/role on every request.
    // Sessions live on the same document (see models/User.js), so
    // validating the session below costs no additional query.
    const user = await User.findById(decoded.id)
      .select("-password")
      .populate("role");

    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.UNAUTHORIZED);
    }

    if (!user.role) {
      throw new AppError("No role assigned to this user", HTTP_STATUS.FORBIDDEN);
    }

    // decoded.sid is absent on tokens issued before the Active Sessions
    // feature shipped. Let those ride out their remaining lifetime rather
    // than force every logged-in user to re-login the moment this
    // deploys — they simply won't show up in the sessions list.
    if (decoded.sid) {
      const session = (user.sessions || []).find(
        (s) => s.sessionId === decoded.sid && s.expiresAt > new Date()
      );

      if (!session) {
        throw new AppError(
          "This session has been logged out. Please log in again.",
          HTTP_STATUS.UNAUTHORIZED
        );
      }

      req.sessionId = decoded.sid;

      // Best-effort, throttled, fire-and-forget: only written when stale,
      // and never awaited, so it can't add latency to the request or turn
      // into a write on every single call.
      if (
        Date.now() - new Date(session.lastActiveAt).getTime() >
        LAST_ACTIVE_THROTTLE_MS
      ) {
        User.updateOne(
          { _id: user._id, "sessions.sessionId": decoded.sid },
          { $set: { "sessions.$.lastActiveAt": new Date() } }
        ).catch(() => {});
      }
    }

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    return next(new AppError("Invalid or expired token", HTTP_STATUS.UNAUTHORIZED));
  }
};

module.exports = authenticate;
