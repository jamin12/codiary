const httpStatus = require("http-status");
const logger = require("../config/logger");
const resultDto = require("../dto/resultDTO");
const { personalService } = require("../service/index");
const catchAsync = require("../utils/catchAsync");

const pService = new personalService();

const output = {
	getPersonalPost: catchAsync(async (req, res) => {
		const result_contents = await pService.getPersonalPost(
			req.params.uniqueid,
			req.params.postid
		);
		res.send(resultDto(httpStatus.OK, "getPost", result_contents));
	}),
	getPersonalCategory: catchAsync(async (req, res) => {
		const result_contents = await pService.getPersonalCategory(
			req.params.uniqueid
		);
		res.send(resultDto(httpStatus.OK, "getCategory", result_contents));
	}),
	getPsersonalPosts: catchAsync(async (req, res) => {
		const result_contents = await pService.getPersonalPosts(
			req.params.uniqueid,
			req.params.categoryid,
			req.query.offset,
			req.query.limit
		);
		res.send(resultDto(httpStatus.OK, "getPost", result_contents));
	}),
	getPersonalPostsByDate: catchAsync(async (req, res) => {
		const result_contents = await pService.getPersonalPostsByDate(
			req.params.uniqueid,
			req.query.startdate,
			req.query.enddate
		);
		res.send(resultDto(httpStatus.OK, "getPost", result_contents));
	}),
	getPersonalTmppost: catchAsync(async (req, res) => {
		const result_contents = await pService.getPersonalTmpposts(
			req.user.user_id
		);
		res.send(resultDto(httpStatus.OK, "gettempPost", result_contents));
	}),
	getPersonalVisitRecord: catchAsync(async (req, res) => {
		const result_contents = await pService.getPersonalVisitRecord(
			req.user.user_id,
			req.query.offset,
			req.query.limit
		);
		res.send(resultDto(httpStatus.OK, "getVisitRecord", result_contents));
	}),
	getPersonalLikeRecord: catchAsync(async (req, res) => {
		const result_contents = await pService.getPersonalLikeRecord(
			req.user.user_id,
			req.query.offset,
			req.query.limit
		);
		res.send(resultDto(httpStatus.OK, "getLikeRecord", result_contents));
	}),
	searchPersonalposts: catchAsync(async (req, res) => {
		const result_contents = await pService.searchPersonalposts(
			req.params.uniqueid,
			req.params.searchword,
			req.params.searchtype,
			req.query.offset,
			req.query.limit
		);
		res.send(resultDto(httpStatus.OK, "searchContents", result_contents));
	}),
};

const input = {
	// temporary_posts
	createPersonalTmpPost: catchAsync(async (req, res) => {
		const result_contents = await pService.createPersonalTmpPost(
			req.user.user_id,
			req.body
		);
		res.send(
			resultDto(httpStatus.CREATED, "create success", result_contents)
		);
	}),
	updatePersonalTmpPost: catchAsync(async (req, res) => {
		const result_contents = await pService.updatePersonalTmpPost(
			req.user.user_id,
			req.params.tmppostid,
			req.body
		);
		res.send(resultDto(httpStatus.OK, "update success", result_contents));
	}),
	deletePersonalTmpPost: catchAsync(async (req, res) => {
		const result_contents = await pService.deletePersonalTmpPost(
			req.user.user_id,
			req.params.tmppostid
		);
		res.send(resultDto(httpStatus.OK, "delete success", result_contents));
	}),
	// visit_record
	createPersonalVisitRecord: catchAsync(async (req, res) => {
		const result_contents = await pService.createPersonalVisitRecord(
			req.user.user_id,
			req.body
		);
		res.send(
			resultDto(httpStatus.CREATED, "create success", result_contents)
		);
	}),
	deletePersonalVisitRecord: catchAsync(async (req, res) => {
		const result_contents = await pService.deletePersonalVisitRecord(
			req.user.user_id,
			req.params.visitrecordid
		);
		res.send(resultDto(httpStatus.OK, "delete success", result_contents));
	}),
	// like_record
	createPersonalLikeRecord: catchAsync(async (req, res) => {
		const result_contents = await pService.createPersonalLikeRecord(
			req.user.user_id,
			req.body
		);
		res.send(
			resultDto(httpStatus.CREATED, "create success", result_contents)
		);
	}),
	deletePersonalLikeRecord: catchAsync(async (req, res) => {
		const result_contents = await pService.deletePersonalLikeRecord(
			req.user.user_id,
			req.params.likerecordid
		);
		res.send(resultDto(httpStatus.OK, "delete success", result_contents));
	}),
};

module.exports = {
	output,
	input,
};
