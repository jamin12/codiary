const { sequelize } = require("../models/index");

module.exports = [
  "post_id",
  "category_id",
  "user_id",
  "post_title",
  "post_body_md",
  "post_body_html",
  "post_txt",
  "like_count",
	[
		sequelize.fn(
			"date_format",
			sequelize.col("posts.created_at"),
			"%Y-%m-%d %H:%i"
		),
		"created_at",
	],
	[
		sequelize.fn(
			"date_format",
			sequelize.col("posts.updated_at"),
			"%Y-%m-%d %H:%i"
		),
		"updated_at",
	],
];