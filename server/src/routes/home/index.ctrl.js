"use strict";


const logger = require("../../config/logger");
const passport = require("passport");
// const modle = require("../../models/index");

const output = {
    index: (req,res) => {
        // modle.users.create({
        //     user_name: "1234",
        //     user_unique_id : "ttest"
        // })
        // res.json({test:"hihi"});
    },
    login: (req,res) => {
        let s_html = '<html>';
        s_html += '<head></head>';
        s_html += '<body>';
        s_html += '<a href="http://127.0.0.1:3000/oauth2">로그인</a>';
        s_html += req.user;
        s_html += "</body>";
        s_html += "</html>";
        res.send(s_html);
    },
    oauth2: passport.authenticate('google',{ scope: ['email', 'profile'] }),
    //콜백 테스트용
    oauth2callback: passport.authenticate('google',{
        successRedirect: "/login",
        failureRedirect: "/login"
    }),
}

module.exports = {
    output,
}