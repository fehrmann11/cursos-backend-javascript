const jwt = require('jsonwebtoken');

//firmar el token
const sign = (data) =>{
    console.log
    return jwt.sign(data,'secret');

}

module.exports= {
    sign,
};