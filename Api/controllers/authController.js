const {encrypt, verified} = require("../services/authServices");
const User = require("../models/UserModel");
const { generateToken } = require("../services/JwtServices");
const passport = require("passport");
const sendEmail = require("../services/sendMailServices")



//User Register
const registerCtrl = async(request,response)=>{
        const {
            fullName,                
            password,
            email,
            phone_number,
            isAdmin,
            image
        } = request.body;

        /*if(!fullName || !password || !email || !phone_number){
            return response.status(500).json({message:"Faltan Datos del Usuario2"})
        }*/

        try{
            const checkIs = await User.findOne({email});
            if(checkIs) return response.status(500).json({message:"El email ya esta en uso!"})    
            
            const passHash = await encrypt(password);
            const newPhoneNumber = Number(phone_number.replace(/\s/g, ''))
            const defaultImage = "https://steamuserimages-a.akamaihd.net/ugc/885384897182110030/F095539864AC9E94AE5236E04C8CA7C2725BCEFF/"
            
            //Create new User
            const user = await User.create({
                fullName,
                password:passHash,
                email,
                phone_number: newPhoneNumber,
                isAdmin,
                image: image || defaultImage
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

            const subject = "Usuario registrado con exito"
            const send_to = email
            const sent_from = process.env.EMAIL_USER
            const message = `
            <h1><strong>Hola ${fullName}!</strong></h1>

            <h2>El equipo del Proyecto final - <strong>FM</strong> te da la bienvenida</h2>

            <h3>Tus nuevos datos de usuario son</h3>
            <ul>
                <li><strong>Nombre de usuario:</strong> ${fullName}</li>
                <li><strong>Contraseña:</strong> ${password}</li>
                <li><strong>Numero de telefono:</strong> ${phone_number}</li>
            </ul>
            
            <p>- Fashion Cloth Mode</p>`

            await sendEmail(subject, message, send_to, sent_from);

            return response.status(200).json({
                message:"User Create Successfully",
                registerNewUser:{
                    fullName,
                    email,
                    isAdmin,
                    token,
                    userId: user._id,
                    image
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
        if(!checkIs) return response.status(404).json({message:"Usuario no encontrado"})

        const passwordHash = checkIs.password;
        const isCorrect = await verified(password, passwordHash);
        if(!isCorrect)return response.status(404).json({message:"Usuario no encontrado"})
        
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
            const {isAdmin, fullName,_id, image} = checkIs;
            const loginData = {
                token,
                user: {
                    isAdmin,
                    fullName,
                    email,
                    userId: _id,
                    image
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