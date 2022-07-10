"use strict";


// 모듈
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const session = require("express-session");
const logger = require('./src/config/logger');

const app = express();
dotenv.config();

const home = require("./src/routes/home");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(morgan("tiny",{stream:logger.stream}))
app.use(cookieParser());

// express session 설정
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true
}));

// passport 설정 (위에서 설정하면 model에서 에러가 남.....)
const passportConfig = require('./src/passport/index');
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

// 라우팅
app.use("/",home); // use -> 미들웨어를 등록해주는 메서드.

module.exports = app;


// const http = require('http');
// const app = http.createServer((req,res) => {
//     res.writeHead(200,{"Content-Type": "text/html"});
//     if(req.url === "/"){
//         res.end("여기는 루트입니다.");
//     }
// });

// app.listen(3001,()=>{
//     console.log('Server listening on port 3001');
// });