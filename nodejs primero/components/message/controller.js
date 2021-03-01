//acá viene el usuario, el mensaje y la fecha
//cuando cambiemos el store, no es necesario hacer cambio en el controlador
const store = require('./store');

const addMessage = (user,message) =>{
    return new Promise((resolve,reject)=>{
        if(!user || !message){
            console.error('[messageController]: No hay usuario o mensaje');
            return reject('Los datos son incorrectos');
        }
        const fullMessage = {
            user:user,
            message:message,
            date:new Date(),
        };

        store.add(fullMessage);
    
        console.log(fullMessage);
        resolve(fullMessage);
    })
    
}

//utilizamos promesas para tener el control si algo falla o no
const getMessages = ()=>{
    return new Promise((resolve,reject)=>{
        resolve(store.list());
    })
}

module.exports = {
    addMessage,
    getMessages
};