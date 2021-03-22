const express = require("express");
//const bodyParser = require("body-parser");
const config = require("../config");
const router = require("./network");
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//rutas
app.use('/',router)

app.listen(config.mysqlService.port,()=>{
    console.log(`Servicio de mysql escuchando en el puerto ${config.mysqlService.port}`)
})

/**const express = require('express');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); */