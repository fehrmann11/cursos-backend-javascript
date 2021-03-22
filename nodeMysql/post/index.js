/*Escalada horizontal microservicio 
Creando una api específica para los post
que puede servir en otro sitio.
Esto genera que tengamos un nodo solo de post
y la aplicación pida directamente a este servicio,
además puede entrar la base de datos directamente
no como el usuario y la autenticación que van a un
microservicio de base de datos.*/
const express = require('express');
//const bodyParser = require('body-parser');


const config = require('../config.js');

const post = require('./components/post/network');
const errors = require('../network/errors');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());



// ROUTER
app.use('/api/post', post);


app.use(errors);

app.listen(config.post.port, () => {
    console.log('Servicio posts escuchando en el puerto ', config.post.port);
});