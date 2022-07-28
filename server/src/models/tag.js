import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tag extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    tag_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    contents_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    tag_name: {
      type: DataTypes.STRING(64),
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
    tableName: 'tag',
    timestamps: false,
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
  }
}
