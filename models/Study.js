export default (sequelize, DataTypes) => {
  return sequelize.define("Study", {
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: "스터디 명"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "소개"
    },
    startDate: {
      type: DataTypes.INTEGER(13),
      allowNull: false,
      comment: "스터디 시작날짜"
    },
    endDate: {
      type: DataTypes.INTEGER(13),
      allowNull: false,
      comment: "스터디 마감날짜"
    },
    startTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "스터디 당 시작시간"
    },
    endTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "스터디 당 종료시간"
    },
    weekPeriod: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "스터디 반복주기"
    },
    location: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: "스터디 장소"
    },
    customSubject: {
      type: DataTypes.STRING(32),
      comment: "커스텀 주제"
    },
    thumbnail: {
      type: DataTypes.STRING(256),
      comment: "스터디 섬네일"
    },
    limitedMemberCount: {
      type: DataTypes.INTEGER,
      comment: "스터디 제한인원"
    },

    isPrivate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });
};
