const express = require('express');

const router = express.Router();

//importo las respuestas !!
const response = require('../../network/response');

//solo get
router.get('/', (req,res)=>{
    //incluir cabeceras
    console.log(req.headers);
    //mandar headers
    res.header({
        "custom-header":"Nuestro valor personalizado",
    })
    //res.send('lista de mensajes');
    response.success(req,res,'Lista de mensajes');
});

//solo post
router.post('/', (req,res)=>{
    console.log(req.query)//viene de la url
    //console.log(req.body);//viene del cuerpo
    if(req.query.error=='ok'){
        response.error(req,res,'Error inesperado',500,'Es solo una simulación de los errores');
    }else{
        response.success(req,res,'creado correctamente',201);
    }
    //text viene del body 
    //res.status(201).send([{error:'',body:'creado correctamente'}]);
    
});
//envía las dos rutas
module.exports = router;