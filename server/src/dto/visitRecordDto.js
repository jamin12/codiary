const { sequelize } = require("../models/index");

module.exports = [
  "visit_record_id",
  "user_id",
  "post_id",
	[
		sequelize.fn(
			"date_format",
			sequelize.col("visit_record.created_at"),
			"%Y-%m-%d %H:%i"
		),
		"created_at",
	],
	[
		sequelize.fn(
			"date_format",
			sequelize.col("visit_record.updated_at"),
			"%Y-%m-%d %H:%i"
		),
		"updated_at",
	],
];