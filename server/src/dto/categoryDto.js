const { sequelize } = require("../models/index");

module.exports = [
	"category_id",
  "sub_category_id",
	"user_id",
  "category_name",
	[
		sequelize.fn(
			"date_format",
			sequelize.col("category.created_at"),
			"%Y-%m-%d %H:%i"
		),
		"created_at",
	],
	[
		sequelize.fn(
			"date_format",
			sequelize.col("category.updated_at"),
			"%Y-%m-%d %H:%i"
		),
		"updated_at",
	],
];
