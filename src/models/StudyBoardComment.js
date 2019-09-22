export default (sequelize, DataTypes) => {
  return sequelize.define("StudyBoardComment", {
    comment: DataTypes.STRING
  });
};
