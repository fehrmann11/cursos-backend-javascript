const statusMessages = {
    '200':'Done',
    '201':'Created',
    '400':'Invalid format',
    '500':'Internal error'
}

//respuesta correcta
exports.success = (req,res,message,status)=>{
    //si no me viene un status mandame un 200

    let statusCode = status;
    let StatusMessage = message;
    if(!status){
        status = 200;
    }
    if(!message){
        statusMessage = statusMessages[status];
    }
    res.status(statusCode).send({
        error:'',
        body:StatusMessage
    });
}

exports.error = (req,res,message,status,details)=>{
    //detalles del error
    console.error('[response error]'+details);
    res.status(status||500).send({
        error:message,
        body:''
    });
}