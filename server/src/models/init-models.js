var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _comments = require("./comments");
var _like_record = require("./like_record");
var _mesurement = require("./mesurement");
var _posts = require("./posts");
var _posts_update_history = require("./posts_update_history");
var _sns_info = require("./sns_info");
var _tag = require("./tag");
var _temporary_posts = require("./temporary_posts");
var _user_detail = require("./user_detail");
var _users = require("./users");
var _visit_record = require("./visit_record");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var like_record = _like_record(sequelize, DataTypes);
  var mesurement = _mesurement(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var posts_update_history = _posts_update_history(sequelize, DataTypes);
  var sns_info = _sns_info(sequelize, DataTypes);
  var tag = _tag(sequelize, DataTypes);
  var temporary_posts = _temporary_posts(sequelize, DataTypes);
  var user_detail = _user_detail(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var visit_record = _visit_record(sequelize, DataTypes);

  sns_info.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasOne(sns_info, { as: "sns_info", foreignKey: "user_id"});
  user_detail.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasOne(user_detail, { as: "user_detail", foreignKey: "user_id"});
  posts.belongsTo(users, { as: "users", foreignKey: "user_id"});
  users.hasMany(posts, { as: "posts", foreignKey: "user_id"});
  posts_update_history.belongsTo(posts,{ as: "posts", foreignKey: "post_id"})
  posts.hasMany(posts_update_history,{ as: "posts_update_history", foreignKey: "post_id"})


  return {
    category,
    comments,
    like_record,
    mesurement,
    posts,
    posts_update_history,
    sns_info,
    tag,
    temporary_posts,
    user_detail,
    users,
    visit_record,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
