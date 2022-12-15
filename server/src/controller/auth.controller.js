const logger = require('../config/logger');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const resultDto = require('../dto/resultDTO');
const httpStatus = require('http-status');
const { userService } = require("../service/index")

const uService = new userService();

const output = {
	index: catchAsync(async (req, res) => {
		res.redirect("https://www.codiary.shop/authenti/login");
	}),
	loginSuccess: catchAsync(async (req, res) => {
		const getUser = await uService.getUserByUserId(req.user?.user_id);

		res.send(resultDto(httpStatus.OK, "login success", {
			uniqueid: getUser?.user_detail?.user_unique_id,
			user_role: getUser?.user_role,
			user_img: getUser?.user_detail?.user_img
		}))
	}),

	loginfail: catchAsync(async (req, res) => {
		res.send(resultDto(httpStatus.INTERNAL_SERVER_ERROR, "login failed"));
	}),

	logout: catchAsync((req, res) => {
		req.session.destroy();
		res.send(resultDto(httpStatus.OK, "logout success"));
	}),
};

const input = {
	login: passport.authenticate('google', { scope: ['email', 'profile'] }),

	oauth2callback: passport.authenticate('google', {
		// 로그인 정보를 가져가기 위해 https://www.codiary-s.shop/ 리다이렉트
		successRedirect: 'https://www.codiary-s.shop',
		failureRedirect: '/fail',
	}),
};

module.exports = {
	output,
	input,
};
