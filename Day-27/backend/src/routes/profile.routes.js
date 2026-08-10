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

module.exports = router;