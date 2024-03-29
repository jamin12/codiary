"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const logger = require("../config/logger");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config").mysql[env];
const cls = require("cls-hooked");
const transaction = cls.createNamespace("transaction");
const db = {};

Sequelize.useCLS(transaction);

if (process.env.NODE_ENV === "development") {
	config.logging = (msg) => logger.info(`${msg}\n`);
}

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//       const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//       db[model.name] = model;
//     });

//   Object.keys(db).forEach(modelName => {
//       if (db[modelName].associate) {
//           db[modelName].associate(db);
//         }
//       });
const initModels = require("./init-models")(sequelize);
for (var model in initModels) {
	db[model] = initModels[model];
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
