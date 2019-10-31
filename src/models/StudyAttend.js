export default (sequelize, DataTypes) => {
  return sequelize.define("StudyAttend", {
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: "출석 승인여부"
    },
    confirmedDate: {
      type: DataTypes.INTEGER(13),
      comment: "출석 승인날짜"
    },
    confirmedCount: {
      type: DataTypes.INTEGER,
      comment: "출석 승인횟수"
    }
  });
};
