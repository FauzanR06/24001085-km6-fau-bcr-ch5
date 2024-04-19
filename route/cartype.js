const express = require("express");
const router = express.Router();

const cartypeController = require("../controller/cartype");
const { authMiddleware } = require("../middleware/auth");

router
  .route("/")
  .get(authMiddleware(["user", "admin"]), cartypeController.getCarTypes)
  .post(authMiddleware(["admin"]), cartypeController.createCarType);

router
  .route("/:id")
  .get(authMiddleware(["user", "admin"]), cartypeController.getCarType)
  .put(authMiddleware(["admin"]), cartypeController.updateCarType)
  .delete(authMiddleware(["admin"]), cartypeController.deleteCarType);

module.exports = router;
