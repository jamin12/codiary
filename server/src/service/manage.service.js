const httpStatus = require("http-status"),
	{
		report,
		posts,
		comments,
		users,
		user_detail,
		sns_info,
	} = require("../models/index"),
	CustomError = require("../utils/Error/customError"),
	{ personalService } = require("./index"),
	{ Op } = require("sequelize"),
	reportDto = require("../dto/reportDto"),
	commentsDto = require("../dto/commentsDto"),
	postsDto = require("../dto/postsDto"),
	Paging = require("../utils/paging"),
	{ v4: uuid } = require("uuid");

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
						"user_img",
					],
				},
			],
		};

		this.postJoin = {
			model: posts,
			as: "posts",
			attributes: ["post_title"],
		};

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
				report_id: reportId,
			},
		});
		if (!getreport) {
			throw new CustomError(httpStatus.BAD_REQUEST, "Report not found");
		}
	}

	/**
	 * 전체 유저 조회
	 * @param  {...any} paging
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
 * 신고 있는지 체크
 * @param {number} reportId
 * @return {object}
 */
	async checkReportExists(reportId) {
		const getreport = await report.findOne({
			where: {
				report_id: reportId,
			},
		});
		if (!getreport) {
			throw new CustomError(httpStatus.BAD_REQUEST, "Report not found");
		}
	}

	/**
	 * 유져 검색
	 * 
	 * @param  {string} searchWord 유저 검색 문자열
	 * @param  {...any} paging
	 * @returns {object}
	 */
	async searchUsers(searchWord, ...paging) {
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
						"user_introduce",
						"user_img",
					],
					where: {
						user_unique_id:{
							[Op.substring]: searchWord,
						}
					}
				},
				{ model: sns_info, as: "sns_info", attributes: ["sns_name"] },
			],
			offset: pageResult.offset,
			limit: pageResult.limit,
		});
		return user;
	}

	/**
	 * 신고 목록 조회
	 * @param {number} reportType
	 * @param {number} reportTargetType
	 * @param {datetime} startDate
	 * @param {datetime} endDate
	 * @param  {...any} paging
	 * @returns
	 */
	async getReports(
		reportType,
		reportTargetType,
		startDate,
		endDate,
		...paging
	) {
		const pageResult = this.paging.pageResult(paging[0], paging[1]);
		const whereOptions = {
			report_date: {
				[Op.between]: [startDate, endDate],
			},
		};

		if (reportType !== -1) whereOptions.report_type = reportType;
		if (reportTargetType !== -1)
			whereOptions.report_target_type = reportTargetType;
		return await report.findAll({
			attributes: reportDto,
			where: whereOptions,
			offset: pageResult.offset,
			limit: pageResult.limit,
		});
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
				report_id: reportId,
			},
		});
		let getPost;
		let getComment;
		// 게시글 신고
		if (getReport.report_target_type === 0) {
			getPost = await posts.findOne({
				attributes: postsDto,
				where: {
					post_id: getReport.report_target_id,
				},
				include: [this.userJoin],
			});
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
			comment: getComment,
		};
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
				report_id: reportId,
			},
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
		if (!reportBody.report_user) {
			reportBody.report_user = uuid();
		}
		// 똑같은 유저가 똑같은 신고를 못하게 함
		const checkSameReport = await report.findOne({
			where: reportBody,
		});
		if (checkSameReport) {
			throw new CustomError(
				httpStatus.BAD_REQUEST,
				"same report already exists"
			);
		}
		await report.create(reportBody);
		return;
	}
}

module.exports = manageService;
