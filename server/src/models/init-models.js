import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _category from  "./category.js";
import _comments from  "./comments.js";
import _contents from  "./contents.js";
import _like_record from  "./like_record.js";
import _mesurement from  "./mesurement.js";
import _sns_info from  "./sns_info.js";
import _tag from  "./tag.js";
import _temporary_contents from  "./temporary_contents.js";
import _user_detail from  "./user_detail.js";
import _users from  "./users.js";
import _visit_record from  "./visit_record.js";

export default function initModels(sequelize) {
  const category = _category.init(sequelize, DataTypes);
  const comments = _comments.init(sequelize, DataTypes);
  const contents = _contents.init(sequelize, DataTypes);
  const like_record = _like_record.init(sequelize, DataTypes);
  const mesurement = _mesurement.init(sequelize, DataTypes);
  const sns_info = _sns_info.init(sequelize, DataTypes);
  const tag = _tag.init(sequelize, DataTypes);
  const temporary_contents = _temporary_contents.init(sequelize, DataTypes);
  const user_detail = _user_detail.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);
  const visit_record = _visit_record.init(sequelize, DataTypes);

  sns_info.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasOne(sns_info, { as: "sns_info", foreignKey: "user_id"});
  user_detail.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasOne(user_detail, { as: "user_detail", foreignKey: "user_id"});

  return {
    category,
    comments,
    contents,
    like_record,
    mesurement,
    sns_info,
    tag,
    temporary_contents,
    user_detail,
    users,
    visit_record,
  };
}
