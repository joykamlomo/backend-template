const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./user");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

module.exports = router;
