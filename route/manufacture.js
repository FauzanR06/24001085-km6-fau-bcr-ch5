const express = require("express");
const router = express.Router();

const manufactureController = require("../controller/manufacture");
const { authMiddleware } = require("../middleware/auth");

router
  .route("/")
  .get(
    authMiddleware(["member", "admin"]),
    manufactureController.getManufactures
  )
  .post(authMiddleware(["admin"]), manufactureController.createManufacture);

router
  .route("/:id")
  .get(
    authMiddleware(["member", "admin"]),
    manufactureController.getManufacture
  )
  .put(authMiddleware(["admin"]), manufactureController.updateManufacture)
  .delete(authMiddleware(["admin"]), manufactureController.deleteManufacture);

module.exports = router;
