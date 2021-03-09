const {nanoid} = require('nanoid');
const auth = require('../auth');

const TABLA = 'user';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
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

        if ((body.password || body.username) && isNew===false) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            })
        }

        return store.upsert(TABLA, user,isNew);
    }

    return {
        list,
        get,
        upsert,
    };
}