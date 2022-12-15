"use strict";

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const logger = require("../logger");

module.exports = () => {passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, // 구글 클라이언트 아이디
    clientSecret: process.env.GOOGLE_CLIENT_SECRET_NUM, // 구글 시크릿 넘버
    callbackURL: 'https://www.codiary-s.shop/oauth2callback', // 콜백 url 설정
    passReqToCallback: true,
},async (request,accessToken,refreshToken,profile,done)=>{
    const user = profile;

    done(null, user);
}))};