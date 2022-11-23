const User = require("../models/userModels");
const bcrypt = require("bcryptjs");



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
    const user = await User.findById(request.params.id);

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
        console.log(error)
        response.status(500).json({message:error})
    }
}
//Change a User Password
const changePass = async(request,response)=>{
    const user = await User.findById(request.user);
    response.send(user);  
}
const changePass2 = async(request,response)=>{
    //const user = await User.findById(request.user);
    response.send('hola');  
}

module.exports = {
    getAllUsers,
    getUser,
    deleteUser,
    updatedUser,
    changePass,
    changePass2
}