const express = require("express");
const { verifyTokenAndAuthorization } = require("../services/JwtServices");
const productController = require("./../controllers/productController");
const router = express.Router();

//ROUTES

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

router
  .route("/review/:id")
  .post(verifyTokenAndAuthorization, productController.addReveiw)

module.exports = router;
