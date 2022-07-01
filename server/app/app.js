"use strict";


// 모듈
const express = require('express');
const app = express();

// 라우팅
const home = require("./src/routes/home");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
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