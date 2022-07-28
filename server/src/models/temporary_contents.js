import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class temporary_contents extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    tmpcontents_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tmpcontents_title: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    tmpcontents_body: {
      type: DataTypes.TEXT,
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
    tableName: 'temporary_contents',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tmpcontents_id" },
        ]
      },
    ]
  });
  }
}
