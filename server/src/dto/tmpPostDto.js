const { sequelize } = require("../models/index");

module.exports = [
  "tmppost_id",
  "user_id",
  "tmppost_title",
  "tmppost_body_md",
  "tmppost_body_html",
  "tmppost_txt",
	[
		sequelize.fn(
			"date_format",
			sequelize.col("temporary_posts.created_at"),
			"%Y-%m-%d %H:%i"
		),
		"created_at",
	],
	[
		sequelize.fn(
			"date_format",
			sequelize.col("temporary_posts.updated_at"),
			"%Y-%m-%d %H:%i"
		),
		"updated_at",
	],
];