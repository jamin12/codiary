const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"like_record",
		{
			like_record_id: {
				autoIncrement: true,
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
			},
			user_id: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			post_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "like_record",
			timestamps: true,
			underscored: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "like_record_id" }],
				},
			],
		}
	);
};
