const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('report', {
    report_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    report_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    report_user: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    report_target_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "0 = 게시글, 1 = 댓글, 2 = 유저"
    },
    report_target_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    report_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "0 = 욕설, 1 = 음란물, 2 = 개인정보 노출, 3 = 불법 정보"
    },
    report_body: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'report',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "report_id" },
        ]
      },
    ]
  });
};
