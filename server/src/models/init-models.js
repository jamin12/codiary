var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _comments = require("./comments");
var _like_record = require("./like_record");
var _measurement = require("./measurement");
var _measurement_date = require("./measurement_date");
var _posts = require("./posts");
var _posts_update_history = require("./posts_update_history");
var _report = require("./report");
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
  var measurement = _measurement(sequelize, DataTypes);
  var measurement_date = _measurement_date(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var posts_update_history = _posts_update_history(sequelize, DataTypes);
  var report = _report(sequelize, DataTypes);
  var sns_info = _sns_info(sequelize, DataTypes);
  var tag = _tag(sequelize, DataTypes);
  var temporary_posts = _temporary_posts(sequelize, DataTypes);
  var user_detail = _user_detail(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var visit_record = _visit_record(sequelize, DataTypes);

  sns_info.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasOne(sns_info, { as: "sns_info", foreignKey: "user_id" });

  user_detail.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasOne(user_detail, { as: "user_detail", foreignKey: "user_id" });

  posts.belongsTo(users, { as: "users", foreignKey: "user_id" });
  users.hasMany(posts, { as: "posts", foreignKey: "user_id" });

  temporary_posts.belongsTo(users, { as: "users", foreignKey: "user_id" });
  users.hasMany(temporary_posts, {
    as: "temporary_posts",
    foreignKey: "user_id",
  });

  visit_record.belongsTo(users, { as: "users", foreignKey: "user_id" });
  users.hasMany(visit_record, { as: "visit_record", foreignKey: "user_id" });

  like_record.belongsTo(users, { as: "users", foreignKey: "user_id" });
  users.hasMany(like_record, { as: "like_record", foreignKey: "user_id" });

  comments.belongsTo(users, { as: "users", foreignKey: "user_id" });
  users.hasMany(comments, { as: "comments", foreignKey: "user_id" });

  posts_update_history.belongsTo(posts, {
    as: "posts",
    foreignKey: "post_id",
  });
  posts.hasMany(posts_update_history, {
    as: "posts_update_history",
    foreignKey: "post_id",
  });

  visit_record.belongsTo(posts, { as: "posts", foreignKey: "post_id" });
  posts.hasMany(visit_record, { as: "visit_record", foreignKey: "post_id" });

  like_record.belongsTo(posts, { as: "posts", foreignKey: "post_id" });
  posts.hasMany(like_record, { as: "like_record", foreignKey: "post_id" });

  comments.belongsTo(posts, { as: "posts", foreignKey: "post_id" });
  posts.hasMany(comments, { as: "comments", foreignKey: "post_id" });

  tag.belongsTo(posts, { as: "posts", foreignKey: "post_id" });
  posts.hasMany(tag, { as: "tag", foreignKey: "post_id" });

  measurement.belongsTo(posts, { as: "posts", foreignKey: "post_id" });
  posts.hasOne(measurement, { as: "measurement", foreignKey: "post_id" });

  posts.belongsTo(category, { foreignKey: "category_id", as: "category" });
  category.hasMany(posts, { foreignKey: "category_id", as: "posts" });
  return {
    category,
    comments,
    like_record,
    measurement,
    measurement_date,
    posts,
    posts_update_history,
    report,
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
