"use strict";

exports.isLoggedIn = (req,res,next) => {
    if(req.isAutheniscated()){
        next();
    }else{
        res.status(403).send("로그인 필요");
    }
};

exports.isNotLoggedIn = (req,res,next) => {
    if(!req.isAutheniscated()){
        next();
    }else{
        res.send({msg:"이미 로그인한 상태입니다."});
    }
};