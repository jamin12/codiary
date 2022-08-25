const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"measurement",
		{
			measurement_id: {
				autoIncrement: true,
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
			},
			post_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				unique: "post_id",
			},
			today_visit_count: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			total_visit_count: {
				type: DataTypes.BIGINT,
				allowNull: true,
				defaultValue: 0,
			},
		},
		{
			sequelize,
			tableName: "measurement",
			timestamps: true,
			underscored: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "mesurement_id" }],
				},
				{
					name: "post_id",
					unique: true,
					using: "BTREE",
					fields: [{ name: "post_id" }],
				},
			],
		}
	);
};
