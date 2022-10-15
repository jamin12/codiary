const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    user_email: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    user_role: {
      type: DataTypes.STRING(32),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
