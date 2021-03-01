//modelo real con mongo
const db = require('mongoose');
const Model = require('./model');

//conexión a la base de datos
//const uri = 'mongodb+srv://usuario:usuario?@cluster0.zbglt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const uri = 'mongodb://usuario:@cluster0-shard-00-00.zbglt.mongodb.net:27017,cluster0-shard-00-01.zbglt.mongodb.net:27017,cluster0-shard-00-02.zbglt.mongodb.net:27017/telegrom?ssl=true&replicaSet=atlas-ormof7-shard-0&authSource=admin&retryWrites=true&w=majority';
db.Promise = global.Promise;
db.connect(uri,{
    useNewUrlParser: true,
     useUnifiedTopology: true 
}).then(()=>console.log('[db] conectada con exito'))
.catch(err => console.error('[db]',err));


const addMessage = (message) => {
    const myMessage = new Model(message);
    myMessage.save();
}

const getMessages = async() =>{
    //Pedimos todos los documentos
    const messages = await Model.find();
    return messages;
}

module.exports = {
    add: addMessage,
    list:getMessages,
    //get
    //update
    //delete
}