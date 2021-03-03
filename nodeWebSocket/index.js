//npm i express socket.io
const express = require('express');
const app = express();

//servidor de node con express
const server = require('http').Server(app);

const io = require('socket.io')(server);

//nos mandará un mensaje aquí
app.use(express.static('public'));


//conexión
io.on('connection',(socket)=>{
    console.log('Nuevo cliente conectado');
    socket.emit('mensaje','Bienvenido!!');
});

//se puede enviar a todos los usuarios
setInterval(() => {
    io.emit('mensaje','Hola, les escribo a todos');
}, 3000);

server.listen(8080, ()=>{
    console.log("servidor iniciado en http://localhost:8080");
});