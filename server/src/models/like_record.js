const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('like_record', {
    like_record_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    contents_id: {
      type: DataTypes.BIGINT,
      allowNull: false
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
    tableName: 'like_record',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "like_record_id" },
        ]
      },
    ]
  });
};
