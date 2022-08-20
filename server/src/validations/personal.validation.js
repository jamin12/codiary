const joi = require("Joi");
const { datetime } = require("./custom.validation");

const output = {
	getPsersonalPost: {
		params: joi.object().keys({
			uniqueid: joi.string().required(),
			postid: joi.number().required(),
		}),
	},

	getPsersonalCategory: {
		params: joi.object().keys({
			uniqueid: joi.string().required(),
		}),
	},

	getPsersonalPosts: {
		query: joi.object().keys({
			offset: joi.number().required(),
			limit: joi.number(),
		}),
		params: joi.object().keys({
			uniqueid: joi.string().required(),
			categoryid: joi.number().required(),
		}),
	},

	getPsersonalPostsByDate: {
		query: joi.object().keys({
			startdate: joi.custom(datetime).required(),
			enddate: joi.custom(datetime).required(),
		}),
		params: joi.object().keys({
			uniqueid: joi.string().required(),
		}),
	},

	getPsersonalVisitRecord: {
		query: joi.object().keys({
			offset: joi.number().required(),
			limit: joi.number(),
		}),
	},

	getPsersonalLikeRecord: {
		query: joi.object().keys({
			offset: joi.number().required(),
			limit: joi.number(),
		}),
	},

	searchPsersonalContents: {
		query: joi.object().keys({
			offset: joi.number().required(),
			limit: joi.number(),
		}),
		params: joi.object().keys({
			uniqueid: joi.string().required(),
			searchword: joi.string().required(),
			searchtype: joi.number().required().valid(0, 1, 2, 3),
		}),
	},
};

const input = {
	// tmppost
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

	// visitrecord
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

	// likerecord
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

	// category
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
			category_name: joi.string().required(),
			sub_category_id: joi.number(),
		}),
	},

	deletePersonalCategory: {
		params: joi.object().keys({
			categoryid: joi.number().required(),
		}),
	}
};

module.exports = {
	output,
	input,
};
