const express = require("express");
const router = express.Router();

const cartypeController = require("../controller/cartype");

router
  .route("/")
  .get(cartypeController.getCarTypes)
  .post(cartypeController.createCarType);

router
  .route("/:id")
  .get(cartypeController.getCarType)
  .put(cartypeController.updateCarType)
  .delete(cartypeController.deleteCarType);

module.exports = router;
