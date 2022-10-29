const joi = require("joi");
const { datetime } = require("./custom.validation");

const output = {
	/**
	 * 유저 목록 조회
	 */
	getusers: {
		query: joi.object().keys({
			offset: joi.number().required(),
			limit: joi.number(),
		}),
	},
	/**
	 * 신고 목록 조회
	 */
	getReports: {
		query: joi.object().keys({
			offset: joi.number().required(),
			limit: joi.number(),
			startDate: joi.custom(datetime).required(),
			endDate: joi.custom(datetime).required(),
		}),
		params: joi.object().keys({
			reporttype: joi.number().required(),
			reporttargettype: joi.number().required(),
		}),
	},
	/**
	 * 신고 조회
	 */
	getReport: {
		params: joi.object().keys({
			reportid: joi.number().required(),
		}),
	},

};

const input = {
	/**
	 * 신고 삭제
	 */
	deleteReport: {
		params: joi.object().keys({
			reportid: joi.number().required(),
		}),
	},
	/**
	 * 신고 생성
	 */
	createReport: {
		body: joi.object().keys({
			report_user: joi.string(),
			report_target_type: joi.number().required(),
			report_target_id: joi.number().required(),
			report_type: joi.number().required(),
			report_body: joi.string(),
		}),
	},
};

module.exports = {
	output,
	input,
};
