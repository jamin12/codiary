const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"user_detail",
		{
			user_id: {
				type: DataTypes.STRING(255),
				allowNull: false,
				primaryKey: true,
				references: {
					model: "users",
					key: "user_id",
				},
			},
			user_name: {
				type: DataTypes.STRING(64),
				allowNull: true,
			},
			user_unique_id: {
				type: DataTypes.STRING(64),
				allowNull: false,
				unique: "user_unique_id",
			},
			user_nickname: {
				type: DataTypes.STRING(64),
				allowNull: true,
			},
			user_introduce: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			user_img: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: "user_detail",
			timestamps: true,
			underscored: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "user_id" }],
				},
				{
					name: "user_unique_id",
					unique: true,
					using: "BTREE",
					fields: [{ name: "user_unique_id" }],
				},
			],
		}
	);
};
