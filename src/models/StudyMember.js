export default (sequelize, DataTypes) => {
    return sequelize.define("StudyMember", {
        isApprove: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            comment: "신청 승인 여부"
        },
        isReject: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            comment: "신청 거절 여부"
        },
        rejectReason: {
            type: DataTypes.STRING,
            comment: "거절 사유"
        },
        isBanish: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            comment: "추방 여부"
        },
        banishReason: {
            type: DataTypes.STRING,
            comment: "추방 사유"
        }
    });
};
