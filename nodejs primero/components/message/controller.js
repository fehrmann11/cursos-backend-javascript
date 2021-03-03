//acá viene el usuario, el mensaje y la fecha
//cuando cambiemos el store, no es necesario hacer cambio en el controlador
const  socket  = require('../../socket').socket;
const store = require('./store');

const addMessage = (chat,user,message,file) =>{
    return new Promise((resolve,reject)=>{
        if(!user || !message || !chat){
            console.error('[messageController]: No hay usuario o mensaje');
            return reject('Los datos son incorrectos');
        }

        let fileUrl='';
        if(file){
            fileUrl = 'http://localhost:8080/app/files/' + file.filename;
        }

        const fullMessage = {
            chat:chat,
            user:user,
            message:message,
            date:new Date(),
            file: fileUrl,
        };

        store.add(fullMessage);

        //socket enviar mensajes
        socket.io.emit('message',fullMessage);
    
        console.log(fullMessage);
        resolve(fullMessage);
    })
    
}

//utilizamos promesas para tener el control si algo falla o no
const getMessages = (filterUser)=>{
    return new Promise((resolve,reject)=>{
        resolve(store.list(filterUser));
    })
}

//actualizar un mensaje
const updateMessage = (id,message) =>{
    return new Promise(async(resolve,reject)=>{
        console.log(id)
        console.log(message)
        if(!id || !message){
   
            reject('Invalid data');
            return false;
        }
        const result = await store.updateText(id,message);
        resolve(result);
    })
}

//eliminar
const deleteMessage = (id) =>{
    return new Promise((resolve,reject)=>{
        if(!id){
            reject('Parámetros o id inválidos');
            return false;
        }
        store.remove(id)
            .then(()=>{
                resolve();
            })
            .catch(e =>{
                reject(e);
            });
    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
};