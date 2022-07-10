"use strict";

const passport = require("passport");
const google = require("./GoogleStrategy");
const logger = require("../config/logger");
const model = require("../models/index");

module.exports = () => {
    // 
    passport.serializeUser(async (user,done)=>{
        await model.users.findOne({where :{user_id: user.id}})
        .then(async (user) => {
            // 유저가 없을 경우 새로운 유저를 만들어줌
            if(!user){
                // user 테이블에 데이터 삽입
                await model.users.create({
                    user_id: user.id,
                    user_unique_id: user.displayName,
                    user_email: user.email,
                    user_name: user.displayName,
                    user_role: "user",
                    user_picture: user.picture,
                })
                .then()
                .catch(logger.error("users dont create"));
                // sns_info 테이블에 데이터 삽입
                await model.sns_info.create({
                    user_id: user.id,
                    sns_type: user.provider,
                    sns_name: user.displayName,
                    sns_profile: user.picture
                })
                .then()
                .catch(logger.error("sns_info dont create"));
                req.registerUser = true;
            }
        });
        done(null, user.id);

    });
    
    passport.deserializeUser((id,done)=>{
        logger.info(`user : ${id}`);
        done(null, id);
    });
    
    google();
};