const User = require("../models/UserModel");
const { encrypt } = require("../services/authServices");
const { generateToken } = require("../services/JwtServices");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Token = require("../models/TokenModel");
const sendEmail = require("../services/sendMailServices");
const CryptoJS = require("crypto-js");

//Get All Users
const getAllUsers = async(request,response)=>{
    const query = request.query.new;
    try {
        const users = query 
            ? await User.find().sort({_id:-1}).limit(1)
            : await User.find();
        
        response.status(200).json(users)
    } catch (error) {
        response.status(500).json({message:error})
    }
};

//Get a User
const getUser = async(request,response)=>{
    try {
      const user = await User.findById(request.params.id);
      const {password, ...others} = user._doc;
      response.status(200).json(others)  
    } catch (error) {
        response.status(500).json({message:error});
    }
};

//Update a User
const updatedUser = async(request,response)=>{
    const user = await User.findById(request.body.userId);

    if(user){
        const {fullName, email, phone_number} = user;
        user.email = email;
        user.fullName = request.body.fullName || fullName;
        user.phone_number = request.body.phone_number || phone_number;

        const updatedUser = await user.save();
        response.status(200).json({
            message:"User Update Succesfully",
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            phone_number: updatedUser.phone_number
        })
    }else{
        response.status(400).json({message:error})
    }
}

//Delete a User
const deleteUser = async(request,response)=>{
    try {
        await User.findByIdAndDelete(request.params.id);
        response.status(200).json({message:"User has been deleted succesfully"})
    } catch (error) {
        response.status(500).json({message:error})
    }
}
//Update User Password
const updatePassword = async(request,response)=>{
    try {
        const user = await User.findById(request.user.id).select("+password");
        const{oldPassword, confirmPassword, newPassword} = request.body;
        if(!oldPassword || !confirmPassword || !newPassword){
            return response.status(500).json({message:"Please provide all parameters"})
        }
        const isPasswordMatched = await user.comparePassword(oldPassword)
        if(!isPasswordMatched){
            return response.status(400).json({message:"Old password is incorrect"})
        }

        if( newPassword !== confirmPassword){
            return response.status(400).json({message:"Passwords does not match"})
        }
        const passHash = await encrypt(newPassword)
        user.password = passHash

        await user.save()
        response.status(200).json({message:"Password Updated Succesfully", user})
    } catch (error) {
        response.status(500).json({message:error})
    }
};

const forgotPassword = async(request,response)=>{
    const {email} = request.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return response.status(404).json({message:"User not found"})
        }

        let token = await Token.findOne({userId: user._id});
        if(token){
            await token.deleteOne();
        }

        let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
   
        console.log("hashedtoken1", hashedToken);
        console.log("resetToken", resetToken)

        //const hashedToken = await encrypt(resetToken);
        //const cryptoToken = CryptoJS.AES.encrypt(hashedToken, resetToken).toString()
    


       
        await new Token({
            userId: user._id,
            token: hashedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + 30 * (60 * 1000)// 30 minutos
        }).save();

        const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`
        
        const message = `
            <h2>Hello ${user.fullName}</h2>
            <p>Please use the url below to reset your password</p>
            <p>This reset link is valid for only 30 minutes.</p>
            
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

            <p>Regards....</p>
            <p>Proyecto Final Henry</p>
        `
        const subject = "Password Reset Request";
        const send_to = user.email;
        const sent_from = process.env.EMAIL_USER;

        console.log(user)

        try {
            await sendEmail(subject, message, send_to, sent_from);
            response.status(200).json({message: "Reset Email Sent Succesfully"})
        } catch (error) {
            response.status(500).json({message:error})
        }
    
    } catch (error) {
        response.status(500).json({message:error})
    }
};

const resetPassword = async(request,response)=>{
  const {password} = request.body;
  const {resetToken} = request.params;


  try {
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const tokens = await Token.find()
    console.log("tokens", tokens)
    console.log("hashedToken", hashedToken)
    //comaprar(token, resettoken)
    const userToken = await Token.findOne({
        token: hashedToken,
        expiresAt:{$gt: Date.now()}
    });
    console.log(userToken)
    if(!userToken){
        response.status(404).json({message:"Invalid Token"});
    }

    const user = await User.findOne({_id: userToken.userId});
    const passHash = await encrypt(password)
    user.password = passHash;
    await user.save();
    response.status(201).json({message:"Password Reset Succesfully, Please Login"})
  } catch (error) {
    console.log(error)
    response.status(500).json({message:error})
  }
}

module.exports = {
    getAllUsers,
    getUser,
    deleteUser,
    updatedUser,
    updatePassword,
    forgotPassword,
    resetPassword
}