import models from "../../models";
import {authenticatedMiddleware, authenticatedStudyAdminMiddleware} from "../../utils/middleware";
import {Op} from "sequelize";
import {asyncForEach} from "../../utils/asyncForEach";
import {createToken} from "../../utils/token";
import {getMailInviteStudy, sendMail} from "../../utils/mailer";

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

const createMemberByInvite = async (_, args, {user, StudyId}) => {
    const [member, created] = await models.StudyMember.findOrCreate({
        where: { StudyId, UserId: user.id },
        defaults: {
            StudyId,
            UserId: user.id,
            isApprove: true
        }
    });

    if (!created) throw new Error('이미 신청하신 스터디입니다.');

    return member;
};

const sendMailToInvitedUsers = async (_, { userIds, studyId: StudyId}) => {
    if (!userIds.length) throw new UserInputError('초대할 사용자를 선택해주세요.');
    const alreadyMembers = await models.StudyMember.findAll({
        where: {
            StudyId,
            UserId: {
                [Op.or]: userIds
            }
        }
    });

    if (alreadyMembers.length) throw new UserInputError('이미 신청한 사용자가 존재합니다.');

    const users = await models.User.findAll({
        where: {
            id: {
                [Op.or]: userIds
            }
        }
    });

    const study = await models.Study.findByPk(StudyId);

    const sendMailPromises = [];
    await asyncForEach(users, async user => {
        const token = await createToken({ id: user.id, StudyId});
        sendMailPromises.push(
            sendMail(
                getMailInviteStudy({
                    email: user.email,
                    studyTitle: study.name,
                    token
                })
            )
        )
    });

    await Promise.all(sendMailPromises);
    return { isSuccess: true }
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
    createMemberByInvite: authenticatedMiddleware(createMemberByInvite),
    sendMailToInvitedUsers: authenticatedStudyAdminMiddleware(sendMailToInvitedUsers, '스터디를 생성한 관리자만 초대 가능합니다.'),
    updateMember: authenticatedStudyAdminMiddleware(updateMember),
    deleteMember: authenticatedMiddleware(deleteMember)
};

export default studyMemberMutations;
