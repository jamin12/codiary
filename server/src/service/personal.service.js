const httpStatus = require("http-status"),
	{
		posts,
		category,
		users,
		user_detail,
		posts_update_history,
		temporary_posts,
		visit_record,
		like_record,
		sequelize,
	} = require("../models/index"),
	CustomError = require("../utils/Error/customError"),
	Paging = require("../utils/paging"),
	{ userService } = require("./index"),
	{ Op } = require("sequelize"),
	postsDto = require("../dto/postsDto"),
	tmppostsDto = require("../dto/tmpPostDto"),
	visitRecordDto = require("../dto/visitRecordDto"),
	likeRecordDto = require("../dto/likeRecordDto"),
	postupdatehistory = require("../dto/postupdatehistory");

class PersonalService {
	constructor() {
		this.paging = new Paging();
		this.uService = new userService();
		this.userJoin = {
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
				},
			],
		};
		this.postJoin = {
			model: posts,
			as: "posts",
			attributes: postsDto.filter((data) => {
				const excludeColumn = ["category_id", "user_id", "like_count"];
				if (!excludeColumn.includes(data)) return data;
			}),
		};
	}

	/**
	 * 사용자 카테고리 목록 조회
	 * @param {string} userId
	 * @returns {Object}
	 */
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

	/**
	 * 사용자 포스트 목록 조회
	 * @param {string} uniqueId
	 * @param {number} categoryId
	 * @param {number[]} paging
	 * @returns {Object}
	 */
	async getPsersonalPost(uniqueId, categoryId, ...paging) {
		const user = await this.uService.getUserByUniqueId(uniqueId);
		const pageResult = this.paging.pageResult(paging[0], paging[1]);
		const whereOptions = {
			user_id: user.user_id,
		};
		if (categoryId !== 0) whereOptions.category_id = categoryId;
		const personalposts = await posts.findAll({
			attributes: postsDto.filter((data) => {
				const excludeColumn = ["category_id", "user_id", "like_count"];
				if (!excludeColumn.includes(data)) return data;
			}),
			where: whereOptions,
			order: [["updated_at", "DESC"]],
			offset: pageResult.offset,
			limit: pageResult.limit,
		});

		return personalposts;
	}

	/**
	 * 사용자 날짜 별 포스트 목록 조회
	 * @param {string} uniqueId
	 * @param {datetime} startDate
	 * @param {datetime} endDate
	 * @returns {Object}
	 */
	async getPersonalPostByDate(uniqueId, startDate, endDate) {
		const user = await this.uService.getUserByUniqueId(uniqueId);
		const whereOptions = {
			user_id: user.user_id,
			created_at: {
				[Op.between]: [startDate, endDate],
			},
		};
		const resultPost = await posts.findAll({
			attributes: postsDto.reduce((acc, cur) => {
				const excludeColumn = ["category_id", "user_id", "like_count"];
				if (!excludeColumn.includes(cur)) return acc.push(cur);
			}),
			include: [
				{
					model: posts_update_history,
					as: "posts_update_history",
					attributes: postupdatehistory,
				},
			],
			where: whereOptions,
		});

		return resultPost;
	}

	/**
	 * 임시 게시물 목록 조회
	 * @param {string} userId
	 * @returns {Object}
	 */
	async getPersonalTmppost(userId) {
		const tmpposts = await temporary_posts.findAll({
			attributes: tmppostsDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
			where: {
				user_id: userId,
			},
		});
		return tmpposts;
	}

	/**
	 * 사용자 방문 기록 조회
	 * @param {string} userId
	 * @param {number[]} paging
	 * @returns {Object}
	 */
	async getPsersonalVisitRecord(userId, ...paging) {
		const pageResult = this.paging.pageResult(paging[0], paging[1]);
		const whereOptions = {
			user_id: userId,
		};
		const personalposts = await visit_record.findAll({
			attributes: visitRecordDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
			include: [this.postJoin],
			where: whereOptions,
			order: [["updated_at", "DESC"]],
			offset: pageResult.offset,
			limit: pageResult.limit,
		});

		return personalposts;
	}

	/**
	 * 사용자 좋아요 기록 조회
	 * @param {string} userId
	 * @param {number[]} paging
	 * @returns {Object}
	 */
	async getPsersonalLikeRecord(userId, ...paging) {
		const pageResult = this.paging.pageResult(paging[0], paging[1]);
		const whereOptions = {
			user_id: userId,
		};
		const personalposts = await like_record.findAll({
			attributes: likeRecordDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
			include: [this.postJoin],
			where: whereOptions,
			order: [["updated_at", "DESC"]],
			offset: pageResult.offset,
			limit: pageResult.limit,
		});

		return personalposts;
	}

	/**
	 * 개인페이지 검색기능
	 * @param {string} uniqueId
	 * @param {string} searchWord
	 * @param {number} searchType 어느 페이지에서 검색 할 것인지
	 * @param {number[]} paging
	 * @returns {Object}
	 */
	async searchPersonalposts(uniqueId, searchWord, searchType, ...paging) {
		const user = await this.uService.getUserByUniqueId(uniqueId);
		const pageResult = this.paging.pageResult(paging[0], paging[1]);
		let myAttributes = [];
		let whereOptions = {};
		let includeOptions = [];
		// 개인 게시물 페이지에서 검색
		if (searchType === 0) {
			searchType = posts;
			myAttributes = postsDto.filter((data) => {
				const excludeColumn = ["category_id", "user_id", "like_count"];
				if (!excludeColumn.includes(data)) return data;
			});
			whereOptions = {
				user_id: user.user_id,
				[Op.or]: [
					{
						post_title: {
							[Op.substring]: searchWord,
						},
					},
					{
						post_txt: {
							[Op.substring]: searchWord,
						},
					},
				],
			};
			includeOptions.push(this.userJoin);
		}
		// 개인 임시저장 페이지에서 검색
		else if (searchType === 1) {
			searchType = temporary_posts;
			myAttributes = tmppostsDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			});
			whereOptions = {
				user_id: user.user_id,
				[Op.or]: [
					{
						tmppost_title: {
							[Op.substring]: searchWord,
						},
					},
					{
						tmppost_txt: {
							[Op.substring]: searchWord,
						},
					},
				],
			};
		}
		// 개인 방문 목록에서 검색
		else if (searchType === 2) {
			searchType = visit_record;
			myAttributes = visitRecordDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			});
			this.postJoin.include = [this.userJoin];
			this.postJoin.where = {
				[Op.or]: [
					{
						post_title: {
							[Op.substring]: searchWord,
						},
					},
					{
						post_txt: {
							[Op.substring]: searchWord,
						},
					},
				],
			};
			whereOptions = {
				user_id: user.user_id,
			};
			includeOptions.push(this.postJoin);
		}
		// 개인 좋아요 목록에서 검색
		else if (searchType === 3) {
			searchType = like_record;
			myAttributes = likeRecordDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			});
			this.postJoin.include = [this.userJoin];
			this.postJoin.where = {
				[Op.or]: [
					{
						post_title: {
							[Op.substring]: searchWord,
						},
					},
					{
						post_txt: {
							[Op.substring]: searchWord,
						},
					},
				],
			};
			whereOptions = {
				user_id: user.user_id,
			};
			includeOptions.push(this.postJoin);
		}
		const searchedposts = await searchType.findAll({
			attributes: myAttributes,
			include: includeOptions,
			where: whereOptions,
			order: [["updated_at", "DESC"]],
			offset: pageResult.offset,
			limit: pageResult.limit,
		});
		return searchedposts;
	}
}

module.exports = PersonalService;
