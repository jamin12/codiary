const passport = require('passport');
const google = require('./GoogleStrategy');
const logger = require('../logger');
const model = require('../../models/index');
const UserService = require('../../service/user.service');

module.exports = () => {
    // 세션에 저장 로그인이 최초로 성공했을 때만 호출되는 함수
    passport.serializeUser(async (user,done)=>{
        const userService = new UserService();
        await model.users.findOne({where :{user_id: user.id}})
        .then(async (finduser) => {
            // 유저가 없을 경우 새로운 유저를 만들어줌
            if(!finduser){
                await userService.createUser(user);
                // TODO: 카테고리 생성
                finduser = await model.users.findOne({where :{user_id: user.id}})
            }
            done(null, finduser)
        })
        .catch((err) => {
            done(err, null)
        });
    });
    
    // 사용자가 페이지를 방문할 때마다 호추로디는 함수
    passport.deserializeUser((id,done)=>{
        done(null, id);
    });
    
    google();
};