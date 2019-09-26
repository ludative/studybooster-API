import models from "../../models";
import {authenticatedMiddleware, authenticatedStudyAdminMiddleware} from "../../utils/middleware";

const createMember = async (_, {studyId}, {user}) => {
    const [member, created] = await models.StudyMember.findOrCreate({
        where: { StudyId: studyId, UserId: user.id },
        defaults: {
            StudyId: studyId,
            UserId: user.id
        }
    });

    if (!created) throw new Error('이미 신청하신 스터디입니다.');

    return member;
};

const updateMember = async (_, {params}) => {
    const members = await Promise.all(params.map(async param => {
        const member = await models.StudyMember.findByPk(param.id);
        return member.update(param)
    }));

    return members;
};

const deleteMember = async (_, {studyId}, {user}) => {
    const member = await models.StudyMember.findOne({
        where: {
            UserId: user.id,
            StudyId: studyId
        }
    });

    if (!member) throw new Error('일치하는 스터디 회원이 존재하지 않습니다.');
    await member.destroy();
    return {isSuccess: true}
};

const studyMemberMutations = {
    createMember: authenticatedMiddleware(createMember),
    updateMember: authenticatedStudyAdminMiddleware(updateMember),
    deleteMember: authenticatedMiddleware(deleteMember)
};

export default studyMemberMutations;
