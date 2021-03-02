const express = require('express');
//nos permite separa cabeceras, métodos, urls.
const bodyParser = require('body-parser');
//body parser

const db = require('./db');

//importo el network.js que tiene los post get...
//const router = require('./components/message/network');
const router = require('./network/routes');

db('mongodb+srv://usuario:usuario@cluster0.zbglt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(router);
router(app);



app.use('/app',express.static('public'));


//Puerto
app.listen(8080);
console.log('La aplicación está tuteando en http://localhost:8080');