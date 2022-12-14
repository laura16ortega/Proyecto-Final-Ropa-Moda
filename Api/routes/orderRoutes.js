const express = require("express");
const orderController = require("./../controllers/orderController");
const router = express.Router();

//ROUTES

router
  .route("/")
  .post(orderController.createOrder)
  .get(orderController.getAllOrders);
router.route("/:id").get(orderController.getOrderById);

module.exports = router;
