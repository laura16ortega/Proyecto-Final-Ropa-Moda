const mongoose = require("mongoose");


const Review = require("./ReviewModel");


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"], //valor requerido y error
    unique: true,
    trim: true, //solo funciona para strings y remueve todos los espacios en blanco al inicio y al final del string
    maxlength: [
      40,
      "A product name must have less or equal than 40 characters",
    ],
    minlength: [8, "A product name must have more or equal than 10 characters"],
  },

  ratingsAverage: { type: Number, default: 4.5 },
  ratingsQuantity: { type: Number, default: 0 },
  price: {
    type: Number,
    required: [true, "The product must have a price"], //valor requerido y error
  },

  summary: {
    type: String,
    trim: true, //solo funciona para strings y remueve todos los espacios en blanco al inicio y al final del string
    required: [true, "A product must have a description"],
    minlength: [4, "A summary must have more or equal than 4 characters"],
  },
  description: {
    type: String,
    trim: true,
  },


  images: [String], //acá aclaro que para esta propiedad quiero un arreglo de strings
  images: {
      public_id:{
        type:String,
 
      },
      url:{
        type:String,

      }
  }, //acá aclaro que para esta propiedad quiero un arreglo de strings

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  stock: {
    type: Number,
    required: [true, "A product must have a stock"],
  },
  gender: {
    type: String,
    required: [true, "A product must have a gender"],
    enum: {
      values: ["Mujer", "Hombre", "Unisex"],
      message: "Gender is either: Mujer, Hombre or Unisex",
    },
  },
  category: {
    type: String,
    required: [true, "A product must have a category"],
    enum: {
      values: ["Camiseta", "Pantalones"],
      message: "Category is either: Camiseta or Pantalones",
    },
  },
  tallaCamiseta: [String],
  tallaPantalón: [String],
  marca: String,

  reviews:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Review"
  }],

});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
