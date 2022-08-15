const httpStatus = require("http-status");
const { contents, category, users, user_detail } = require("../models/index");
const CustomError = require("../utils/Error/customError");
const Paging = require("../utils/paging");
const { userService } = require("./index");
const { Op } = require("sequelize");

class PersonalService {
	constructor() {
		this.paging = new Paging();
		this.uService = new userService();
	}

	// 사용자 코디어리 
	async getPersonalContents(uniqueId, ...paging) {
		const user = await this.uService.getUserByUniqueId(uniqueId);
		const pageResult = this.paging.pageResult(paging[0], paging[1]);
		const resultCategory = await category.findAll({
			attributes: ["category_id", "sub_category_id", "category_name"],
			where: {
				user_id: user.user_id,
			},
		});
		const relustContents = await contents.findAll({
			attributes: [
				"contents_id",
				"contents_title",
				"contents_body_md",
				"contents_body_html",
				"contents_txt",
			],
			where:{
				user_id: user.user_id,
			},
			order: [["updated_at", "DESC"]],
			offset: pageResult.offset,
			limit: pageResult.limit,
		});

		return { resultCategory, relustContents };
	}

	// 개인페이지 검색기능
	async searchPersonalContents(uniqueId, searchWord, ...paging) {
		const user = await this.uService.getUserByUniqueId(uniqueId);
		const pageResult = this.paging.pageResult(paging[0], paging[1]);
		const searchedContents = await contents.findAll({
			attributes: [
				"contents_id",
				"contents_title",
				"contents_txt",
				"contents_body_html"
			],
			include: [
				{
					model: users,
					as: "user",
					attributes: ["user_email"],
					include: [
						{
							model: user_detail,
							as: "user_detail",
							attributes: [
								"user_name",
								"user_unique_id",
								"user_nickname",
								"user_img",
							],
						}
					]
				}
			],
			where: {
				user_id: user.user_id,
				[Op.or]: [
					{"contents_title": {
						[Op.substring]: searchWord
					}},
					{"contents_txt": {
						[Op.substring]: searchWord
					}}
				]
			},
			order: [["updated_at", "DESC"]],
			offset: pageResult.offset,
			limit: pageResult.limit,
		});

		return searchedContents;
	}
}

module.exports = PersonalService;
