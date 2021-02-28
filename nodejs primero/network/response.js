//respuesta correcta
exports.success = (req,res,message,status)=>{
    //si no me viene un status mandame un 200
    res.status(status || 200).send({
        error:'',
        body:message
    });
}

exports.error = (req,res,message,status)=>{
    res.status(status||500).send({
        error:message,
        body:''
    });
}