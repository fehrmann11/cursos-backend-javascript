//exporta un midelware
const auth = require('../../../auth');
module.exports = function checkAuth(action){

    const middleware = (req,res,next)=>{
        switch (action) {
            case 'update':
                //objeto con funciones (el usuario que lo quiere modificar)
                const owner = req.body.id;
                auth.check.own(req,owner);
                break;
        
            default:
                next();
                break;
        }
    }

    return middleware;

}