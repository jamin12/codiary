"use strict";

const passport = require("passport");
const google = require("./GoogleStrategy");
const logger = require("../config/logger");
const model = require("../models/index");

module.exports = () => {
    // 세션에 저장 로그인이 최초로 성공했을 때만 호출되는 함수
    passport.serializeUser(async (user,done)=>{
        await model.users.findOne({where :{user_id: user.id}})
        .then(async (finduser) => {
            // 유저가 없을 경우 새로운 유저를 만들어줌
            if(!finduser){
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
                .catch(err => {
                    logger.error("users dont create")
                    done(err,null);
                });
                // sns_info 테이블에 데이터 삽입
                await model.sns_info.create({
                    user_id: user.id,
                    sns_type: user.provider,
                    sns_name: user.displayName,
                    sns_profile: user.picture
                })
                .then()
                .catch(err => {
                    logger.error("sns_info dont create");
                    done(err,null);
                });
                done(null,user.id ,{registerUser:true});
            }else{
                done(null,user.id);
            }
        }).catch(err => done(err,null));


    });
    
    // 사용자가 페이지를 방문할 때마다 호추로디는 함수
    passport.deserializeUser((id,done)=>{
        done(null, id);
    });
    
    google();
};