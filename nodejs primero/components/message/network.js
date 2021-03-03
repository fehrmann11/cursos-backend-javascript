const express = require('express');
const multer = require('multer');
const router = express.Router();

//importo las respuestas !!
const response = require('../../network/response');

const controller = require('./controller');


//prerpando multer (dest el destino)
const upload = multer({
    dest:'public/files/',
})

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
router.post('/',upload.single('file'), (req,res)=>{
    //para entrar al fichero
    console.log(req.file);
    //!!
    controller.addMessage(req.body.chat,req.body.user,req.body.message,req.file)
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