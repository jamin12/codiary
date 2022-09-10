const validator = require("validator");

const REGEXP_DATETIME =
	/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/;

const objectId = (value, helpers) => {
	/*if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }*/
	if (!validator.isUUID(value, 4)) {
		return helpers.message('"{{#label}}" must be a valid id');
	}
	return value;
};

const password = (value, helpers) => {
	if (value.length < 8) {
		return helpers.message("password must be at least 8 characters");
	}
	if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
		return helpers.message(
			"password must contain at least 1 letter and 1 number"
		);
	}
	return value;
};

const passwordV2 = (value, helpers) => {
	if (value.length < 8) {
		return helpers.message("password must be at least 8 characters");
	}
	if (
		!value.match(/\d/) ||
		!value.match(/[a-zA-Z]/) ||
		!value.match(/[~!?@|\\#$%<>^&*{}\[\]₩+=-\.\,]/)
	) {
		return helpers.message(
			"password must contain at least 1 letter and 1 number and special character"
		);
	}
	return value;
};

const mobile = (value, helpers) => {
	if (!value.match(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/)) {
		return helpers.message("invalid mobile number");
	}
	return value;
};

const datetime = (value, helpers) => {
	if (!value.match(REGEXP_DATETIME)) {
		return helpers.message("invalid datetime format 'YYYY-MM-DD HH:mm:ss'");
	}
	return value;
};

const dbmodel = {
	categoryName: (value, helpers) => {
		if (value.length > 255) {
			return helpers.message("category name is too long");
		}
		return value;
	},

	commentsBody: (value, helpers) => {
		if (value.length > 255) {
			return helpers.message("comments body is too long");
		}
		return value;
	},

	postTitle: (value, helpers) => {
		if (value.length > 255) {
			return helpers.message("post title is too long");
		}
		return value;
	},

	tagName: (value, helpers) => {
		if (value.length > 64) {
			return helpers.message("tag name is too long");
		}
		return value;
	},

	userUniqueId: (value, helpers) => {
		if (value.length > 64) {
			return helpers.message("user unique id is too long");
		}
		return value;
	},

	userNickname: (value, helpers) => {
		if (value.length > 64) {
			return helpers.message("userNickname is too long");
		}
		return value;
	},

	userIntroduce: (value, helpers) => {
		if (value.length > 255) {
			return helpers.message("userIntroduce is too long");
		}
		return value;
	},

	userImg: (value, helpers) => {
		if (value.length > 255) {
			return helpers.message("userImg is too long");
		}
		return value;
	},
};

module.exports = {
	objectId,
	password,
	passwordV2,
	mobile,
	datetime,
  dbmodel,
};
