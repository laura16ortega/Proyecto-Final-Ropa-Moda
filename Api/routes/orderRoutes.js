const express = require("express");
const orderController = require("./../controllers/orderController");
const router = express.Router();

//ROUTES

router.route("/").post(orderController.createOrder);

module.exports = router;
