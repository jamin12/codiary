const { sequelize } = require("../models/index");

module.exports = [
	"measurement_id",
  "post_id",
	"today_visit_count",
  "total_visit_count",
	[
		sequelize.fn(
			"date_format",
			sequelize.col("measurement.created_at"),
			"%Y-%m-%d %H:%i"
		),
		"created_at",
	],
	[
		sequelize.fn(
			"date_format",
			sequelize.col("measurement.updated_at"),
			"%Y-%m-%d %H:%i"
		),
		"updated_at",
	],
];
