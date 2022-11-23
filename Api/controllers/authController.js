const {encrypt, verified} = require("../services/authServices");
const User = require("../models/userModels");
const { generateToken } = require("../services/JwtServices");


//User Register
const registerCtrl = async(request,response)=>{
        const {
            fullName,                
            password,
            email,
            phone_number,
            isAdmin
        } = request.body;

        if(!fullName || !password || !email || !phone_number){
            return response.status(500).json({message:"Faltan Datos del Usuario"})
        }

        try{
            const checkIs = await User.findOne({email});
            if(checkIs) return response.status(500).json({message:"Email Already exist"})    
            
            const passHash = await encrypt(password);
            const registerNewUser = await User.create({
                fullName,
                password:passHash,
                email,
                phone_number,
                isAdmin
            })
            return response.status(200).json({
                message:"User Create Successfully",
                registerNewUser:{
                    fullName,
                    email,
                    isAdmin
                }
            })
        } catch (error) {
            return response.status(500).send({message:error})
        }

}

//User Login
const loginCtrl = async(request,response)=>{
    const {email, password} = request.body;
    try {
        const checkIs = await User.findOne({email});
        if(!checkIs) return response.status(404).json({message:"User Not Found"})

        const passwordHash = checkIs.password;
        const isCorrect = await verified(password, passwordHash);
        if(!isCorrect)return response.status(404).json({message:"User Not Found"})
        
        const token = generateToken(checkIs.email);
        const {isAdmin, fullName} = checkIs;
        const loginData = {
            token,
            user: {
                isAdmin,
                fullName,
                email
            }
        }

        response.status(200).json({loginData})
    } catch (error) {
        console.log(error)
        response.status(500).json({message:error})
    }
};

module.exports = {
    registerCtrl,
    loginCtrl
}