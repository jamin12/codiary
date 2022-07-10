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
      allowNull: true
    },
    user_unique_id: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    user_nickname: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    user_introduce: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_role: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    user_picture:{
        type : DataTypes.STRING(255),
        allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
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
