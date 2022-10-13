"use strict";

// 모듈
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const mysqlstore = require("express-mysql-session")(session);
const logger = require("./src/config/logger");
const { errorConverter, errorHandler } = require("./src/middleware/error");
const config = require("./src/config/config");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const compression = require("compression");
const { authLimiter } = require("./src/middleware/rateLimiter");
const CustomError = require("./src/utils/Error/customError");
const httpStatus = require("http-status");

const app = express();
dotenv.config();

const home = require("./src/routes");

// Access-Control-Allow-Credentials에러 해결
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", true);
	next();
});

// set security HTTP headers
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(morgan("tiny", { stream: logger.stream }));
app.use(cookieParser());

// express session 설정
app.use(
	session({
		secret: process.env.COOKIE_SECRET, // 세션을 암호화 해줌
		name: "authentication", // 쿠키 이름 설정
		resave: false, // 세션을 항상 저장할지 여부를 정하는 값(false 권장)
		saveUninitialized: true, // 초기화 되지 않은 채 스토어에 저장되는 세션
		store: new mysqlstore(config.session),
	})
);

// TODO: 이것도 공부
// gzip compression(보내는 데이터 압축을 통해 빠른 데이터 전송이 가능하게 해준다)
app.use(compression());

app.use(xss());

// enable cors
app.use(
	cors({
		origin: ["http://127.0.0.1:3001", "http://localhost:3001"], // 출처 허용 옵션
		credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
		preflightContinue: false,
		optionsSuccessStatus: 204,
	})
);
// app.options('*', cors());

// passport 설정 (위에서 설정하면 model에서 에러가 남.....)
const passportConfig = require("./src/config/passport/index");
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

// 라우팅
app.use("/", home); // use -> 미들웨어를 등록해주는 메서드.

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
	next(new CustomError(httpStatus.NOT_FOUND, "page not found"));
});

// 에러 핸들러 미들웨어 설정
// API 에러로 변환
app.use(errorConverter);

// 에러 핸들러
app.use(errorHandler);

module.exports = app;
