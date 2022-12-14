"use strict";

var express = require("express");

var _require = require("../services/JwtServices"),
    verifyTokenAndAuthorization = _require.verifyTokenAndAuthorization,
    verifyToken = _require.verifyToken;

var _require2 = require("../services/uploadImages"),
    uploadPhoto = _require2.uploadPhoto;

var productController = require("./../controllers/productController");

var router = express.Router(); //ROUTES

router.route("/filteredProducts").get(productController.getFilteredProducts);
router.route("/").get(productController.getAllProducts).post(productController.createProduct);
router.route("/:id").get(productController.getProduct).patch(productController.updateProduct)["delete"](productController.deleteProduct);
router.route("/review/:id").post(verifyToken, uploadPhoto.single('file'), productController.addReveiw).get(productController.getReview)["delete"](productController.deleteReview);
module.exports = router;