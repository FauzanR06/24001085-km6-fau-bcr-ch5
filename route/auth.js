const express = require("express");
const router = express.Router();
const {
  register,
  login,
  profile,
  registerAdmin,
} = require("../controller/auth");
const { authMiddleware } = require("../middleware/auth");

router.post("/registerAdmin", registerAdmin);

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware(["user", "admin"]), profile);

module.exports = router;
