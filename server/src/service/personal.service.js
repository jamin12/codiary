const httpStatus = require("http-status");
const { 
	posts, 
	category, 
	users, 
	user_detail, 
	posts_update_history,
	temporary_posts
} = require("../models/index");
const CustomError = require("../utils/Error/customError");
const Paging = require("../utils/paging");
const { userService } = require("./index");
const { Op } = require("sequelize");
class PersonalService {
	constructor() {
		this.paging = new Paging();
		this.uService = new userService();
	}

	// 사용자 카테고리 목록
	async getPersonalCategory(uniqueId) {
		const user = await this.uService.getUserByUniqueId(uniqueId);
		const personalCategory = await category.findAll({
			attributes: ["category_id", "sub_category_id", "category_name"],
			where: {
				user_id: user.user_id,
			},
		});
		return personalCategory;
	}

	// 사용자 포스트 목록
	async getPsersonalPost(uniqueId, categoryId, ...paging) {
		const user = await this.uService.getUserByUniqueId(uniqueId);
		const pageResult = this.paging.pageResult(paging[0], paging[1]);
		const whereOptions = {
			user_id: user.user_id,
		};
		if (categoryId !== 0) whereOptions.category_id = categoryId;
		const personalposts = await posts.findAll({
			attributes: [
				"post_id",
				"post_title",
				"post_body_md",
				"post_body_html",
				"post_txt",
				"created_at",
				"updated_at"
			],
			where: whereOptions,
			order: [["updated_at", "DESC"]],
			offset: pageResult.offset,
			limit: pageResult.limit,
		});

		return personalposts;
	}

	// 사용자 날짜 별 포스트 목록
	async getPersonalPostByDate(uniqueId, startDate, endDate) {
		const user = await this.uService.getUserByUniqueId(uniqueId);
		const whereOptions = {
			user_id: user.user_id,
			created_at: {
				[Op.between]: [startDate, endDate]
			}
		};
		const resultPost = await posts.findAll({
			attributes: [
				"post_id",
				"post_title",
				"post_body_md",
				"post_body_html",
				"post_txt",
				"created_at",
				"updated_at"
			],
			include: [
				{
					model: posts_update_history,
					as: "posts_update_history",
					attributes: [
						"post_id",
						"update_history"
					]
				}
			],
			where: whereOptions,
		})

		return resultPost;
	}

	// 임시 게시물 목록
	async getPersonalTmppost(userId){
		const tmpposts = await temporary_posts.findAll({
			attributes: [
				"tmppost_id",
				"tmppost_title",
				"tmppost_body_md",
				"tmppost_body_html",
				"tmppost_txt",
				"created_at",
				"updated_at"
			],
			where: {
				user_id: userId
			}
		});
		return tmpposts;
	}

	// 개인페이지 검색기능
	async searchPersonalposts(uniqueId, searchWord, ...paging) {
		const user = await this.uService.getUserByUniqueId(uniqueId);
		const pageResult = this.paging.pageResult(paging[0], paging[1]);
		const searchedposts = await posts.findAll({
			attributes: [
				"post_id",
				"post_title",
				"post_txt",
				"post_body_html",
				"created_at",
				"updated_at"
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
				user_id: user.user_id,
				[Op.or]: [
					{
						"post_title": {
							[Op.substring]: searchWord
						}
					},
					{
						"post_txt": {
							[Op.substring]: searchWord
						}
					}
				]
			},
			order: [["updated_at", "DESC"]],
			offset: pageResult.offset,
			limit: pageResult.limit,
		});

		return searchedposts;
	}
}

module.exports = PersonalService;
