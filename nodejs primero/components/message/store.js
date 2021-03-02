//modelo real con mongo

const Model = require('./model');



//añade mensajes
const addMessage = (message) => {
    const myMessage = new Model(message);
    myMessage.save();
}


//obtiene mensajes
const getMessages = async(filterUser) =>{
    return new Promise((resolve,reject)=>{
        let filter = {};
        if(filterUser !== null){
            //creamos filtro de mongo
            filter = {user:filterUser}
        }
        //Pedimos todos los documentos
        Model.find(filter)
        //busca dentro de cada elemento popula
            .populate('user')
            .exec((error,populated)=>{
                if(error){
                    reject(error);
                    return false;
                }
                resolve(populated);
            });
    })
    
}

//actualiza mensajes
const updateText = async(id,message)=>{
    const foundMessage = await Model.findOne({
        _id:id
    });
    foundMessage.message = message;
    const newMessage = await foundMessage.save(); 
    return newMessage;
}

//eliminar, importante async await!!
const removeMessage = async(id)=>{
    return await Model.deleteOne({
        _id:id
    });
}

module.exports = {
    add: addMessage,
    list:getMessages,
    updateText: updateText,
    remove:removeMessage,
}