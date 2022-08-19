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
		comments,
		tag,
		measurement,
	} = require("../models/index"),
	CustomError = require("../utils/Error/customError"),
	Paging = require("../utils/paging"),
	{ userService } = require("./index"),
	{ Op } = require("sequelize"),
	postsDto = require("../dto/postsDto"),
	tmppostsDto = require("../dto/tmpPostDto"),
	visitRecordDto = require("../dto/visitRecordDto"),
	likeRecordDto = require("../dto/likeRecordDto"),
	postupdatehistoryDto = require("../dto/postupdatehistoryDto"),
	commentsDto = require("../dto/commentsDto"),
	tagDto = require("../dto/tagDto"),
	categoryDto = require("../dto/categoryDto"),
	measurementDto = require("../dto/measurmentDto");

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
	 * 게시물 존재 유무 체크
	 * @param {number} postId
	 */
	async checkPostExists(postId) {
		const result = await posts.findOne({
			where: {
				post_id: postId,
			},
		});
		if (!result)
			throw new CustomError(httpStatus.BAD_REQUEST, "Post not found");
	}

	/**
	 * 사용자 게시물 조회
	 * @param {string} userId
	 * @param {number} postId
	 * @returns {Object}
	 */
	async getPersonalPost(uniqueId, postId) {
		const user = await this.uService.getUserByUniqueId(uniqueId);
		const getPost = await posts.findOne({
			attributes: postsDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
			where: {
				user_id: user.user_id,
				post_id: postId,
			},
			include: [
				{
					model: comments,
					as: "comments",
					attributes: commentsDto.filter((data) => {
						const excludeColumn = ["user_id"];
						if (!excludeColumn.includes(data)) return data;
					}),
					include: [this.userJoin],
				},
				{
					model: tag,
					as: "tag",
					attributes: tagDto.filter((data) => {
						const excludeColumn = ["user_id"];
						if (!excludeColumn.includes(data)) return data;
					}),
				},
				{
					model: category,
					as: "category",
					attributes: categoryDto.filter((data) => {
						const excludeColumn = ["user_id"];
						if (!excludeColumn.includes(data)) return data;
					}),
					include: [
						{
							model: posts,
							as: "posts",
							attributes: ["post_id", "post_title"],
						},
					],
				},
				{
					model: measurement,
					as: "measurement",
					attributes: measurementDto,
				},
			],
		});
		if (!getPost)
			throw new CustomError(httpStatus.BAD_REQUEST, "post not found");
		return { getPost, user };
	}

	/**
	 * 사용자 카테고리 목록 조회
	 * @param {string} userId
	 * @returns {Object}
	 */
	async getPersonalCategory(uniqueId) {
		const user = await this.uService.getUserByUniqueId(uniqueId);
		return await category.findAll({
			attributes: ["category_id", "sub_category_id", "category_name"],
			where: {
				user_id: user.user_id,
			},
		});
	}

	/**
	 * 사용자 포스트 목록 조회
	 * @param {string} uniqueId
	 * @param {number} categoryId
	 * @param {number[]} paging
	 * @returns {Object}
	 */
	async getPersonalPosts(uniqueId, categoryId, ...paging) {
		const user = await this.uService.getUserByUniqueId(uniqueId);
		const pageResult = this.paging.pageResult(paging[0], paging[1]);
		const whereOptions = {
			user_id: user.user_id,
		};
		if (categoryId !== 0) whereOptions.category_id = categoryId;
		return await posts.findAll({
			attributes: postsDto.filter((data) => {
				const excludeColumn = ["category_id", "user_id", "like_count"];
				if (!excludeColumn.includes(data)) return data;
			}),
			where: whereOptions,
			order: [["updated_at", "DESC"]],
			offset: pageResult.offset,
			limit: pageResult.limit,
		});
	}

	/**
	 * 사용자 날짜 별 포스트 목록 조회
	 * @param {string} uniqueId
	 * @param {datetime} startDate
	 * @param {datetime} endDate
	 * @returns {Object}
	 */
	async getPersonalPostsByDate(uniqueId, startDate, endDate) {
		const user = await this.uService.getUserByUniqueId(uniqueId);
		const whereOptions = {
			user_id: user.user_id,
			created_at: {
				[Op.between]: [startDate, endDate],
			},
		};
		return await posts.findAll({
			attributes: postsDto.filter((data) => {
				const excludeColumn = ["category_id", "user_id", "like_count"];
				if (!excludeColumn.includes(data)) return data;
			}),
			include: [
				{
					model: posts_update_history,
					as: "posts_update_history",
					attributes: postupdatehistoryDto,
				},
			],
			where: whereOptions,
		});
	}

	/**
	 * 임시 게시물 목록 조회
	 * @param {string} userId
	 * @returns {Object}
	 */
	async getPersonalTmpposts(userId) {
		return await temporary_posts.findAll({
			attributes: tmppostsDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
			where: {
				user_id: userId,
			},
		});
	}

	/**
	 * 임시 게시물 저장
	 * @param {string} userId
	 * @param {object} tmpPostBody temporary_posts 테이블에 들어갈 정보
	 * @returns {Object}
	 */
	async createPersonalTmpPost(userId, tmpPostBody) {
		tmpPostBody.user_id = userId;
		return await temporary_posts.create(tmpPostBody);
	}

	/**
	 * 임시 게시물 수정
	 * @param {string} userId
	 * @param {number} tmpPostId
	 * @param {object} tmpPostBody temporary_posts 테이블에 들어갈 정보
	 * @returns {Object}
	 */
	async updatePersonalTmpPost(userId, tmpPostId, tmpPostBody) {
		const result = await temporary_posts.findOne({
			attributes: tmppostsDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
			where: {
				user_id: userId,
				tmppost_id: tmpPostId,
			},
		});
		if (!result)
			throw new CustomError(httpStatus.BAD_REQUEST, "post not found");
		await temporary_posts.update(tmpPostBody, {
			where: {
				tmppost_id: tmpPostId,
			},
		});
		return await temporary_posts.findOne({
			attributes: tmppostsDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
			where: {
				tmppost_id: tmpPostId,
			},
		});
	}

	/**
	 * 임시 게시물 삭제
	 * @param {string} userId
	 * @param {number} tmpPostId
	 * @returns {Object}
	 */
	async deletePersonalTmpPost(userId, tmpPostId) {
		const result = await temporary_posts.findOne({
			attributes: tmppostsDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
			where: {
				user_id: userId,
				tmppost_id: tmpPostId,
			},
		});
		if (!result)
			throw new CustomError(httpStatus.BAD_REQUEST, "post not found");
		await temporary_posts.destroy({
			where: {
				tmppost_id: tmpPostId,
			},
		});
		return result;
	}

	/**
	 * 사용자 방문 기록 조회
	 * @param {string} userId
	 * @param {number[]} paging
	 * @returns {Object}
	 */
	async getPersonalVisitRecord(userId, ...paging) {
		const pageResult = this.paging.pageResult(paging[0], paging[1]);
		const whereOptions = {
			user_id: userId,
		};
		this.postJoin.include = [this.userJoin];
		return await visit_record.findAll({
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
	}

	/**
	 * 방문 기록 저장
	 * @param {string} userId
	 * @param {object} visitRecordBody visit_record 테이블에 들어갈 정보
	 * @returns {Object}
	 */
	async createPersonalVisitRecord(userId, visitRecordBody) {
		await this.checkPostExists(visitRecordBody.post_id);
		const result = await visit_record.findOne({
			attributes: visitRecordDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
			where: {
				user_id: userId,
				post_id: visitRecordBody.post_id,
			},
		});
		if (result) {
			return result;
		}
		visitRecordBody.user_id = userId;
		return await visit_record.create(visitRecordBody);
	}

	/**
	 * 방문 기록 삭제
	 * @param {string} userId
	 * @param {number} visitRecordId
	 * @returns {Object}
	 */
	async deletePersonalVisitRecord(userId, visitRecordId) {
		const result = await visit_record.findOne({
			attributes: visitRecordDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
			where: {
				user_id: userId,
				visit_record_id: visitRecordId,
			},
		});
		if (!result)
			throw new CustomError(httpStatus.BAD_REQUEST, "post not found");
		await visit_record.destroy({
			where: {
				visit_record_id: visitRecordId,
			},
		});
		return result;
	}

	/**
	 * 사용자 좋아요 기록 조회
	 * @param {string} userId
	 * @param {number[]} paging
	 * @returns {Object}
	 */
	async getPersonalLikeRecord(userId, ...paging) {
		const pageResult = this.paging.pageResult(paging[0], paging[1]);
		const whereOptions = {
			user_id: userId,
		};
		this.postJoin.include = [this.userJoin];
		return await like_record.findAll({
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
	}

	/**
	 * 좋아요 기록 저장
	 * @param {string} userId
	 * @param {object} likeRecordBody visit_record 테이블에 들어갈 정보
	 * @returns {Object}
	 */
	async createPersonalLikeRecord(userId, likeRecordBody) {
		await this.checkPostExists(likeRecordBody.post_id);
		const result = await like_record.findOne({
			attributes: likeRecordDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
			where: {
				user_id: userId,
				post_id: likeRecordBody.post_id,
			},
		});
		if (result) {
			return result;
		}
		likeRecordBody.user_id = userId;
		return await like_record.create(likeRecordBody);
	}

	/**
	 * 좋아요 기록 삭제
	 * @param {string} userId
	 * @param {number} likePostId
	 * @returns {Object}
	 */
	async deletePersonalLikeRecord(userId, likePostId) {
		const result = await like_record.findOne({
			attributes: likeRecordDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
			where: {
				user_id: userId,
				like_record_id: likePostId,
			},
		});
		if (!result)
			throw new CustomError(httpStatus.BAD_REQUEST, "post not found");
		await like_record.destroy({
			where: {
				like_record_id: likePostId,
			},
		});
		return result;
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

		return await searchType.findAll({
			attributes: myAttributes,
			include: includeOptions,
			where: whereOptions,
			order: [["updated_at", "DESC"]],
			offset: pageResult.offset,
			limit: pageResult.limit,
		});
	}
}

module.exports = PersonalService;
