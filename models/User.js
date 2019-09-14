export default (sequelize, DataTypes) => {
  return sequelize.define("User", {
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      comment: "이메일계정"
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: "비밀번호"
    },
    nickname: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: "별칭"
    },
    introduction: {
      type: DataTypes.TEXT,
      comment: "자기소개"
    },
    profileImage: {
      type: DataTypes.STRING(256),
      comment: "프로필 이미지"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });
};
