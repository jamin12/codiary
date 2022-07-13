"use strict";


// 모듈
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const session = require("express-session");
const mysqlstore = require("express-mysql-session")(session);
const logger = require('./src/config/logger');
const error_handler = require('./src/util/Error/errorHandler');

const app = express();
dotenv.config();

const home = require("./src/routes/home");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(morgan("tiny",{stream:logger.stream}))
app.use(cookieParser());

const option = {
    host: process.env.SESSION_DB_HOST,
    port: process.env.SESSION_DB_PORT,
    user: process.env.SESSION_DB_USER,
    password: process.env.SESSION_DB_PASSWORD,
    database: process.env.SESSION_DB_DATABASE,
    expiration: 1000 * 60 * 60 * 2,
    clearExpired: true,
    checkExpirationInterval: 900000,
};

// express session 설정
app.use(session({
    secret: process.env.COOKIE_SECRET, // 세션을 암호화 해줌
    name: "authentication", // 쿠키 이름 설정
    resave: false, // 세션을 항상 저장할지 여부를 정하는 값(false 권장)
    saveUninitialized: true, // 초기화 되지 않은 채 스토어에 저장되는 세션
    store: new mysqlstore(option),
}));

// passport 설정 (위에서 설정하면 model에서 에러가 남.....)
const passportConfig = require('./src/passport/index');
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

// 라우팅
app.use("/",home); // use -> 미들웨어를 등록해주는 메서드.

// 에러 핸들러 미들웨어 설정
app.use(error_handler);

module.exports = app;
