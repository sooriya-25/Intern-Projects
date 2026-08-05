const express = require("express");

const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/stocks", require("./stock.routes"));
router.use("/watchlist", require("./watchlist.routes"));
router.use("/users", require("./user.routes"));
router.use("/profile", require("./profile.routes"));
router.use("/dashboard", require("./dashboard.routes"));

module.exports = router;