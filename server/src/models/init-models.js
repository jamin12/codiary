var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _comments = require("./comments");
var _contents = require("./contents");
var _like_record = require("./like_record");
var _mesurement = require("./mesurement");
var _sessions = require("./sessions");
var _sns_info = require("./sns_info");
var _tag = require("./tag");
var _temporary_contents = require("./temporary_contents");
var _user_detail = require("./user_detail");
var _users = require("./users");
var _visit_record = require("./visit_record");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var contents = _contents(sequelize, DataTypes);
  var like_record = _like_record(sequelize, DataTypes);
  var mesurement = _mesurement(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);
  var sns_info = _sns_info(sequelize, DataTypes);
  var tag = _tag(sequelize, DataTypes);
  var temporary_contents = _temporary_contents(sequelize, DataTypes);
  var user_detail = _user_detail(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var visit_record = _visit_record(sequelize, DataTypes);

  sns_info.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasOne(sns_info, { as: "sns_info", foreignKey: "user_id"});
  user_detail.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasOne(user_detail, { as: "user_detail", foreignKey: "user_id"});
  contents.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(contents, { as: "contents", foreignKey: "user_id"});

  return {
    category,
    comments,
    contents,
    like_record,
    mesurement,
    sessions,
    sns_info,
    tag,
    temporary_contents,
    user_detail,
    users,
    visit_record,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
