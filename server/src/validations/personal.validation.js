const joi = require("joi");
const { datetime } = require("./custom.validation");

const output = {
	/**
	 * 게시물
	 */
	getPersonalPost: {
		params: joi.object().keys({
			uniqueid: joi.string().required(),
			postid: joi.number().required(),
		}),
	},

	getPersonalPosts: {
		query: joi.object().keys({
			offset: joi.number().required(),
			limit: joi.number(),
		}),
		params: joi.object().keys({
			uniqueid: joi.string().required(),
			categoryid: joi.number().required(),
		}),
	},

	getPersonalPostsByDate: {
		query: joi.object().keys({
			startdate: joi.custom(datetime).required(),
			enddate: joi.custom(datetime).required(),
		}),
		params: joi.object().keys({
			uniqueid: joi.string().required(),
		}),
	},
	getPersonalLikeCount: {
		params: joi.object().keys({
			postid: joi.number().required(),
		}),
	},

	/**
	 * 임시 게시물
	 */
	getPersonalTmpPost: {
		params: joi.object().keys({
			tmppostid: joi.number().required(),
		}),
	},

	/**
 * 댓글 조회
 */
	getPersonalComments: {
		params: joi.object().keys({
			postid: joi.number().required(),
		}),
	},

	/**
	 * 카테고리
	 */
	getPersonalCategory: {
		params: joi.object().keys({
			uniqueid: joi.string().required(),
		}),
	},

	/**
	 * 방문 기록
	 */
	getPersonalVisitRecord: {
		query: joi.object().keys({
			offset: joi.number().required(),
			limit: joi.number(),
		}),
	},

	/**
	 * 좋아요 기록
	 */
	getPersonalLikeRecord: {
		query: joi.object().keys({
			offset: joi.number().required(),
			limit: joi.number(),
		}),
	},

	/**
	 * 검색
	 */
	searchPersonalContents: {
		query: joi.object().keys({
			offset: joi.number().required(),
			limit: joi.number(),
		}),
		params: joi.object().keys({
			searchword: joi.string().required(),
			searchtype: joi.number().required().valid(0, 1, 2, 3),
		}),
	},
	searchCommonContents: {
		query: joi.object().keys({
			offset: joi.number().required(),
			limit: joi.number(),
		}),
		params: joi.object().keys({
			uniqueid: joi.string().required(),
			searchword: joi.string().required(),
		}),
	},
	/**
	 * 연관 게시물
	 */
	associatePersonalContents: {
		params: joi.object().keys({
			postid: joi.string().required(),
		}),
	},
};

const input = {
	/**
	 *  post
	 */
	createPersonalPost: {
		body: joi.object().keys({
			post: joi.object().keys({
				post_title: joi.string().required(),
				post_body_md: joi.string(),
				post_body_html: joi.string(),
				post_txt: joi.string(),
				category_id: joi.number().required(),
			}),
			tag: joi.object().keys({
				tag_name: joi.array().items(joi.string()).required(),
			}),
		}),
	},

	updatePersonalPost: {
		body: joi.object().keys({
			post: joi.object().keys({
				post_title: joi.string().required(),
				post_body_md: joi.string(),
				post_body_html: joi.string(),
				post_txt: joi.string(),
				category_id: joi.number(),
			}),
			tag: joi.object().keys({
				tag_name: joi.array().items(joi.string()),
			}),
		}),
	},

	deletePersonalPost: {
		params: joi.object().keys({
			postid: joi.number().required(),
		}),
	},
	/**
	 *  tmppost
	 */
	createPersonalTmpPost: {
		body: joi.object().keys({
			tmppost_title: joi.string().required(),
			tmppost_body_md: joi.string(),
			tmppost_body_html: joi.string(),
			tmppost_txt: joi.string(),
		}),
	},

	updatePersonalTmpPost: {
		params: joi.object().keys({
			tmppostid: joi.number().required(),
		}),
		body: joi.object().keys({
			tmppost_title: joi.string().required(),
			tmppost_body_md: joi.string(),
			tmppost_body_html: joi.string(),
			tmppost_txt: joi.string(),
		}),
	},
	deletePersonalTmpPost: {
		params: joi.object().keys({
			tmppostid: joi.number().required(),
		}),
	},

	/**
	 *  visitrecord
	 */
	createPersonalVisitRecord: {
		body: joi.object().keys({
			post_id: joi.number().required(),
		}),
	},
	deletePersonalVisitRecord: {
		params: joi.object().keys({
			visitrecordid: joi.number().required(),
		}),
	},

	/**
	 *  likerecord
	 */
	createPersonalLikeRecord: {
		body: joi.object().keys({
			post_id: joi.number().required(),
		}),
	},
	deletePersonalLikeRecord: {
		params: joi.object().keys({
			likerecordid: joi.number().required(),
		}),
	},
	deletePersonalLikeRecordByPostId: {
		params: joi.object().keys({
			postid: joi.number().required(),
		}),
	},
	/**
	 *  category
	 */
	createPersonalCategory: {
		body: joi.object().keys({
			category_name: joi.string().required(),
			sub_category_id: joi.number(),
		}),
	},

	updatePersonalCategory: {
		params: joi.object().keys({
			categoryid: joi.number().required(),
		}),
		body: joi.object().keys({
			category_name: joi.string(),
			sub_category_id: joi.number(),
		}),
	},

	deletePersonalCategory: {
		params: joi.object().keys({
			categoryid: joi.number().required(),
		}),
	},

	/**
	 *  commnets
	 */
	createComment: {
		body: joi.object().keys({
			post_id: joi.number().required(),
			comments_body: joi.string().required(),
			sub_comments_id: joi.number(),
		}),
	},

	updateComment: {
		params: joi.object().keys({
			commentid: joi.number().required(),
		}),
		body: joi.object().keys({
			comments_body: joi.string().required(),
		}),
	},

	deleteComment: {
		params: joi.object().keys({
			commentid: joi.number().required(),
		}),
	},
};

module.exports = {
	output,
	input,
};
