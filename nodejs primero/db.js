const db = require('mongoose');
//conexión a la base de datos
db.Promise = global.Promise;
const conect = async(url) =>{
    
    await db.connect(url,{
        useNewUrlParser: true,
         useUnifiedTopology: true 
    }).then(()=>console.log('[db] conectada con exito'))
    .catch(err => console.error('[db]',err));
}

module.exports = conect;


