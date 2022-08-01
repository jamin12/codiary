"use strict";

const logger = require("../config/logger");
const passport = require("passport");

const output = {
	index: async (req, res, next) => {
		res.json({ test: "hihi", userid: req.user });
	},

	logout: (req, res) => {
		req.session.destroy();
		// TODO: 로그아웃 url 지정
		res.send("/");
	},
};

const input = {
	login: passport.authenticate("google", { scope: ["email", "profile"] }),

	// TODO: 성공 실패 url 수정
	oauth2callback: passport.authenticate("google", {
		successRedirect: "/",
		failureRedirect: "/",
	}),
};

module.exports = {
	output,
	input,
};
