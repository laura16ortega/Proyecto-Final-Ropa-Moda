const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    image: {
      type: String
      //agregar default value
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    phone_number: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.getResetPasswordToken = function(){
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

  return resetToken
}

const User = mongoose.model("User", userSchema);

module.exports = User;
