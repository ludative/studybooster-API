/**
 * 스터디 요일
 * 0: 일요일, 6: 토요일
 */
export default (sequelize, DataTypes) => {
  return sequelize.define("StudyDay", {
    day: {
      type: DataTypes.INTEGER
    }
  });
};
