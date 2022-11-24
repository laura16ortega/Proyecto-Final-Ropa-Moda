const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"], //valor requerido y error
    unique: true,
    trim: true, //solo funciona para strings y remueve todos los espacios en blanco al inicio y al final del string
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
  },
  description: {
    type: String,
    trim: true,
  },

  images: [String], //acá aclaro que para esta propiedad quiero un arreglo de strings
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  stock: {
    type: Number,
    required: [true, "A product must have a stock"],
  },
  category: {
    type: String,
    required: [true, "A product must have a category"],
    enum: ["Camiseta", "Pantalones", "Mujer", "Hombre"],
  },
  tallaCamiseta: { type: String, enum: ["S", "M", "L", "XL"] },
  tallaPantalón: { type: String, enum: ["26", "28", "30", "32", "34"] },
  marca: String,
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
