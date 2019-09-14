export default (sequelize, DataTypes) => {
  return sequelize.define("StudySubject", {
    title: {
      type: DataTypes.STRING(32),
      comment: "스터디 주제"
    }
  });
};
