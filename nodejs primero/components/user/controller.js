//logica
const store = require('./store');

const addUser = (name) => {

    //compración de propiedades
    if(!name){
        return Promise.reject('Invalid name');
    }

    const user = {
        name,
    };

    return store.add(user);
}

//obtener usuarios
//utilizamos promesas para tener el control si algo falla o no
const getUsers = (filterUser)=>{
    return new Promise((resolve,reject)=>{
        resolve(store.list(filterUser));
    })
}

module.exports = {
    addUser,
    getUsers
}