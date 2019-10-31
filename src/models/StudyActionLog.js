export default (sequelize, DataTypes) => {
    return sequelize.define("StudyActionLog", {
        status: {
            type: DataTypes.STRING(8),
            allowNull: false,
            comment: "상태값 APPROVE 신청 / EXIT 탈퇴"
        }
    });
};
