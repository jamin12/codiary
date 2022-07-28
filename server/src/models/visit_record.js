import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class visit_record extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
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
    tableName: 'visit_record',
    timestamps: false,
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
  }
}
