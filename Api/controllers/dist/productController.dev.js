"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Product = require("./../models/productModels");

var cloudinary = require("../services/cloudinaryServices");

var Review = require("../models/ReviewModel"); //ROUTE HANDLERS


exports.getAllProducts = function _callee(req, res) {
  var keyword, products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          //EXECUTE THE QUERY
          keyword = req.query.keyword ? {
            name: {
              $regex: req.query.keyword,
              $options: "i"
            }
          } : {};
          _context.next = 4;
          return regeneratorRuntime.awrap(Product.find(_objectSpread({}, keyword)));

        case 4:
          products = _context.sent;
          //esto va a devolver una promesa, por eso usamos await
          //SEND RESPONSE
          res.status(203).json({
            status: "success",
            results: products.length,
            data: {
              products: products
            }
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(404).json({
            status: "fail",
            message: _context.t0
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getProduct = function _callee2(req, res) {
  var _product;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.findById(req.params.id));

        case 3:
          _product = _context2.sent;
          res.status(200).json({
            status: "success",
            data: {
              product: _product
            }
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(404).json({
            status: "fail",
            message: _context2.t0
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.createProduct = function _callee3(req, res) {
  var _req$body, name, price, description, category, images, stock, tallaCamiseta, tallaPantalon, marca, result, newProduct;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, name = _req$body.name, price = _req$body.price, description = _req$body.description, category = _req$body.category, images = _req$body.images, stock = _req$body.stock, tallaCamiseta = _req$body.tallaCamiseta, tallaPantalon = _req$body.tallaPantalon, marca = _req$body.marca;

          if (!(!name || !price || !images || !marca || !category)) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(500).json({
            message: "Please Provide all Parameters"
          }));

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload(image, {
            folder: "products"
          }));

        case 6:
          result = _context3.sent;
          _context3.next = 9;
          return regeneratorRuntime.awrap(Product.create({
            name: name,
            description: description,
            price: price,
            category: category,
            stock: stock,
            tallaCamiseta: tallaCamiseta ? tallaCamiseta : [],
            tallaPantalon: tallaPantalon ? tallaPantalon : [],
            image: {
              public_id: result.public_id,
              url: result.secure_url
            }
          }));

        case 9:
          newProduct = _context3.sent;
          res.status(201).json({
            status: "success",
            data: {
              product: newProduct
            }
          });
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json({
            status: "fail,",
            message: _context3.t0
          });

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.updateProduct = function _callee4(req, res) {
  var tour;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Product.findByIdAndUpdate(req.params.id, req.body, {
            //el segundo parámetro es la información con la que queremos cambiar el tour
            "new": true,
            //el tercer parámetro indica que queremos devolver el documento modíficado en vez del original
            runValidators: true
          }));

        case 3:
          tour = _context4.sent;
          res.status(200).json({
            status: "success",
            data: {
              tour: tour
            }
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(404).json({
            status: "fail",
            message: _context4.t0
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.deleteProduct = function _callee5(req, res) {
  var tour;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Product.findByIdAndDelete(req.params.id));

        case 3:
          tour = _context5.sent;
          res.status(204) //204 significa "no content"
          .json({
            status: "success",
            data: null
          }); // ya no enviamos datos sino que enviamos null

          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(404).json({
            status: "fail",
            message: _context5.t0
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; //REVIEW SECTION


exports.addReveiw = function _callee6(req, res) {
  var review, createdReview;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          /*const {userId, rating, comment} = req.body;
          exports.addReveiw = async (req, res) => {
          const { userId, rating, comment } = req.body;
          const productId = req.params.id;
          const product = await Product.findById(req.params.id);
            if (!userId || !rating || !comment) {
            return res.status(404).json({ message: "Please provide all parametrs" });
          }
            try {
            if (product.reviews.find((review) => review.userId === req.userId)) {
              return res
                .status(404)
                .json({ message: "You already submitted a review" });
            }
            const review = {
              userId,
              rating: Number(rating),
                comment,
            };
            product.reviews.push(review);
            product.ratingsQuantity = product.reviews.length;
            product.ratingsAverage =
              product.reviews.reduce((acc, c) => c.rating + acc, 0) /
              product.reviews.length;
              const updatedProduct = await product.save();
              res.status(201).json({
              message: "Review Created Succesfully",
              review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
              ratingsQuantity: product.ratingsQuantity,
              rating: product.ratingsAverage,
            });
          } catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
          }
            const {rating, comment, userId} = req.body;
          //if(!rating || !description)return res.status(500).json({message:"Please Provide all Parameters"});
          
          const product = await Product.findById(req.params.id);
          //if(!product) return res.stauts(400).json({message:"Product not found"});
            
          /*if(product){
              console.log(product)
              if(product.reveiws?.find((x)=>x.userId === req.userId)){
                return res.stauts(400).json({message:"Your Already Submitted a review"})
              }
            }*/
          review = {
            rating: rating,
            comment: comment,
            userId: userId,
            productId: req.params.id
          }; //console.log(product.reviews.reduce((a,c)=>c.ratingsAverage + a,0)/product.reviews.length)

          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(Review.create(review));

        case 4:
          createdReview = _context6.sent;
          //console.log("createdreview", createdReview)
          product.reviews.push(createdReview._id);
          product.ratingsQuantity = product.reviews.length;
          _context6.next = 9;
          return regeneratorRuntime.awrap(product.save(function (err) {
            if (err) {
              console.log(err);
            }
          }));

        case 9:
          console.log("producto final", product); //Calcular promedio de rating del producto y de las reveiw y devolverlas

          res.status(201).json({
            message: "Review created successfully",
            product: product
          });
          _context6.next = 17;
          break;

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](1);
          console.log(_context6.t0);
          res.status(500).json(_context6.t0);

        case 17:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 13]]);
};

exports.getReviews = function _callee7(req, res) {
  var id, reviews, review;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          _context7.next = 4;
          return regeneratorRuntime.awrap(Review.findById(id).populate("userId"));

        case 4:
          reviews = _context7.sent;

          if (reviews) {
            _context7.next = 7;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            message: "Review Not Found"
          }));

        case 7:
          review = {
            rating: reviews.rating,
            name: reviews.userId.fullName,
            comment: reviews.comment
          };
          res.status(200).json(review);
          _context7.next = 15;
          break;

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          res.status(500).json({
            message: _context7.t0
          });

        case 15:
          res.status(500).json({
            message: error
          });

        case 16:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getReviews = function _callee8(req, res) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
        case "end":
          return _context8.stop();
      }
    }
  });
};