const { sequelize } = require("../models/index");

module.exports = [
	"tag_id",
  "post_id",
	"tag_name",
	[
		sequelize.fn(
			"date_format",
			sequelize.col("tag.created_at"),
			"%Y-%m-%d %H:%i"
		),
		"created_at",
	],
	[
		sequelize.fn(
			"date_format",
			sequelize.col("tag.updated_at"),
			"%Y-%m-%d %H:%i"
		),
		"updated_at",
	],
];
