const express = require("express");

const router = express.Router();

const profileController = require("../controllers/profile.controller");

const authenticate = require("../middlewares/auth.middleware");

const upload = require("../middlewares/upload.middleware");

router.get("/", authenticate, profileController.getProfile);

router.put("/", authenticate, profileController.updateProfile);
router.patch(
  "/photo",
  authenticate,
  upload.single("photo"),
  profileController.updateProfilePhoto
);
router.delete("/photo", authenticate, profileController.removeProfilePhoto);

// Self-service hard delete — permanently removes the user's own record
// and emails ADMIN_EMAIL. See profile.service.js#deleteAccount.
router.delete("/", authenticate, profileController.deleteAccount);

// Active Sessions / Logged-in Devices (Settings > Security tab).
router.get("/sessions", authenticate, profileController.getSessions);
router.delete(
  "/sessions",
  authenticate,
  profileController.revokeOtherSessions
);
router.delete(
  "/sessions/:sessionId",
  authenticate,
  profileController.revokeSession
);

module.exports = router;