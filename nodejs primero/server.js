const express = require('express');
const app = express();
const server = require('http').Server(app);
//nos permite separa cabeceras, métodos, urls.
const bodyParser = require('body-parser');
const db = require('./db');
//importo el network.js que tiene los post get...
//const router = require('./components/message/network');
const router = require('./network/routes');
//me traigo el socket
const socket = require('./socket');

db('mongodb+srv://usuario:@cluster0.zbglt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//inicializando socket
socket.connect(server);
//app.use(router);
router(app);



app.use('/app',express.static('public'));


//Puerto
server.listen(8080,()=>{
    console.log('La aplicación está tuteando en http://localhost:8080');
});
