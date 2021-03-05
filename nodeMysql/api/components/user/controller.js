const {nanoid}= require('nanoid');
const auth = require('../auth');
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

    const upsert = async(body) =>{
        const user = {
            name:body.name,
            username:body.username,
        }
        if(body.id){
            user.id = body.id
        }else{
            user.id = nanoid();
        }

        //cada vez que cambien el password o el usuario hay un upsert
        if(body.password || body.username){
            await auth.upsert({
                id:user.id,
                username:user.username,
                password:body.password,
            })
        }

        return store.upsert(TABLA,user);
    }

    return {
        list,
        get,
        upsert
    };
}
