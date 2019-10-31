export default (sequelize, DataTypes) => {
  return sequelize.define("StudyBoard", {
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
      comment: "게시판 제목"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "게시판 내용"
    },
    category: {
      type: DataTypes.STRING(4),
      allowNull: false,
      comment:
        "게시판 카테고리 (NOTI: 공지사항 / QNA: 문의사항 / FREE: 자유게시판)"
    }
  });
};
