export default (sequelize, DataTypes) => {
  return sequelize.define("StudyDay", {
    day: {
      type: DataTypes.INTEGER
    }
  });
};
