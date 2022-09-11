const httpStatus = require("http-status");
const { posts, users, user_detail } = require("../models/index");
const CustomError = require("../utils/Error/customError");
const Paging = require("../utils/paging");
const { Op } = require("sequelize");
const postDto = require("../dto/postsDto");

class manageService {
	constructor() {
		this.paging = new Paging();
	}

}

module.exports = manageService;
