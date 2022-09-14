const { sequelize } = require("../models/index");

module.exports = [
  "report_id",
	[
		sequelize.fn(
			"date_format",
			sequelize.col("report.report_date"),
			"%Y-%m-%d %H:%i"
		),
		"report_date",
	],
  "report_user",
  "report_type",
  "report_target_type",
  "report_target_id",
	[
		sequelize.fn(
			"date_format",
			sequelize.col("report.created_at"),
			"%Y-%m-%d %H:%i"
		),
		"created_at",
	],
	[
		sequelize.fn(
			"date_format",
			sequelize.col("report.updated_at"),
			"%Y-%m-%d %H:%i"
		),
		"updated_at",
	],
];