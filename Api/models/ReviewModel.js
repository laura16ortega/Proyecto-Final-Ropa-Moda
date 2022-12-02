const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  comment:{type:String},
  rating:{type:Number},
  productId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product"
  }
  },{
  timestamps:true,
  versionKey: false
})


const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
