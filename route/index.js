const express = require("express");
const router = express.Router();
const car = require("./car");
const cartype = require("./cartype");

router.use("/car", car);
router.use("/cartype", cartype);

module.exports = router;
