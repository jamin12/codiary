"use strict";

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const logger = require("../config/logger");

module.exports = () => {passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET_NUM,
    callbackURL: 'oauth2callback',
    passReqToCallback: true,
},async (request,accessToken,refreshToken,profile,done)=>{
    const user = profile;

    done(null, user);
}))};