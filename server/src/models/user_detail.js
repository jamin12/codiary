import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class user_detail extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    user_name: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    user_unique_id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: "user_unique_id"
    },
    user_nickname: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    user_introduce: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_img: {
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
    tableName: 'user_detail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_unique_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_unique_id" },
        ]
      },
    ]
  });
  }
}
