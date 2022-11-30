const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId:{type:String, required:[true,"a reveiw must have a name"]},
  comment:{type:String, required:[true,"a reveiw must have a name"]},
  rating:{type:Number, required:[true,"a reveiw must have a name"]},
  },{
  timestamps:true,
  versionKey: false
})


const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
