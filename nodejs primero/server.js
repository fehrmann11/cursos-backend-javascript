const express = require('express');
//nos permite separa cabeceras, métodos, urls.
const bodyParser = require('body-parser');
//body parser
const router = express.Router();

//traigo el archivo creado response.js
const response = require('./network/response');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);


//solo get
router.get('/message', (req,res)=>{
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
router.post('/message', (req,res)=>{
    console.log(req.query)//viene de la url
    //console.log(req.body);//viene del cuerpo
    if(req.query.error=='ok'){
        response.error(req,res,'Error simulado',400);
    }else{
        response.success(req,res,'creado correctamente',201);
    }
    //text viene del body 
    //res.status(201).send([{error:'',body:'creado correctamente'}]);
    
});

app.use('/app',express.static('public'));


//Puerto
app.listen(8080);
console.log('La aplicación está tuteando en http://localhost:8080');