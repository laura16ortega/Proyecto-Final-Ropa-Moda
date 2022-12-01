const express = require("express");
const { verifyTokenAndAuthorization, verifyToken } = require("../services/JwtServices");
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
  .get(productController.getReviews)
  .post(verifyToken, productController.addReveiw)
  
module.exports = router;
