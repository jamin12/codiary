const httpStatus = require("http-status");
const { posts, users, user_detail } = require("../models/index");
const CustomError = require("../utils/Error/customError");
const Paging = require("../utils/paging");
const { Op } = require("sequelize");
class MainService {
	constructor() {
		this.paging = new Paging();
	}

	// 인기 게시글 조회
	async getPopularPosts(...params) {
		const pageResult = this.paging.pageResult(params[0], params[1]);
		const result_contents = await posts.findAll({
			attributes: [
				"post_id",
				"post_title",
				"post_body_md",
				"post_body_html",
				"post_txt"
			],
			order: [["like_count", "DESC"]],
			offset: pageResult.offset,
			limit: pageResult.limit,
		});
		if (result_contents.length === 0) {
			throw new CustomError(httpStatus.BAD_REQUEST, "not found posts");
		}
		return result_contents;
	}

	// 게시글 검색
	async searchPostsInMain(searchWord, ...params) {
		const pageResult = this.paging.pageResult(params[0], params[1]);
		const searchedContents = await posts.findAll({
			attributes: [
				"post_id",
				"post_title",
				"post_txt",
				"post_body_html"
			],
			include: [
				{
					model: users,
					as: "users",
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
					{"post_title": {
						[Op.substring]: searchWord
					}},
					{"post_txt": {
						[Op.substring]: searchWord
					}}
				]
			},
			order: [["like_count", "DESC"]],
			offset: pageResult.offset,
			limit: pageResult.limit,
		});
		return searchedContents;
	}
}

module.exports = MainService;
