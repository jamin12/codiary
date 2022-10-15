const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('visit_record', {
    visit_record_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    post_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'visit_record',
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
          { name: "visit_record_id" },
        ]
      },
    ]
  });
};
