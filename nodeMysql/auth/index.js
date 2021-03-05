const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;

//firmar el token
const sign = (data) =>{
    console.log
    return jwt.sign(data,secret);

}

//función de verificación del token
const verify = (token) =>{
    return jwt.verify(token,secret);
}

const check = {
    own: (req,owner)=>{
        const decoded = decodeHeader(req);
        console.log(decoded);
    }
}

const getToken = (authorization)=>{
    //Bearer jdasfosjaosafjhsaiofh
    if(!authorization){
        throw new Error('No viene el token');
    }
    //formato de token correcto
    if(authorization.indexOf('Bearer')===-1){
        throw new Error('Formato inválido');
    }

    let token = authorization.replace('Bearer ','');

    return token;
}

//decodificar el token
const decodeHeader=(req)=>{
    const authorization= req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports= {
    sign,
};