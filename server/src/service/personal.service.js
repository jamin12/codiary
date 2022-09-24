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
	measurementDto = require("../dto/measurmentDto"),
	logger = require("../config/logger"),
	myDate = require("../utils/myDate"),
	myMath = require("../utils/myMath");

class PersonalService {
	constructor() {
		this.paging = new Paging();
		this.uService = new userService();
		this.myDate = new myDate();
		this.myMath = new myMath();

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
	 * 포스트 존재 유무 체크
	 * @param {number} postId
	 * @param {String} userId Optional (없어도됨)
	 * @returns {Object}
	 */
	async checkPostExists(postId, userId) {
		const whereOption = {
			post_id: postId,
		};
		if (userId) whereOption.user_id = userId;
		const result = await posts.findOne({
			where: whereOption,
		});
		if (!result)
			throw new CustomError(httpStatus.BAD_REQUEST, "Post not found");
		return result;
	}

	/**
	 * 카테고리 존재 유무 체크
	 * @param {string} userId
	 * @param {number} categoryId
	 * @returns {Object}
	 */
	async checkCategoryExists(userId, categoryId) {
		const result = await category.findOne({
			attributes: categoryDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
			where: {
				user_id: userId,
				category_id: categoryId,
			},
		});
		if (!result)
			throw new CustomError(httpStatus.BAD_REQUEST, "category not found");
		return result;
	}

	/**
	 * 댓글 존재 유무 체크
	 * @param {number} commentId
	 * @param {String} userId
	 * @returns {Object}
	 */
	async checkCommentExists(commentId, userId) {
		const whereOptions = {
			comments_id: commentId,
		};
		if (userId) whereOptions.user_id = userId;
		const result = await comments.findOne({
			attributes: commentsDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
			where: whereOptions,
		});
		if (!result)
			throw new CustomError(httpStatus.BAD_REQUEST, "comment not found");
		return result;
	}

	/**
	 * 사용자 카테고리 목록 조회
	 * @param {string} uniqueId
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
	 * 내 카테고리 목록 조회
	 * @param {string} userId
	 * @returns {Object}
	 */
	async getPersonalMyCategory(userId) {
		return await category.findAll({
			attributes: ["category_id", "sub_category_id", "category_name"],
			where: {
				user_id: userId,
			},
		});
	}

	/**
	 * 사용자 카테고리 생성
	 * @param {string} userId
	 * @param {Object} categoryBody
	 * @returns {Object}
	 */
	async createPersonalCategory(userId, categoryBody) {
		categoryBody.user_id = userId;
		if (categoryBody.sub_category_id) {
			const checkedCategory = await this.checkCategoryExists(
				userId,
				categoryBody.sub_category_id
			);
			if (checkedCategory.sub_category_id)
				throw new CustomError(
					httpStatus.BAD_REQUEST,
					"sub category already exists"
				);
		}
		const createdCategory = await category.create(categoryBody);
		return { category_id: createdCategory.category_id };
	}

	/**
	 * 사용자 카테고리 수정
	 * @param {string} userId
	 * @param {Object} categoryBody
	 * @returns {Object}
	 */
	async updatePersonalCategory(userId, categoryId, categoryBody) {
		const checkedCategory = await this.checkCategoryExists(
			userId,
			categoryId
		);
		if (categoryId === checkedCategory.sub_category_id) {
			throw new CustomError(
				httpStatus.BAD_REQUEST,
				"sub category and category are the same"
			);
		}
		if (categoryBody.sub_category_id) {
			await this.checkCategoryExists(
				userId,
				categoryBody.sub_category_id
			);
			if (checkedCategory.sub_category_id) {
				throw new CustomError(
					httpStatus.BAD_REQUEST,
					"sub category already exists"
				);
			}
		}
		await category.update(categoryBody, {
			where: {
				user_id: userId,
				category_id: categoryId,
			},
		});
		return;
	}

	/**
	 * 사용자 카테고리 삭제
	 * @param {string} userId
	 * @param {number} categoryId
	 * @returns {Object}
	 */
	async deletePersonalCategory(userId, categoryId) {
		await this.checkCategoryExists(userId, categoryId);
		try {
			await sequelize.transaction(async (t1) => {
				await category.destroy({
					where: {
						user_id: userId,
						sub_category_id: categoryId,
					},
				});
				await category.destroy({
					where: {
						user_id: userId,
						category_id: categoryId,
					},
				});
			});
		} catch (error) {
			logger.error(error.message);
			throw new CustomError(
				httpStatus.INTERNAL_SERVER_ERROR,
				"delete category error",
				false,
				error.stack
			);
		}

		return;
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
			include: [this.userJoin],
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
				this.userJoin,
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
	 * 사용자 포스트 조회
	 * @param {string} uniqueId
	 * @param {number} postId
	 * @param {String} userId
	 * @returns {Object}
	 */
	async getPersonalPost(uniqueId, postId, userId) {
		let user = await this.uService.getUserByUniqueId(uniqueId);
		let checkLike = false;
		// 좋아요를 했는지 안했는지 체크
		if (userId) {
			const checkLiked = await like_record.findOne({
				where: {
					user_id: userId,
					post_id: postId,
				},
			});
			if (checkLiked) {
				checkLike = true;
			}
		}
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
		await measurement.increment(
			{ today_visit_count: 1, total_visit_count: 1 },
			{ where: { post_id: postId } }
		);
		user = await this.uService.getUserByUserId(user.user_id);
		return { getPost, user, checkLike };
	}

	/**
	 * 사용자 포스트 생성
	 * @param {string} userId
	 * @param {Object} body
	 * @returns {Object}
	 */
	async createPersonalPost(userId, body) {
		body.post.user_id = userId;
		await this.checkCategoryExists(userId, body.post.category_id);
		const setTagList = new Set(body.tag.tag_name);
		let createdPost = null;
		body.tag.tag_name = [...setTagList];
		await sequelize.transaction(async (t1) => {
			createdPost = await posts.create(body.post);
			for (let index = 0; index < body.tag.tag_name.length; index++) {
				await tag.create({
					post_id: createdPost.post_id,
					tag_name: body.tag.tag_name[index],
				});
			}
			await measurement.create({
				post_id: createdPost.post_id,
			});
		});
		return { post_id: createdPost.post_id };
	}

	/**
	 * 사용자 포스트 수정
	 * @param {string} userId
	 * @param {number} postId
	 * @param {Object} body
	 * @returns {Object}
	 */
	async updatePersonalPost(userId, postId, body) {
		await this.checkPostExists(postId, userId);
		if (body.post.category_id)
			await this.checkCategoryExists(userId, body.post.category_id);
		await sequelize.transaction(async (t1) => {
			await posts.update(body.post, {
				where: {
					user_id: userId,
					post_id: postId,
				},
			});
			if (body.tag) {
				await tag.destroy({
					where: {
						post_id: postId,
					},
				});
				for (let index = 0; index < body.tag.tag_name.length; index++) {
					await tag.create({
						post_id: postId,
						tag_name: body.tag.tag_name[index],
					});
				}
			}
			await posts_update_history.create({
				post_id: postId,
				update_history: this.myDate.getDatetime(),
			});
		});
		return;
	}

	/**
	 * 사용자 포스트 삭제
	 * @param {string} userId
	 * @param {number} postId
	 * @returns {Object}
	 */
	async deletePersonalPost(userId, postId) {
		await this.checkPostExists(postId, userId);
		await posts.destroy({
			where: {
				user_id: userId,
				post_id: postId,
			},
		});
		return;
	}

	/**
	 * 임시 포스트 조회
	 * @param {string} userId
	 * @param {number} tmpPostId
	 * @returns {Object}
	 */
	async getPersonalTmppost(userId, tmpPostId) {
		const getTmpPost = await temporary_posts.findOne({
			attributes: tmppostsDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
			where: {
				user_id: userId,
				tmppost_id: tmpPostId,
			},
		});
		if (!getTmpPost) {
			throw new CustomError(httpStatus.BAD_REQUEST, "tmppost not found");
		}
		return getTmpPost;
	}

	/**
	 * 임시 포스트 목록 조회
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
	 * 임시 포스트 저장
	 * @param {string} userId
	 * @param {object} tmpPostBody temporary_posts 테이블에 들어갈 정보
	 * @returns {Object}
	 */
	async createPersonalTmpPost(userId, tmpPostBody) {
		tmpPostBody.user_id = userId;
		const createdTmpPost = await temporary_posts.create(tmpPostBody);
		return { tmppost_id: createdTmpPost.tmppost_id };
	}

	/**
	 * 임시 포스트 수정
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
		return;
	}

	/**
	 * 임시 포스트 삭제
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
		return;
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
			await visit_record.update(visitRecordBody, {
				where: {
					user_id: userId,
					post_id: visitRecordBody.post_id,
				},
			});
			return { visit_record_id: result.visit_record_id };
		}
		visitRecordBody.user_id = userId;
		const createdVisitRecord = await visit_record.create(visitRecordBody);
		return { visit_record_id: createdVisitRecord.visit_record_id };
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
			throw new CustomError(
				httpStatus.BAD_REQUEST,
				"visit record not found"
			);
		await visit_record.destroy({
			where: {
				visit_record_id: visitRecordId,
			},
		});
		return;
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
	 * @param {object} likeRecordBody like_record 테이블에 들어갈 정보
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
			await like_record.update(likeRecordBody, {
				where: {
					user_id: userId,
					post_id: likeRecordBody.post_id,
				},
			});
			return {
				like_record_id: result.like_record_id,
			};
		}
		await posts.increment(
			{ like_count: 1 },
			{ where: { post_id: likeRecordBody.post_id } }
		);
		likeRecordBody.user_id = userId;
		const createdLikeRecord = await like_record.create(likeRecordBody);
		return {
			like_record_id: createdLikeRecord.like_record_id,
		};
	}

	/**
	 * 좋아요 기록 포스트 아이디로 삭제
	 * @param {string} userId
	 * @param {int} postId
	 * @returns {Object}
	 */
	async deletePersonalLikeRecordByPostId(userId, postId) {
		const result = await like_record.findOne({
			attributes: likeRecordDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
			where: {
				user_id: userId,
				post_id: postId,
			},
		});
		if (!result)
			throw new CustomError(httpStatus.BAD_REQUEST, "post not found");
		await posts.decrement(
			{ like_count: 1 },
			{ where: { post_id: postId } }
		);
		await like_record.destroy({
			where: {
				user_id: userId,
				post_id: postId,
			},
		});
		return;
	}

	/**
	 * 좋아요 기록 삭제
	 * @param {string} userId
	 * @param {number} likeRecordId
	 * @returns {Object}
	 */
	async deletePersonalLikeRecord(userId, likeRecordId) {
		const result = await like_record.findOne({
			attributes: likeRecordDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
			where: {
				user_id: userId,
				like_record_id: likeRecordId,
			},
		});
		// if (!result)
		// 	throw new CustomError(httpStatus.BAD_REQUEST, "post not found");
		await posts.decrement(
			{ like_count: 1 },
			{ where: { post_id: result.post_id } }
		);
		await like_record.destroy({
			where: {
				like_record_id: likeRecordId,
			},
		});
		return;
	}

	/**
	 * 댓글 생성
	 * @param {string} uniqueId
	 * @param {Object} commentBody
	 * @returns {Object}
	 */
	async createCommnet(userId, commentBody) {
		commentBody.user_id = userId;
		await this.checkPostExists(commentBody.post_id);

		if (commentBody.sub_comments_id) {
			const checkComment = await this.checkCommentExists(
				commentBody.sub_comments_id
			);
			if (checkComment.sub_comments_id) {
				throw new CustomError(
					httpStatus.BAD_REQUEST,
					"sub commnet already exists"
				);
			}
		}
		const createdComment = await comments.create(commentBody);
		return {
			comments_id: createdComment.comments_id,
		};
	}

	/**
	 * 댓글 수정
	 * @param {string} uniqueId
	 * @param {number} commentId
	 * @param {Object} commentBody
	 * @returns {Object}
	 */
	async updateCommnet(userId, commentId, commentBody) {
		await this.checkCommentExists(commentId, userId);
		/* const user = this.uService.getUserByUniqueId(commentBody.unique_id);
		if (user.user_id !== userId) {
			throw new CustomError(
				httpStatus.BAD_REQUEST,
				"can not update comment, have no authority"
			);
		}
		if (commentBody.sub_comments_id) {
			if (commentBody.comments_id === commentBody.sub_comments_id) {
				throw new CustomError(
					httpStatus.BAD_REQUEST,
					"comments  and sub comments are the same"
				);
			}
			const checkComment = this.checkCommentExists(
				commentBody.postId,
				commentBody.sub_comments_id
			);
			if (checkComment.sub_comments_id) {
				throw new CustomError(
					httpStatus.BAD_REQUEST,
					"sub commnet already exists"
				);
			}
		}*/
		await comments.update(commentBody, {
			where: {
				user_id: userId,
				comments_id: commentId,
			},
		});
		return;
	}

	/**
	 * 댓글 삭제
	 * @param {string} uniqueId
	 * @param {number} commentId
	 * @returns {Object}
	 */
	async deleteCommnet(userId, commentId) {
		await this.checkCommentExists(commentId, userId);
		try {
			await sequelize.transaction(async (t1) => {
				await comments.destroy({
					where: {
						sub_comments_id: commentId,
					},
				});
				await comments.destroy({
					where: {
						user_id: userId,
						comments_id: commentId,
					},
				});
			});
		} catch (error) {
			logger.error(error.message);
			throw new CustomError(
				httpStatus.INTERNAL_SERVER_ERROR,
				"delete comment failed"
			);
		}
		return;
	}

	/**
	 * 개인페이지 검색기능
	 * @param {string} uniqueId
	 * @param {string} searchWord
	 * @param {number} searchType 어느 페이지에서 검색 할 것인지
	 * @param {number[]} paging
	 * @returns {Object}
	 */
	async searchPersonalposts(searchWord, searchType, userId, ...paging) {
		const pageResult = this.paging.pageResult(paging[0], paging[1]);
		// 아무 검색어도 안 들어 왔을경우 모든 포스트 검색
		if (searchWord === ":searchword") {
			searchWord = "";
		}
		let myAttributes = [];
		let whereOptions = {};
		let includeOptions = [];
		// 개인 포스트 페이지에서 검색
		if (searchType === 0) {
			searchType = posts;
			myAttributes = postsDto.filter((data) => {
				const excludeColumn = ["category_id", "user_id", "like_count"];
				if (!excludeColumn.includes(data)) return data;
			});
			whereOptions = {
				user_id: userId,
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
		if (searchType === 1) {
			searchType = temporary_posts;
			myAttributes = tmppostsDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			});
			whereOptions = {
				user_id: userId,
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
				user_id: userId,
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
				user_id: userId,
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

	/**
	 * 공용 검색기능
	 * @param {string} uniqueId
	 * @param {string} searchWord
	 * @param {number} searchType 어느 페이지에서 검색 할 것인지
	 * @param {number[]} paging
	 * @returns {Object}
	 */
	async searchCommonPosts(uniqueId, searchWord, searchType, ...paging) {
		const getUser = await this.uService.getUserByUniqueId(uniqueId);
	}
	/**
	 * 연관 포스트 조회
	 * @param {number} postId
	 * @returns {Object}
	 */
	async associatePost(postId) {
		await this.checkPostExists(postId);
		// 태그 리스트 구하기
		const tagList = await tag.findAll({
			where: {
				post_id: postId,
			},
		});
		// 조합을 이용후 랜덤으로 태그 리스트 가져오기
		const tagCombis = this.myMath.getCombinations(
			tagList,
			Math.ceil(tagList.length / 2)
		);
		let tagCombi = tagCombis[this.myMath.getRandomInt(0, tagCombis.length)];
		tagCombi = tagCombi.map((data) => data.dataValues.tag_name);
		this.postJoin.include = [this.userJoin];
		const associatePost = await tag.findAll({
			attributes: ["tag_id", "tag_name"],
			where: {
				tag_name: {
					[Op.or]: tagCombi,
				},
				post_id: {
					[Op.notIn]: [postId],
				},
			},
			include: [this.postJoin],
			offset: 1,
			limit: 6,
		});
		// 연관된 포스트이 없을 경우 최신 포스트 가져옴
		if (associatePost.length <= 0) {
			return await posts.findAll({
				attributes: postsDto.filter((data) => {
					const excludeColumn = [
						"category_id",
						"user_id",
						"like_count",
					];
					if (!excludeColumn.includes(data)) return data;
				}),
				include: [
					this.userJoin,
					// {
					// 	model: tag,
					// 	as: "tag",
					// 	attributes: ["tag_id", "tag_name"],
					// },
				],
				orderBy: [["updated_at", "DESC"]],
				offset: 1,
				limit: 6,
			});
		}
		return associatePost;
	}
}

module.exports = PersonalService;
