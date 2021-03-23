const express = require("express");
const response = require('../network/response');
const Store = require('../store/redis');
const router = express.Router();


/*Esto sirve para todas las peticiones que hagamos va ha hacer una
petición directa a la base de datos  esto tiene potencial para no 
preocuparnos de como van a ser las funciones, los datos, etc. */

const list = async(req,res,next) =>{
    const data = await Store.list(req.params.tabla);
    response.success(req,res,data,200);
}

const get = async(req,res,next) =>{
    const data = await Store.get(req.params.tabla,req.params.id);
    response.success(req,res,data,200);
}

const upsert = async(req,res,next) =>{
    const data = await Store.upsert(req.params.tabla,req.body);
    response.success(req,res,data,200);
}



//una función por cada tabla
router.get('/:tabla',list);
router.get('/:tabla/:id',get);
router.put('/:tabla',upsert);




module.exports = router;