"use strict";


const logger = require("../../config/logger");
const passport = require("passport");
// const modle = require("../../models/index");

const output = {
    index: (req,res) => {
        console.log(req.user);
        res.json({test:"hihi", userid: req.user});
    },
    login: passport.authenticate('google',{ scope: ['email', 'profile'] }),
    logout: (req,res) => {
        req.session.destroy();
        // TODO: 로그아웃 url 지정
        res.send("/");
    },
    // TODO: 성공 실패 url 수정
    oauth2callback: passport.authenticate('google',{
        successRedirect: "/",
        failureRedirect: "/"
    }),
}

module.exports = {
    output,
}