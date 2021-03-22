const TABLA = 'post';
const { nanoid } = require('nanoid');
const error = require('../../../utils/error');
module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }
    const list = () => {
        return store.list(TABLA);
    }

    const listId = async (id) => {
        const user = await store.get(TABLA, id);
        if (Object.keys(user).length === 0) {
            throw error("No existe el post", 404);
        }
        return user;
    }

    const upsert = async (body, userId) => {
        const post = {
            id: body.id,
            text: body.text,
            user: userId
        }
        if(!post.id){
            post.id = nanoid();
        }
        //al poner then(()=>post) muestra lo que se agrego!!
        return store.upsert(TABLA,post).then(()=>post)
    }

    // const like = async(post,user)=>{
    //     const like = await store.upsert(TABLA+'_like')
    // }

    return {
        list,
        listId,
        upsert
    };


}

