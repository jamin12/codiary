const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    post_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    post_title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    post_body_md: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    post_body_html: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    post_txt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    like_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'posts',
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
          { name: "post_id" },
        ]
      },
    ]
  });
};
