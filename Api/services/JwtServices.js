const {sign,verify} = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken =(user)=>{
    const jwt = sign({
        id: user._id,
        isAdmin: user.isAdmin
      }, 
    JWT_SECRET,{
        expiresIn:"2h",
    });
    return jwt;
}


const verifyToken = async(request,response, next)=>{
    const authHeader = request.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        
        verify(token,JWT_SECRET,(err,user)=>{
            if(err) response.status(403).json({message:"Token is not Valid!"})
            request.user = user;
            next()
        })
    }else{
        return response.status(401).json({message:"You re not Authenticated!"})
    }
};

const verifyTokenAndAuthorization = (request,response,next)=>{
    console.log(request.user)
    //console.log(request.params)
    verifyToken(request,response,()=>{
        if(request.user.id === request.params.id || request.user.isAdmin){
            next();
        }else{
            response.status(403).json({message:"You are not alowed to do that!"})
        }
    })
}

const verifyTokenAndAdmin = (request,response, next)=>{
    verifyToken(request,response,()=>{
        if(request.user.isAdmin){
            next();
        }else{
            response.status(403).json("You are not alowed to do that!")
        }
    })
};

module.exports = {
    generateToken,
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
}