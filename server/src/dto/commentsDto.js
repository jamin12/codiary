const { sequelize } = require("../models/index");

module.exports = [
	"comments_id",
  "sub_comments_id",
	"post_id",
	"user_id",
  "comments_body",
	[
		sequelize.fn(
			"date_format",
			sequelize.col("comments.created_at"),
			"%Y-%m-%d %H:%i"
		),
		"created_at",
	],
	[
		sequelize.fn(
			"date_format",
			sequelize.col("comments.updated_at"),
			"%Y-%m-%d %H:%i"
		),
		"updated_at",
	],
];
