const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const TABLA = 'auth';
module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }


    //login 
    const login = async (username, password) => {
        //la tabla y en ese caso que busque username que sea el username
        const data = await store.query(TABLA, { username: username });

        //descifrar la contraseña devuelve una promesa con un valor true o false.
        return bcrypt.compare(password, data.password)
            .then(same => {
                if (same) {
                    console.log(auth.sign(data));
                    //generar token
                    return auth.sign(data);

                } else {
                    throw new Error('Información inválida')
                }
            });

    }

    //data del usuario
    const upsert = async (data) => {
        const authData = {
            id: data.id,
        }
        /*Se hace de esta manera ya que si se quiere actualizar 
        algo solo lo haga donde lo necesite*/
        if (data.username) {
            authData.username = data.username;
        }
        //aquí encriptamos la contraseña, le pasamos la contraseña y el número de veces que genera el algoritmo, recomendable entre 5 y 10
        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }
        return store.upsert(TABLA, authData);
    }
    return {
        upsert,
        login
    }

};