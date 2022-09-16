const { sequelize } = require("../models/index");

module.exports = [
	"like_record_id",
	"user_id",
	"post_id",
	[
		sequelize.fn(
			"date_format",
			sequelize.col("like_record.created_at"),
			"%Y-%m-%d %H:%i"
		),
		"created_at",
	],
	[
		sequelize.fn(
			"date_format",
			sequelize.col("like_record.updated_at"),
			"%Y-%m-%d %H:%i"
		),
		"updated_at",
	],
];
