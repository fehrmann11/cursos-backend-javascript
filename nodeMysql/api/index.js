const express = require('express');
const config = require('../config.js');
const user = require('./components/user/network');
const bodyParser = require('body-parser');
const app = express();

//body parser nos permite trabajar con la data en json
app.use(bodyParser.json());


//Definir las rutas
app.use('/api/user',user);


//donde se abrirá
app.listen(config.api.port,()=>{
    console.log(`Api escuchando en el puerto ${config.api.port}`);
});