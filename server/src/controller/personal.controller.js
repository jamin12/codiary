const httpStatus = require("http-status"),
	logger = require("../config/logger"),
	resultDto = require("../dto/resultDTO"),
	{ personalService } = require("../service/index"),
	catchAsync = require("../utils/catchAsync"),
	pService = new personalService();

const output = {
	/**
	 * 포스트
	 */
	// 사용자 게시물 조회
	getPersonalPost: catchAsync(async (req, res) => {
		const result_contents = await pService.getPersonalPost(
			req.params.uniqueid,
			req.params.postid
		);
		res.send(resultDto(httpStatus.OK, "getPost", result_contents));
	}),
	// 사용자 포스트 목록 조회
	getPsersonalPosts: catchAsync(async (req, res) => {
		const result_contents = await pService.getPersonalPosts(
			req.params.uniqueid,
			req.params.categoryid,
			req.query.offset,
			req.query.limit
		);
		res.send(resultDto(httpStatus.OK, "getPost", result_contents));
	}),
	// 사용자 날짜 별 포스트 목록 조회
	getPersonalPostsByDate: catchAsync(async (req, res) => {
		const result_contents = await pService.getPersonalPostsByDate(
			req.params.uniqueid,
			req.query.startdate,
			req.query.enddate
		);
		res.send(resultDto(httpStatus.OK, "getPost", result_contents));
	}),

	/**
	 * 카테고리
	 */
	// 해당 유저의 카테고리 정보
	getPersonalCategory: catchAsync(async (req, res) => {
		const result_contents = await pService.getPersonalCategory(
			req.params.uniqueid
		);
		res.send(resultDto(httpStatus.OK, "getCategory", result_contents));
	}),

	// 내 카테고리 목록 정보
	getPersonalMyCategory: catchAsync(async (req, res) => {
		const result_contents = await pService.getPersonalMyCategory(
			req.user.user_id
		);
		res.send(resultDto(httpStatus.OK, "getMyCategory", result_contents));
	}),

	/**
	 * 임시 게시물
	 */
	// 임시 게시물 목록 조회
	getPersonalTmpposts: catchAsync(async (req, res) => {
		const result_contents = await pService.getPersonalTmpposts(
			req.user.user_id
		);
		res.send(resultDto(httpStatus.OK, "gettempPosts", result_contents));
	}),
	// 임시 게시물 조회
	getPersonalTmppost: catchAsync(async (req, res) => {
		const result_contents = await pService.getPersonalTmppost(
			req.user.user_id,
			req.params.tmppostid
		);
		res.send(resultDto(httpStatus.OK, "gettempPost", result_contents));
	}),

	/**
	 * 방문 게시물
	 */
	getPersonalVisitRecord: catchAsync(async (req, res) => {
		const result_contents = await pService.getPersonalVisitRecord(
			req.user.user_id,
			req.query.offset,
			req.query.limit
		);
		res.send(resultDto(httpStatus.OK, "getVisitRecord", result_contents));
	}),

	/**
	 * 좋아요 게시물
	 */
	getPersonalLikeRecord: catchAsync(async (req, res) => {
		const result_contents = await pService.getPersonalLikeRecord(
			req.user.user_id,
			req.query.offset,
			req.query.limit
		);
		res.send(resultDto(httpStatus.OK, "getLikeRecord", result_contents));
	}),

	/**
	 * 검색
	 */
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
	/**
	 * posts
	 */
	createPersonalPost: catchAsync(async (req, res) => {
		const result_contents = await pService.createPersonalPost(
			req.user.user_id,
			req.body
		);
		res.send(
			resultDto(httpStatus.CREATED, "create success", result_contents)
		);
	}),
	updatePersonalPost: catchAsync(async (req, res) => {
		const result_contents = await pService.updatePersonalPost(
			req.user.user_id,
			req.params.postid,
			req.body
		);
		res.send(resultDto(httpStatus.OK, "update success", result_contents));
	}),
	deletePersonalPost: catchAsync(async (req, res) => {
		const result_contents = await pService.deletePersonalPost(
			req.user.user_id,
			req.params.postid
		);
		res.send(resultDto(httpStatus.OK, "delete success", result_contents));
	}),
	/**
	 * temporary_posts
	 */
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
	/**
	 * visit_record
	 */
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
	/**
	 * like_record
	 */
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
	deletePersonalLikeRecordByPostId: catchAsync(async (req, res) => {
		const result_contents = await pService.deletePersonalLikeRecordByPostId(
			req.user.user_id,
			req.params.postid
		);
		res.send(resultDto(httpStatus.OK, "delete success", result_contents));
	}),
	/**
	 * category
	 */
	createPersonalCategory: catchAsync(async (req, res) => {
		const result_contents = await pService.createPersonalCategory(
			req.user.user_id,
			req.body
		);
		res.send(
			resultDto(httpStatus.CREATED, "create success", result_contents)
		);
	}),
	updatePersonalCategory: catchAsync(async (req, res) => {
		const result_contents = await pService.updatePersonalCategory(
			req.user.user_id,
			req.params.categoryid,
			req.body
		);
		res.send(resultDto(httpStatus.OK, "update success", result_contents));
	}),
	deletePersonalCategory: catchAsync(async (req, res) => {
		const result_contents = await pService.deletePersonalCategory(
			req.user.user_id,
			req.params.categoryid
		);
		res.send(resultDto(httpStatus.OK, "delete success", result_contents));
	}),
	/**
	 * comments
	 */
	createComment: catchAsync(async (req, res) => {
		const result_contents = await pService.createCommnet(
			req.user.user_id,
			req.body
		);
		res.send(
			resultDto(httpStatus.CREATED, "create success", result_contents)
		);
	}),
	updateComment: catchAsync(async (req, res) => {
		const result_contents = await pService.updateCommnet(
			req.user.user_id,
			req.params.commentid,
			req.body
		);
		res.send(resultDto(httpStatus.OK, "update success", result_contents));
	}),
	deleteComment: catchAsync(async (req, res) => {
		const result_contents = await pService.deleteCommnet(
			req.user.user_id,
			req.params.commentid
		);
		res.send(resultDto(httpStatus.OK, "delete success", result_contents));
	}),
};

module.exports = {
	output,
	input,
};
