const express = require('express');

const router = express.Router();

//importo las respuestas !!
const response = require('../../network/response');

const controller = require('./controller');

//solo get
router.get('/', (req,res)=>{
    //para obtener los mensajes de un usuario en específico
    const filterMessage = req.query.user || null; //si no viene null
   controller.getMessages(filterMessage)
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

//modificaciones parciales
router.patch('/:id',(req,res)=>{
    //pedimos id
    console.log(req.params.id);
    controller.updateMessage(req.params.id,req.body.message)
        .then((data)=>{
            response.success(req,res,data,200);
        })
        .catch(e=>{
            response.error(req,res,'Error interno',500,e);
        });
});

router.delete('/:id',(req,res)=>{
    controller.deleteMessage(req.params.id)
        .then(()=>{
            response.success(req,res,`Usuario ${req.params.id} eliminado`,200);
        })
        .catch(e => {
            response.error(req,res,'Error interno',500,e);
        })
})

//envía las dos rutas
module.exports = router;