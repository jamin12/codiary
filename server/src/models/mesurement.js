import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class mesurement extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    mesurement_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    contents_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: "contents_id"
    },
    today_visit_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    total_visit_count: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
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
    tableName: 'mesurement',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mesurement_id" },
        ]
      },
      {
        name: "contents_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "contents_id" },
        ]
      },
    ]
  });
  }
}
