const logger = require('../config/logger');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const resultDto = require('../dto/resultDTO');
const httpStatus = require('http-status');

const output = {
	index: catchAsync(async (req, res) => {
		res.send(resultDto(httpStatus.OK, "login success"));
	}),

	loginfail: catchAsync(async (req, res) => {
		res.send(resultDto(httpStatus.INTERNAL_SERVER_ERROR, "login failed"));
	}),

	logout:catchAsync((req, res) => {
		req.session.destroy();
		// TODO: 로그아웃 url 지정
		res.send('/');
	}),
};

const input = {
	login: passport.authenticate('google', { scope: ['email', 'profile'] }),

	// TODO: 성공 실패 url 수정
	oauth2callback: passport.authenticate('google', {
		successRedirect: 'http://127.0.0.1:4000',
		failureRedirect: '/fail',
	}),
};

module.exports = {
	output,
	input,
};
