const {nanoid}= require('nanoid');
const TABLA = 'user';

module.exports = (injectedStore) => {
    let store = injectedStore;
    if(!store){
        store = require('../../../store/dummy');
    }
    //trae datos
    const list = () => {
        return store.list(TABLA);
    }

    //trae un usuario
    const get = (id) => {
        return store.get(TABLA,id);
    }

    const upsert = (body) =>{
        const user = {
            name:body.name
        }
        if(body.id){
            user.id = body.id
        }else{
            user.id = nanoid();
        }

        return store.upsert(TABLA,user);
    }

    return {
        list,
        get,
        upsert
    };
}
