const express = require('express');
const app = express();
const server = require('http').Server(app);
//cors para poder consumirlo
const cors = require('cors');
//nos permite separa cabeceras, métodos, urls.
const bodyParser = require('body-parser');
const db = require('./db');
//importo el network.js que tiene los post get...
//const router = require('./components/message/network');
const router = require('./network/routes');
//me traigo el socket
const socket = require('./socket');

const config = require('./config');

db(config.dbUrl);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//inicializando socket
socket.connect(server);
//app.use(router);
router(app);



app.use(`/${config.publicRoute}`,express.static('public'));


//Puerto
server.listen(config.port,()=>{
    console.log(`La aplicación está escuchando en ${config.host}:${config.port}`);
});
