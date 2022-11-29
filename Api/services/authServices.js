const {hash, compare} = require("bcryptjs");
const SECRET = process.env.SECRET;
const BASEURL = process.env.BASEURL;
const CLIENTID = process.env.CLIENTID;
const ISSUER = process.env.ISSUER;

//Metodo para encriptar contraseña de usuarios
const encrypt = async(password)=>{
    const passwordHash = await hash(password,8);
    return passwordHash.toString()
};

//Metodo para verificar contraseña de usuarios
const verified = async(password, passwordHash)=>{
    const isCorrect = await compare(password, passwordHash);
    return isCorrect
};

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: SECRET,
    baseURL: BASEURL,
    clientID: CLIENTID,
    issuerBaseURL: ISSUER
  };


module.exports = {
    encrypt,
    verified,
    config
}

