//es bueno tener todas las respuestas en el mismo archivo para que sean coherentes
exports.success = (req,res,message,status) =>{
    let statusCode = status || 200;
    let statusMessage = message || '';
    res.status(statusCode).send({
        error:false,
        status:status,
        body:message,
    });
}

exports.error = (req,res,message,status) =>{
    let statusCode = status || 500;
    let statusMessage = message || 'Internal server error';
    res.status(statusCode).send({
        error:false,
        status:status,
        body:statusMessage,
    });
}