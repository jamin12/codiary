"use strict";

exports.isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        // 로그인 필요 url 설정
        res.status(403).send("로그인 필요");
    }
};

exports.isNotLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        next();
    }else{
        // TODO: 로그인 필요 없음 url 설정
        res.send({msg:"이미 로그인한 상태입니다."});
    }
};