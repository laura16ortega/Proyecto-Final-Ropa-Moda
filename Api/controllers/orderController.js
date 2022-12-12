const express = require("express");
const Order = require("./../models/orderModel");
const asyncHandler = require("express-async-handler");

const orderRouter = express.Router();

//

exports.getAllOrders = async (req, res) => {
  //La función callback se llama Route Handler
  try {
    //EXECUTE THE QUERY
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const orders = await Order.find({ ...keyword }); //esto va a devolver una promesa, por eso usamos await

    //SEND RESPONSE
    res.status(203).json({
      status: "success",
      results: orders.length,
      data: { orders },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
};

//CREATE ORDER

exports.createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    userId
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: userId,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "fullName email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
