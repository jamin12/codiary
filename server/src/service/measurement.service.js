const httpStatus = require("http-status");
const { posts, users, user_detail, measurement_date, sequelize, measurement } = require("../models/index");
const CustomError = require("../utils/Error/customError");
const Paging = require("../utils/paging");
const { Op } = require("sequelize");
const postDto = require("../dto/postsDto");
const logger = require("../config/logger");

class measurementService {
	constructor() {
		this.paging = new Paging();
	}

	// 인기 게시글 조회
	async getPopularPosts(...params) {
		const pageResult = this.paging.pageResult(params[0], params[1]);
		const result_contents = await posts.findAll({
			attributes: postDto.filter((data) => {
				const excludeColumn = ["user_id", "like_count", "category_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
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
			order: [["like_count", "DESC"]],
			offset: pageResult.offset,
			limit: pageResult.limit,
		});
		if (result_contents.length === 0) {
			throw new CustomError(httpStatus.BAD_REQUEST, "not found posts");
		}
		return result_contents;
	}
	/**
	 * 게시물 그래프 조회
	 * @param {number} periodType
	 * @param {number} postId
	 */
	async getGraphData(periodType, postId) {
		logger.info(postId)
		let dateFormat = "%Y-%m-%d";
		if (periodType === 0) dateFormat = "%Y-%m-%d";
		else if (periodType === 1) dateFormat = "%Y-%v";
		else if (periodType === 2) dateFormat = "%Y-%m";
		return await measurement_date.findAll({
			attributes: {
				include: [
					[
						sequelize.fn
							(
								"sum",
								sequelize.col("visit_count"),
							),
						"sum_visit_count",
					],
					[
						sequelize.fn
							(
								"DATE_FORMAT",
								sequelize.col("created_at"),
								dateFormat
							),
						"created_at",
					],
				],
				exclude: ['createdAt', "visit_count"],
			},
			where: {
				post_id: postId,
			},
			group: [
				sequelize.fn
					(
						"DATE_FORMAT",
						sequelize.col("created_at"),
						dateFormat
					)
			],
		});
	}
	/**
	 * 최고의 게시물 리스트
	 * @return {object}
	 */
	async getBestPosts(userId) {
		// 좋아요가 가장 많은 게시물
		const getBestLike = await posts.findOne({
			attributes: postDto.filter((data) => {
				const excludeColumn = ["user_id"];
				if (!excludeColumn.includes(data)) return data;
			}),
			where: {
				user_id: userId
			},
			order: [["like_count", "DESC"]],
		})
		// 총 방문자 수가 가장 많은 게시물
		const getBestTotalVisit = await measurement.findOne({
			include: [
				{
					model: posts,
					as: "posts",
					attributes: postDto.filter((data) => {
						const excludeColumn = ["user_id"];
						if (!excludeColumn.includes(data)) return data;
					}),
					where: {
						user_id: userId
					}
				}
			],
			order: [["total_visit_count", "DESC"]],
		})
		// 오늘 방문자 수가 가장 많은 게시물
		const getBestTodayVisit = await measurement.findOne({
			include: [
				{
					model: posts,
					as: "posts",
					attributes: postDto.filter((data) => {
						const excludeColumn = ["user_id"];
						if (!excludeColumn.includes(data)) return data;
					}),
					where: {
						user_id: userId
					}
				}
			],
			order: [["today_visit_count", "DESC"]],
		})
		return {
			getBestLike,
			getBestTodayVisit,
			getBestTotalVisit
		}
	}


}

module.exports = measurementService;
