const {hash, compare} = require("bcryptjs");

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


module.exports = {
    encrypt,
    verified
}

