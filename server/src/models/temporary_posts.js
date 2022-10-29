const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('temporary_posts', {
    tmppost_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tmppost_title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tmppost_body_md: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tmppost_body_html: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tmppost_txt: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'temporary_posts',
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
          { name: "tmppost_id" },
        ]
      },
    ]
  });
};
