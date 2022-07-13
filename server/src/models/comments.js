const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
    comments_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    sub_comments_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    contents_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    comments_body: {
      type: DataTypes.STRING(255),
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
    }
  }, {
    sequelize,
    tableName: 'comments',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "comments_id" },
        ]
      },
    ]
  });
};
