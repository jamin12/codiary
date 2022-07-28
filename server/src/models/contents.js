import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class contents extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    contents_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    contents_title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    contents_body_md: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contents_body_html: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    like_count: {
      type: DataTypes.INTEGER,
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
    tableName: 'contents',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
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
