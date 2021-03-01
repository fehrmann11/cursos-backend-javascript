//información de red
const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.post('/',(req,res)=>{
    controller.addUser(req.body.name)
        .then(data=>{
            response.success(req,res,data,201);
        })
        .catch(e=>{
            response.error(req,res,'Internal error',500,e);
        });
})

//obtener lista de usuarios
router.get('/', (req,res)=>{
    //para obtener los mensajes de un usuario en específico (name es el nombre de la cabecera que mando)
    const filterUser = req.query.name || null; //si no viene null
   controller.getUsers(filterUser)
    .then((userList)=>{
        response.success(req,res,userList,200);
    })
    .catch(e=>{
        response.error(req,res,'Unexpected Error',500,e);
    })
});

module.exports = router;