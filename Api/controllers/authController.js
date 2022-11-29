const {encrypt, verified} = require("../services/authServices");
const User = require("../models/UserModel");
const { generateToken } = require("../services/JwtServices");
const passport = require("passport");



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
            
            //Create new User
            const user = await User.create({
                fullName,
                password:passHash,
                email,
                phone_number,
                isAdmin
            });

            
            //Generate Token
            const token = generateToken(user);

            //Cookie
            response.cookie("token", token,{
                path:"/",
                httpOnly:true,
                expires: new Date(Date.now() + 1000 * 86400),//1 day
                sameSite:"none",
                secure:true
            })

            return response.status(200).json({
                message:"User Create Successfully",
                registerNewUser:{
                    fullName,
                    email,
                    isAdmin,
                    token
                }
            })
        } catch (error) {
            console.log(error)
            return response.status(500).send({message:error})
        }

}
//User Logout
const logoutCtrl = async(_request,response)=>{
    try {
        response.cookie("token", null,{
            expires: new Date(Date.now()),
            httpOnly: true
        });
        response.status(200).json({message:"Logged out succesfully"})
    } catch (error) {
        response.status(500).json({message:error})
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
        
        if(checkIs && isCorrect){
            const token = generateToken(checkIs);
            //Cookie
            response.cookie("token", token,{
                path:"/",
                httpOnly:true,
                expires: new Date(Date.now() + 1000 * 86400),//1 day
                sameSite:"none",
                secure:true
            })
            console.log(checkIs)
            const {isAdmin, fullName,_id} = checkIs;
            const loginData = {
                token,
                user: {
                    isAdmin,
                    fullName,
                    email,
                    userId: _id
                }
            }
            response.status(200).json({loginData})
        }
    } catch (error) {
        console.log(error)
        response.status(500).json({message:error})
    }
};

const googleCtrl = async()=>{
    passport.authenticate('google',{scope: ['email','profile']})
}

const callbackCtrl = (request,response)=>{
    try {
        console.log("auth controller")
        const login = request.oidc.isAuthenticated()
        if(!login) return response.status(500).json({message:'Authentication Error'})

        const token = generateToken(request.oidc.user);

        response.status(200).json({
            user: request.oidc.user,
            token
        })
    } catch (error) {
        response.status(500).json({message:error})
    }
}

module.exports = {
    registerCtrl,
    loginCtrl,
    googleCtrl,
    callbackCtrl,
    logoutCtrl
}