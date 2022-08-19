const { sequelize } = require("../models/index");

module.exports = [
  "post_update_history_id",
	"post_id",
  [
		sequelize.fn(
			"date_format",
			sequelize.col("posts_update_history.update_history"),
			"%Y-%m-%d %H:%i"
		),
		"update_history",
	],
	[
		sequelize.fn(
			"date_format",
			sequelize.col("posts_update_history.created_at"),
			"%Y-%m-%d %H:%i"
		),
		"created_at",
	],
	[
		sequelize.fn(
			"date_format",
			sequelize.col("posts_update_history.updated_at"),
			"%Y-%m-%d %H:%i"
		),
		"updated_at",
	],
];