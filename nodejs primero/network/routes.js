const express = require('express');
const message = require('../components/message/network');
//ocupame a mi mismo pero con /message
const routes = (server)=>{
    server.use('/message',message);
}

module.exports = routes;