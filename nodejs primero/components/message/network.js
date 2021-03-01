const express = require('express');

const router = express.Router();

//importo las respuestas !!
const response = require('../../network/response');

const controller = require('./controller');

//solo get
router.get('/', (req,res)=>{
   controller.getMessages()
    .then((messageList)=>{
        response.success(req,res,messageList,200);
    })
    .catch(e=>{
        response.error(req,res,'Unexpected Error',500,e);
    })
});

//solo post
router.post('/', (req,res)=>{
    
    //!!
    controller.addMessage(req.body.user,req.body.message)
    .then((fullMessage)=>{
        response.success(req,res,fullMessage,201);
    })
    .catch(e =>{
        response.error(req,res,'Información inválida',400,'Error en el login');
    });

    
});
//envía las dos rutas
module.exports = router;