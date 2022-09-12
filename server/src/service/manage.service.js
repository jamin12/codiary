const httpStatus = require("http-status"),
	{ report, posts, comments, users } = require("../models/index"),
	CustomError = require("../utils/Error/customError"),
	{ personalService } = require("./index"),
	{ Op } = require("sequelize"),
	reportDto = require("../dto/reportDto"),
	commentsDto = require("../dto/commentsDto"),
	postsDto = require("../dto/postsDto");

class manageService {
	constructor() {
		this.paging = new Paging();
		this.pService = new personalService();

		this.userJoin = {
			model: users,
			as: "users",
			attributes: ["user_id", "user_email"],
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
			attributes: ["post_title"]
		}

		this.commentJoin = {
			model: comments,
			as: "comments",
		};
	}

	/**
	 * 신고 있는지 체크
	 * @param {number} reportId
	 * @return {object}
	 */
	async checkReportExists(reportId) {
		const getreport = await report.findOne({
			where: {
				report_id: reportId
			}
		})
		if (!getreport) {
			throw new CustomError(httpStatus.BAD_REQUEST, "Report not found");
		}
	}

	/**
	 * 전체 유저 조회
	 * @returns {object}
	 */
	async getUsers(...paging) {
		const pageResult = this.paging.pageResult(paging[0], paging[1]);
		const user = await users.findAll({
			attributes: ["user_email"],
			include: [
				{
					model: user_detail,
					as: "user_detail",
					attributes: [
						"user_name",
						"user_unique_id",
						"user_nickname",
						"user_introduce",
						"user_img",
					],
				},
				{ model: sns_info, as: "sns_info", attributes: ["sns_name"] },
			],
			offset: pageResult.offset,
			limit: pageResult.limit,
		});
		if (!user)
			throw new CustomError(httpStatus.BAD_REQUEST, "User not found");
		return user;
	}

	/**
	* 신고 목록 조회
	* @returns {object}
	*/
	async getReports(reportType, startDate, endDate, ...paging) {
		const pageResult = this.paging.pageResult(paging[0], paging[1]);
		const whereOptions = {

		};
		await report.findAll({
			where: whereOptions,
			offset: pageResult.offset,
			limit: pageResult.limit,
		})
		return;
	}

	/**
	 * 신고 조회
	 * @param {number} reportId
	 * @return {object}
	 */
	async getReport(reportId) {
		await this.checkReportExists(reportId);
		const getReport = await report.findOne({
			attributes: reportDto,
			where: {
				report_id: reportId
			}
		})
		let getPost;
		let getComment;
		// 게시글 신고
		if (getReport.report_target_type === 0) {
			getPost = await posts.findOne({
				attributes: postsDto,
				where: {
					post_id: getReport.report_target_id
				},
				include: [this.userJoin],
			})
		}
		// 댓글 신고
		else if (getReport.report_target_type === 1) {
			getComment = await comments.findOne({
				attributes: commentsDto,
				where: {
					comments_id: getReport.report_target_id,
				},
				include: [this.userJoin],
			});
		}
		return {
			report: getReport,
			post: getPost,
			comment: getComment
		}
	}

	/**
 * 신고 삭제
 * @param {number} reportId
 * @returns 
 */
	async deleteReport(reportId) {
		await this.checkReportExists(reportId);
		await report.destroy({
			where: {
				report_id: reportId
			}
		});
		return;
	}

	/**
	 * 신고하기
	 * @param {Object} reportBody
	 * @returns 
	 */
	async createReport(reportBody) {
		if (reportBody.report_type === 0) {
			await this.pService.checkPostExists(reportBody.report_target_id);
		} else if (reportBody.report_type === 1) {
			await this.pService.checkCommentExists(reportBody.report_target_id);
		}
		await report.create(reportBody);
		return;
	}
}

module.exports = manageService;
