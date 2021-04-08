//TODO LO DE REDIS
//

const redis = require('redis');

const config = require('../config');

const client = redis.createClient({
    host:config.redis.host,
    port:config.redis.port,
    password:config.redis.password,
});

const list = (table) =>{
    return new Promise((resolve,reject)=>{
        client.get(table,(err,data)=>{
            if(err) return reject(err);
            /*redis es clave y valor por lo que haremos será guardar un string muy largo
            o sea nuestros objetos se volveran string cuando guardemos en la base de datos
            y de string a objetos cuando leamos la base de datos */
            let res = data || null;
            if(data){
                //si viene algún resultado
                res = JSON.parse(data);
            }
            resolve(res);
        })
    })
}

const get = (table,id)=>{

}

const upsert = async(table,data)=>{
    let key = table;
    if(data && data.id){
        key = key + '_'+data.id;
    }
    client.setex(key,10,JSON.stringify(data));
    return true
}

module.exports = {
    list,
    get,
    upsert
}