export default (sequelize, DataTypes) => {
  return sequelize.define("StudyBoardComment", {
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
