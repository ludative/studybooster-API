import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import config from "../../config";
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: config.db.dialect,
    host: process.env.DB_HOST,
    timezone: config.db.timezone,
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true
    }
  }
);

let db = {};
fs.readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User.hasMany(db.Study);
db.User.hasMany(db.StudyBoard);
db.User.hasMany(db.StudyBoardComment);
db.User.hasMany(db.StudyMember);
db.User.hasMany(db.StudyActionLog);

db.Study.hasMany(db.StudyDay);
db.Study.hasMany(db.StudyBoard);
db.Study.hasMany(db.StudyMember);
db.Study.hasMany(db.StudyActionLog);
db.Study.belongsTo(db.User);
db.Study.belongsTo(db.StudySubject);

db.StudyDay.belongsTo(db.Study);

db.StudySubject.hasMany(db.Study);

db.StudyBoard.belongsTo(db.User);
db.StudyBoard.belongsTo(db.Study);
db.StudyBoard.hasMany(db.StudyBoardComment);

db.StudyBoardComment.belongsTo(db.StudyBoard);
db.StudyBoardComment.belongsTo(db.User);

db.StudyMember.belongsTo(db.User);
db.StudyMember.belongsTo(db.Study);

db.StudyActionLog.belongsTo(db.User);
db.StudyActionLog.belongsTo(db.Study);

export default db;
