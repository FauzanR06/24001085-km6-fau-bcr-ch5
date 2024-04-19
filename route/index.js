const express = require("express");
const router = express.Router();
const auth = require("./auth");
const car = require("./car");
const cartype = require("./cartype");
const manufacture = require("./manufacture");

router.use("/auth", auth);
router.use("/car", car);
router.use("/cartype", cartype);
router.use("/manufacture", manufacture);

module.exports = router;
