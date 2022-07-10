"use strict";


const logger = require("../../config/logger");
const passport = require("passport");
// const modle = require("../../models/index");

const output = {
    index: (req,res) => {
        console.log(req.user);
        res.json({test:"hihi", userid: req.user});
    },
    login: (req,res) => {  
        // TODO: 테스트 로그인 버튼 삭제
        let s_html = '<html>';
        s_html += '<head></head>';
        s_html += '<body>';
        s_html += '<a href="http://127.0.0.1:3000/oauth2">로그인</a>';
        s_html += '</br><a href="http://127.0.0.1:3000/logout">로그아웃</a>';
        s_html += req.user;
        s_html += "</body>";
        s_html += "</html>";
        res.send(s_html);
    },
    logout: (req,res) => {
        req.session.destroy();
        // TODO: 로그아웃 url 지정
        res.send("logout");
    },
    oauth2: passport.authenticate('google',{ scope: ['email', 'profile'] }),
    // TODO: 성공 실패 url 수정
    oauth2callback: passport.authenticate('google',{
        successRedirect: "/login",
        failureRedirect: "/login"
    }),
}

module.exports = {
    output,
}