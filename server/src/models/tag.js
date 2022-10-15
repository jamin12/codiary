const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tag', {
    tag_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    tag_name: {
      type: DataTypes.STRING(64),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tag',
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
          { name: "tag_id" },
        ]
      },
    ]
  });
};
