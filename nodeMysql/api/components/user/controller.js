const nanoid = require('nanoid');
const auth = require('../auth');

const TABLA = 'user';
/*Ahora inyectaremos el cache igual */
module.exports = function (injectedStore,injectedCache) {
    let cache = injectedCache;
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }
    if (!cache) {
        cache = require('../../../store/dummy');
    }

    /*Las funciones que estaban en cache demoraban
    casi la mitad de lo que demora hacer la 
    consulta a la base de datos. Pero es más complejo.*/
    async function list() {
        let users = await cache.list(TABLA);
        if(!users){
            console.log("no estaba en cache. Buscando en base de datos")
            users = await store.list(TABLA);
            cache.upsert(TABLA,users);
        }else{
            console.log("nos traemos datos de cache")
        }
        return users;
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username,
        }
        let isNew;

        if (body.id) {
            user.id = body.id;
            isNew = false
        } else {
            user.id = nanoid();
            isNew = true;
        }

        if ((body.password || body.username)) { 
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            },isNew)
        }

        

        return store.upsert(TABLA, user,isNew).then(()=>user);
    }

    const follow = (from,to)=>{
        return store.upsert(TABLA+'_follow',{
            user_from: from,
            user_to:to,
        });
    }

    const following = async(user)=>{
        const join ={}
        join[TABLA] = 'user_to'; //{user: 'user_to'}
        const query = {user_from:user};
        console.log(join,TABLA,query);
        return await store.query(TABLA+'_follow',query,join);
    }

    return {
        list,
        get,
        upsert,
        follow,
        following
    };
}