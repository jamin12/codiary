const logger = require('../config/logger');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const resultDto = require('../dto/resultDTO');
const httpStatus = require('http-status');
const {userService} = require("../service/index")

const uService = new userService();

const output = {
	index: catchAsync(async (req, res) => {
		const getUser = await uService.getUserByUserId(req.user?.user_id);
		res.cookie("uniqueid", getUser?.user_detail?.user_unique_id);
		res.redirect("http://127.0.0.1:4000/");
	}),

	loginfail: catchAsync(async (req, res) => {
		res.send(resultDto(httpStatus.INTERNAL_SERVER_ERROR, "login failed"));
	}),

	logout: catchAsync((req, res) => {
		req.session.destroy();
		res.send('http://jamin2.shop');
	}),
};

const input = {
	login: passport.authenticate('google', { scope: ['email', 'profile'] }),

	oauth2callback: passport.authenticate('google', {
		successRedirect: 'http://127.0.0.1:3000/',
		failureRedirect: '/fail',
	}),
};

module.exports = {
	output,
	input,
};
