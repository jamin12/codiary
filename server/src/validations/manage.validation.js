const joi = require("Joi");
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

};

const input = {

};

module.exports = {
	output,
	input,
};
