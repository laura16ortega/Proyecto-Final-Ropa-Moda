const express = require("express");
const { verifyTokenAndAuthorization, verifyToken } = require("../services/JwtServices");
const { uploadPhoto } = require("../services/uploadImages");
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
  .post(verifyToken,uploadPhoto.single('file'), productController.addReveiw)
  .get(productController.getReview)
  
module.exports = router;
