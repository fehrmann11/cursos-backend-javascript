const auth = require('../../../auth');
const TABLA = 'auth';
module.exports = (injectedStore) => {
    let store = injectedStore;
    if(!store){
        store = require('../../../store/dummy');
    }


    //login 
    const login = async(username,password)=>{
        //la tabla y en ese caso que busque username que sea el username
        const data = await store.query(TABLA,{username:username});
        console.log(data.password,password);
        console.log(data)
        if(data.password===password){
            console.log(auth.sign(data));
            //generar token
            return auth.sign(data);

        }else{
            throw new Error('Información inválida')
        }
        
    }

    //data del usuario
    const upsert = (data) =>{
        const authData = {
            id: data.id,
        }
        /*Se hace de esta manera ya que si se quiere actualizar 
        algo solo lo haga donde lo necesite*/
        if(data.username){
            authData.username = data.username;
        }
        if(data.password){
            authData.password = data.password;
        }
        return store.upsert(TABLA,authData);
    } 
    return{
        upsert,
        login
    }

};