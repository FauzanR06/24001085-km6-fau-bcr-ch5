const express = require("express");
const router = express.Router();

const manufactureController = require("../controller/manufacture");

router
  .route("/")
  .get(manufactureController.getManufactures)
  .post(manufactureController.createManufacture);

router
  .route("/:id")
  .get(manufactureController.getManufacture)
  .put(manufactureController.updateManufacture)
  .delete(manufactureController.deleteManufacture);

module.exports = router;
