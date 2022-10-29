const httpStatus = require("http-status");
const {
	posts,
	users,
	user_detail,
	measurement_date,
	sequelize,
	measurement,
} = require("../models/index");
const CustomError = require("../utils/Error/customError");
const Paging = require("../utils/paging");
const { Op } = require("sequelize");
const postDto = require("../dto/postsDto");
const logger = require("../config/logger");

class measurementService {
	constructor() {
		this.paging = new Paging();
	}
	/**
	 * 게시물 그래프 조회
	 * @param {number} periodType
	 * @param {number} postId
	 */
	async getGraphData(periodType, postId) {
		let dateFormat = "%Y-%m-%d";
		// 일 단위
		if (periodType === 0) dateFormat = "%Y-%m-%d";
		// 주 단위
		else if (periodType === 1) dateFormat = "%Y-%v";
		// 월 단위
		else if (periodType === 2) dateFormat = "%Y-%m";
		return await measurement_date.findAll({
			attributes: {
				include: [
					[
						sequelize.fn("sum", sequelize.col("visit_count")),
						"sum_visit_count",
					],
					[
						sequelize.fn(
							"DATE_FORMAT",
							sequelize.col("created_at"),
							dateFormat
						),
						"created_at",
					],
				],
				exclude: ["createdAt", "visit_count"],
			},
			where: {
				post_id: postId,
			},
			group: [
				sequelize.fn(
					"DATE_FORMAT",
					sequelize.col("created_at"),
					dateFormat
				),
			],
		});
	}
	/**
	 * 최고의 게시물 리스트
	 * @param {string} userId}
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
				user_id: userId,
			},
			order: [["like_count", "DESC"]],
		});
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
						user_id: userId,
					},
				},
			],
			order: [["total_visit_count", "DESC"]],
		});
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
						user_id: userId,
					},
				},
			],
			order: [["today_visit_count", "DESC"]],
		});
		return {
			getBestLike,
			getBestTodayVisit,
			getBestTotalVisit,
		};
	}
	/**
	 * 내 게시물 리스트
	 * @param {string} userId
	 * @param {number} postType
	 * @param {number} criterion
	 * @param {number[]} paging
	 * @returns {object}
	 */
	async getMyPosts(userId, postType, criterion, ...paging) {
		const pageResult = this.paging.pageResult(paging[0], paging[1]);
		let criterionStr;
		if (criterion === 0) criterionStr = "ASC";
		else if (criterion === 1) criterionStr = "DESC";
		let orderOption = [];
		// 총 방문자 수 기준
		if (postType === 0) {
			orderOption.push("total_visit_count");
			orderOption.push(criterionStr);
		}
		// 일일 방문자 기중
		else if (postType === 1) {
			orderOption.push("today_visit_count");
			orderOption.push(criterionStr);
		}
		// 좋아요 개수 기준
		else if (postType === 2) {
			return await posts.findAll({
				include: [
					{
						model: measurement,
						as: "measurement",
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					},
				],
				attributes: postDto.filter((data) => {
					const excludeColumn = ["user_id"];
					if (!excludeColumn.includes(data)) return data;
				}),
				where: {
					user_id: userId,
				},
				order: [["like_count", criterionStr]],
				offset: pageResult.offset,
				limit: pageResult.limit,
			});
		}
		// 생성 시간 기준
		else if (postType === 3) {
			return await posts.findAll({
				include: [
					{
						model: measurement,
						as: "measurement",
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					},
				],
				attributes: postDto.filter((data) => {
					const excludeColumn = ["user_id"];
					if (!excludeColumn.includes(data)) return data;
				}),
				where: {
					user_id: userId,
				},
				order: [["updated_at", criterionStr]],
				offset: pageResult.offset,
				limit: pageResult.limit,
			});
		}
		return await measurement.findAll({
			include: [
				{
					model: posts,
					as: "posts",
					attributes: postDto.filter((data) => {
						const excludeColumn = ["user_id"];
						if (!excludeColumn.includes(data)) return data;
					}),
					where: {
						user_id: userId,
					},
				},
			],
			order: [orderOption],
			offset: pageResult.offset,
			limit: pageResult.limit,
		});
	}
}

module.exports = measurementService;
