//logica de almacenamiento de datos
const Model = require('./model');


const addUser = (user) =>{
    const myUser = new Model(user)
    return myUser.save();
}

const getUser = async(filterUser)=>{
    let filter = {};
    if(filterUser !== null){
        //creamos filtro de mongo http//:localhost:3000/user?name=nombre
        filter = {name:filterUser}
    }
    const users = await Model.find(filter);
    return users;
}

module.exports = {
    add: addUser,
    list:getUser
}