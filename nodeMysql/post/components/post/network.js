const express = require('express');
const auth = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

const list = (req,res,next) =>{
    Controller.list()
        .then(data=>{
            response.success(req,res,data,200);
        })
        .catch(next);
}

const getPost = (req,res,next) => {
    Controller.listId(req.params.id)
        .then(post=>{
            response.success(req,res,post,200);
        })
        .catch(next);
}

const upsert = (req,res,next) =>{
    Controller.upsert(req.body,req.user)
        .then(resp=>{
            response.success(req,res,resp,201);
        })
        .catch(next);
}

const like = (req,res,next)=>{
    Controller.like(req.params.id,req.user.sub)
        .then(post=>{
            response.success(req,res,post,201);
        })
        .catch(next);
}

router.get('/',auth('list'),list);
router.get('/:id',auth('get'),getPost);
router.post('/',auth('add'),upsert);
router.post('/:id/like', auth('add'), like);



module.exports = router;