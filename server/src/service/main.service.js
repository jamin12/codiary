const httpStatus = require("http-status");
const { contents, users, user_detail } = require("../models/index");
const CustomError = require("../utils/Error/customError");
const Paging = require("../utils/paging");
const { Op } = require("sequelize");
class MainService {
	constructor() {
		this.paging = new Paging();
	}

	// 인기 게시글 조회
	async getPopularContents(...params) {
		const pageResult = this.paging.pageResult(params[0], params[1]);
		const result_contents = await contents.findAll({
			attributes: [
				"contents_id",
				"contents_title",
				"contents_body_md",
				"contents_body_html",
				"contents_txt"
			],
			order: [["like_count", "DESC"]],
			offset: pageResult.offset,
			limit: pageResult.limit,
		});
		if (result_contents.length === 0) {
			throw new CustomError(httpStatus.BAD_REQUEST, "not found contents");
		}
		return result_contents;
	}

	// 게시글 검색
	async searchContentsInMain(searchWord) {
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
				[Op.or]: [
					{"contents_title": {
						[Op.substring]: searchWord
					}},
					{"contents_txt": {
						[Op.substring]: searchWord
					}}
				]
			}
		});

		return searchedContents;
	}
}

module.exports = MainService;
